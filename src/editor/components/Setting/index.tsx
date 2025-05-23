import { Segmented } from "antd";
import { useComponentsStore } from "../../stores/components";
import { useState } from "react";
import { ComponentAttr } from "./ComponentAttr";
import { ComponentStyle } from "./ComponentStyle";
import { ComponentEvent } from "./ComponentEvent";

export function Setting() {
  const { curComponentId } = useComponentsStore();
  const [key, setKey] = useState("属性");
  if (!curComponentId) return null;

  return (
    <div>
      <Segmented
        onChange={setKey}
        block
        options={["属性", "样式", "事件"]}
      />
      <div className="pt-5">
        {key === "属性" && <ComponentAttr />}
        {key === "样式" && <ComponentStyle />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
}
