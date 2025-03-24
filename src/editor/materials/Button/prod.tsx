import { Button as AntButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

export function ButtonProd({
  type,
  text,
  id,
  styles,
  ...props
}: CommonComponentProps) {
  return (
    <AntButton type={type} style={styles} {...props}>
      {text}
    </AntButton>
  );
}
