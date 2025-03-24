import { Segmented } from "antd";
import { useState } from "react";
import { Material } from "../Material";
import { Source } from "../Source";
import { Outline } from "../Outline";

export function MaterialWrapper() {
  const [key, setKey] = useState("物料");
  return (
    <div>
      <Segmented onChange={setKey} block options={["物料", "大纲", "源码"]} />
      <div className="pt-5 h-[calc(100vh-60px-30px-20px)]">
        {key === "物料" && <Material />}
        {key === "大纲" && <Outline />}
        {key === "源码" && <Source />}
      </div>
    </div>
  );
}
