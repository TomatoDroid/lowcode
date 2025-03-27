import { useEffect, useState } from "react";
import MonacoEditror, { OnMount } from "@monaco-editor/react";
import { useComponentsStore } from "../../../stores/components";

export interface CustomJSConfig {
  type: "customJS";
  code: string;
}

export interface CustomJSProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: CustomJSConfig) => void;
}

export function CustomJS(props: CustomJSProps) {
  const { defaultValue, onChange, value: val } = props;
  const { curComponentId } = useComponentsStore();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(val);
  }, [val]);

  function codeChange(value?: string) {
    if (!curComponentId) return;
    setValue(value);
    onChange?.({
      type: "customJS",
      code: value!,
    });
  }

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-start gap-5">
        <div>自定义 JS</div>
        <div>
          <MonacoEditror
            width={"600px"}
            height={"400px"}
            path="action.js"
            language="javascript"
            onMount={handleEditorMount}
            onChange={codeChange}
            value={value}
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
