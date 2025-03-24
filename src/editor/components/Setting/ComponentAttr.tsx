import { Form, Input, Select } from "antd";
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/componentConfig";
import { useComponentsStore } from "../../stores/components";
import { useEffect } from "react";

export function ComponentAttr() {
  const [form] = Form.useForm();
  const { componentConfig } = useComponentConfigStore();
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.props });
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElement(setter: ComponentSetter) {
    const { type, options } = setter;
    if (type === "select") {
      return <Select options={options}></Select>;
    } else if (type === "input") {
      return <Input></Input>;
    }
  }

  function valueChange(changeValues: ComponentConfig) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="组件id">
        <Input value={curComponent.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={curComponent.desc} disabled />
      </Form.Item>
      {componentConfig[curComponent.name]?.setter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}
