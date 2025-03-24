import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Header } from "./components/Header";
import { EditArea } from "./components/EditArea";
import { Setting } from "./components/Setting/index";
import { MaterialWrapper } from "./components/MaterialWrapper";
import { useComponentsStore } from "./stores/components";
import { Preview } from "./components/Preview";

export default function LowcodeEditor() {
  const { mode } = useComponentsStore();
  return (
    <div className="flex flex-col h-dvh">
      <div className="h-16 flex items-center border-b border-b-gray-400">
        <Header />
      </div>
      {mode === "edit" ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
            <MaterialWrapper />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  );
}
