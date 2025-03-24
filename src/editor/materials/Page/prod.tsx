import { cn } from "../../../utils";
import { CommonComponentProps } from "../../interface";

export function PageProd({ children, id, name, styles }: CommonComponentProps) {
  return (
    <div className={cn("p-5")} style={styles}>
      {children}
    </div>
  );
}
