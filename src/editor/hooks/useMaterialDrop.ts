import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/componentConfig";
import { useComponentsStore } from "../stores/components";

export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop(item: { type: string }, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      const props = componentConfig[item.type].defaultProps;
      const config = componentConfig[item.type];
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
          desc: config.desc,
          // styles: config.styles,
        },
        id
      );
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
