import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/componentConfig";
import { getComponentById, useComponentsStore } from "../stores/components";

export interface ItemType {
  type: string;
  dragType?: "move" | "drag";
  id: number;
}

export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent, components, deleteComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop(item: ItemType, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      if (item.dragType === "move") {
        const component = getComponentById(item.id, components)!;
        deleteComponent(item.id);
        addComponent(component, id);
      } else {
        const config = componentConfig[item.type];
        addComponent(
          {
            id: new Date().getTime(),
            name: item.type,
            props: config.defaultProps,
            desc: config.desc,
            // styles: config.styles,
          },
          id
        );
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return {
    canDrop,
    drop,
  };
}
