import { Select, TreeSelect } from "antd";
import {
  Component,
  getComponentById,
  useComponentsStore,
} from "../../../stores/components";
import { useComponentConfigStore } from "../../../stores/componentConfig";
import { useEffect, useState } from "react";

export interface ComponentMethodConfig {
  type: "componentMethod";
  config: {
    componentId: number;
    method: string;
  };
}
export interface ComponentMethodProps {
  value?: ComponentMethodConfig["config"];
  onChange: (config: ComponentMethodConfig) => void;
}

export function ComponentMethod(props: ComponentMethodProps) {
  const { value, onChange } = props;
  const { components, curComponentId } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [selectedComponent, setSelectedComponent] =
    useState<Component | null>();

  const [curId, setCurId] = useState<number>();
  const [curMethod, setCurMethod] = useState<string>();

  useEffect(() => {
    if (value) {
      setCurId(value.componentId);
      setCurMethod(value.method);

      setSelectedComponent(getComponentById(value.componentId, components));
    }
  }, [value]);

  function componentChange(value: number) {
    if (!curComponentId) return;
    setCurId(value);
    setSelectedComponent(getComponentById(value, components));
  }

  function componentMethodChange(value: string) {
    if (!curComponentId || !selectedComponent) return;

    setCurMethod(value);

    onChange?.({
      type: "componentMethod",
      config: {
        componentId: selectedComponent.id,
        method: value,
      },
    });
  }

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2.5">
        <div>组件：</div>
        <div>
          <TreeSelect
            style={{ width: 500, height: 50 }}
            treeData={components}
            fieldNames={{
              label: "name",
              value: "id",
            }}
            value={curId}
            onChange={(value) => componentChange(value)}
          />
        </div>
      </div>
      {componentConfig[selectedComponent?.name || ""] && (
        <div className="flex items-center gap-2.5 mt-5">
          <div>方法：</div>
          <div>
            <Select
              style={{ width: 500, height: 50 }}
              options={componentConfig[
                selectedComponent?.name || ""
              ].methods?.map((item) => {
                return {
                  label: item.label,
                  value: item.name,
                };
              })}
              value={curMethod}
              onChange={(value) => {
                componentMethodChange(value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
