import { cn } from "../../../utils";
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";

export function PageDev({ children, id, name, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(
    ["Button", "Container", "Modal", "Table", "Form"],
    id
  );

  return (
    <div
      data-component-id={id}
      ref={drop}
      className={cn("p-5 h-full box-border", {
        "border-2 border-emerald-600": canDrop,
      })}
      style={styles}
    >
      {children}
    </div>
  );
}
