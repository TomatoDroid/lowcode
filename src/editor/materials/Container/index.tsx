import { CommonComponentProps } from "../../interface";
import { cn } from "../../../utils";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";

export function Container({ children, id }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      data-component-id={id}
      ref={drop}
      className={cn("border border-black min-h-24 p-5", {
        "border-2 border-green-600": canDrop,
      })}
    >
      {children}
    </div>
  );
}
