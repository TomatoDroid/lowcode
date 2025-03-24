import { CommonComponentProps } from "../../interface";
import { cn } from "../../../utils";

export function ContainerProd({ children, id, styles }: CommonComponentProps) {
  return (
    <div className={cn("p-5")} style={styles}>
      {children}
    </div>
  );
}
