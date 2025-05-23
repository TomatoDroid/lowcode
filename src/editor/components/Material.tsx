import { useMemo } from "react";
import { useComponentConfigStore } from "../stores/componentConfig";
import { MaterialItem } from "./MaterialItem";

export function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter(
      (item) => item.name !== "Page"
    );
  }, []);

  return (
    <div className="flex gap-2 flex-wrap p-2">
      {components.map((component, index) => (
        <MaterialItem
          desc={component.desc}
          name={component.name}
          key={component.name + index}
        />
      ))}
    </div>
  );
}
