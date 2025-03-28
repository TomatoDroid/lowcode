import { Button as AntButton } from "antd";
import { ButtonType } from "antd/es/button";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}

export function ButtonDev({ type, text, id, styles }: CommonComponentProps) {
  const [_, drag] = useDrag({
    type: "Button",
    item: {
      type: "Button",
      dragType: "move",
      id,
    },
  });

  return (
    <AntButton ref={drag} data-component-id={id} type={type} style={styles}>
      {text}
    </AntButton>
  );
}
