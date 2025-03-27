import { useEffect, useState } from "react";
import { useComponentsStore } from "../../../stores/components";
import TextArea from "antd/es/input/TextArea";

export interface GoToLinkConfig {
  type: "goToLink";
  url: string;
}

export interface GoToLinkProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: GoToLinkConfig) => void;
}

export function GoToLink(props: GoToLinkProps) {
  const { defaultValue, onChange, value: val } = props;
  const { curComponentId } = useComponentsStore();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(val);
  }, [val]);

  function urlChange(value: string) {
    if (!curComponentId) return;
    setValue(value);
    onChange?.({
      type: "goToLink",
      url: value,
    });
  }
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <div>跳转链接：</div>
        <TextArea
          style={{ width: 500, height: 200, border: "1px solid #000" }}
          onChange={(e) => {
            urlChange(e.target.value);
          }}
          value={value}
        />
      </div>
    </div>
  );
}
