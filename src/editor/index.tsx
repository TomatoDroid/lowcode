import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Header } from "./components/Header";
import { Material } from "./components/Material";
import { EditArea } from "./components/EditArea";
import { Setting } from "./components/Setting";

export default function LowcodeEditor() {
  return (
    <div className="flex flex-col h-dvh">
      <div className="h-16 flex items-center border-b border-b-black">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Material />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
