import { useForm } from "antd/es/form/Form";
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useEffect, useMemo, useRef } from "react";
import { useDrag } from "react-dnd";
import { cn } from "../../../utils";
import { Form as AntdForm, Input } from "antd";
import React from "react";

export function FormDev({
  id,
  name,
  children,
  onFinish,
}: CommonComponentProps) {
  const [form] = useForm();
  const { canDrop, drop } = useMaterialDrop(["FormItem"], id);
  const divRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      id: id,
      dragType: "move",
    },
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props.label,
        name: item.props.name,
        type: item.props.type,
        id: item.props.id,
      };
    });
  }, [children]);

  return (
    <div
      data-component-id={id}
      ref={divRef}
      className={cn("border min-h-24 p-5", {
        "border-2 border-green-600": canDrop,
      })}
    >
      <AntdForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={(values) => {
          onFinish?.(values);
        }}
      >
        {formItems.map((item: any) => {
          return (
            <AntdForm.Item
              key={item.id}
              name={item.name}
              data-component-id={item.id}
              label={item.label}
            >
              <Input style={{ pointerEvents: "none" }}></Input>
            </AntdForm.Item>
          );
        })}
      </AntdForm>
    </div>
  );
}
