import { cn } from "../../../utils";
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";

export function Page({ children, id, name }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className={cn("p-5 h-full box-border", {
        "border-2 border-emerald-600": canDrop,
      })}
    >
      {children}
    </div>
  );
}
