import { useForm } from "antd/es/form/Form";
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { Ref, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { useDrag } from "react-dnd";
import { cn } from "../../../utils";
import { Form as AntdForm, DatePicker, Input } from "antd";
import React from "react";
import { isDayjs } from "dayjs";

export interface FormRef {
  submit: () => void;
}

export function FormProd({
  id,
  name,
  children,
  onFinish,
  ref,
}: CommonComponentProps & {
  ref: Ref<FormRef>;
}) {
  const [form] = useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: () => {
          form.submit();
        },
      };
    },
    [form]
  );

  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props.label,
        name: item.props.name,
        type: item.props.type,
        id: item.props.id,
        rules: item.props.rules,
      };
    });
  }, [children]);

  async function save(values: any) {
    Object.keys(values).forEach((key) => {
      if (isDayjs(values[key])) {
        values[key] = values[key].format("YYYY-MM-DD");
      }
    });
    onFinish?.(values);
  }

  return (
    <AntdForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      onFinish={save}
    >
      {formItems.map((item: any) => {
        return (
          <AntdForm.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={
              item.rules === "required"
                ? [
                    {
                      required: true,
                      message: "不能为空",
                    },
                  ]
                : []
            }
          >
            {item.type === "input" && <Input />}
            {item.type === "date" && <DatePicker />}
          </AntdForm.Item>
        );
      })}
    </AntdForm>
  );
}
