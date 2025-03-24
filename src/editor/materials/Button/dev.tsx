import { Button as AntButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

export function ButtonDev({ type, text, id, styles }: CommonComponentProps) {
  return (
    <AntButton data-component-id={id} type={type} style={styles}>
      {text}
    </AntButton>
  );
}
