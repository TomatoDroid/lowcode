import { CommonComponentProps } from "../../interface";
import { cn } from "../../../utils";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

export function ContainerDev({
  children,
  name,
  id,
  styles,
}: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(
    ["Button", "Container", "Table", "Form"],
    id
  );

  const divRef = useRef<HTMLDivElement>(null);

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: "move",
      id: id,
    },
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  return (
    <div
      data-component-id={id}
      ref={divRef}
      className={cn("border border-black min-h-24 p-5", {
        "border-2 border-green-600": canDrop,
      })}
      style={styles}
    >
      {children}
    </div>
  );
}
