import { CommonComponentProps } from "../../interface";
import { cn } from "../../../utils";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";

export function ContainerDev({ children, id, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className={cn("border border-black min-h-24 p-5", {
        "border-2 border-green-600": canDrop,
      })}
      style={styles}
    >
      {children}
    </div>
  );
}
