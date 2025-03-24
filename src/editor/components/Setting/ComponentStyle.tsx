import { Form, Input, InputNumber, Select } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import {
  ComponentSetter,
  useComponentConfigStore,
} from "../../stores/componentConfig";
import { useComponentsStore } from "../../stores/components";
import { CssEditor } from "./CssEditor";
import { debounce } from "lodash-es";
import StyleToObject from "style-to-object";

export function ComponentStyle() {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [css, setCss] = useState(`.comp{\n \n}`);

  useEffect(() => {
    form.resetFields();

    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });

    setCss(toCSSStr(curComponent!.styles!));
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (const key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (
        ["width", "height"].includes(key) &&
        !value.toString().endsWith("px")
      ) {
        value += "px";
      }

      str += `\t${key}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  }

  const handleEditChange = debounce((value: string) => {
    setCss(value);
    const css: Record<string, any> = {};
    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, "")
        .replace(/(\.?[^{]+{)/, "")
        .replace("}", "");
      StyleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace("-", ""))
        ] = value;
      });
      updateComponentStyles(curComponentId, css, true);
    } catch (error) {
      console.log(error);
    }
  }, 500);

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border border-gray-400">
        <CssEditor value={css} onChange={handleEditChange} />
      </div>
    </Form>
  );
}
