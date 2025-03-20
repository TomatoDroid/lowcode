import { Button as AntButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

export function Button({ type, text, id }: CommonComponentProps) {
  return (
    <AntButton data-component-id={id} type={type}>
      {text}
    </AntButton>
  );
}
