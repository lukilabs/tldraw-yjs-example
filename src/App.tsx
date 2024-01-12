import { Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";

const HOST_URL =
  import.meta.env.MODE === "development"
    ? "ws://localhost:1234"
    : "wss://craft-yjs-test.up.railway.app";

export default function YjsExample() {
  const canvasId = window.location.pathname.split("/")[1] || "default";

  const store = useYjsStore({
    roomId: canvasId,
    hostUrl: HOST_URL,
  });

  return (
    <div className="tldraw__editor">
      <Tldraw autoFocus store={store} shareZone={<NameEditor />} />
    </div>
  );
}

const NameEditor = track(() => {
  const { user } = useEditor();

  return (
    <div style={{ pointerEvents: "all", display: "flex" }}>
      <input
        type="color"
        value={user.getColor()}
        onChange={(e) => {
          user.updateUserPreferences({
            color: e.currentTarget.value,
          });
        }}
      />
      <input
        value={user.getName()}
        onChange={(e) => {
          user.updateUserPreferences({
            name: e.currentTarget.value,
          });
        }}
      />
    </div>
  );
});
