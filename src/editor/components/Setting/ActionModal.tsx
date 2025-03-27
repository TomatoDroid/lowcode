import { Modal, Segmented } from "antd";
import { ComponentEvent } from "../../stores/componentConfig";
import { useEffect, useState } from "react";
import { GoToLink, GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";
import { CustomJS, CustomJSConfig } from "./actions/CustomJS";
import {
  ComponentMethod,
  ComponentMethodConfig,
} from "./actions/ComponentMethod";

export type ActionConfig =
  | GoToLinkConfig
  | ShowMessageConfig
  | CustomJSConfig
  | ComponentMethodConfig;

interface ActionModalProps {
  visible: boolean;
  eventConfig: ComponentEvent;
  action?: ActionConfig;
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const { visible, handleCancel, handleOk, action } = props;
  const [key, setKey] = useState("访问链接");
  const [curConfig, setCurConfig] = useState<ActionConfig>();

  const map = {
    goToLink: "访问链接",
    showMessage: "消息提示",
    customJS: "自定义 JS",
    componentMethod: "组件方法",
  };

  useEffect(() => {
    if (action) {
      setKey(map[action.type]);
    }
  }, [action]);

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="添加"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented
          block
          options={["访问链接", "消息提示", "组件方法", "自定义 JS"]}
          value={key}
          onChange={setKey}
        ></Segmented>
        {key === "访问链接" && (
          <GoToLink
            key={"goToLink"}
            value={action?.type === "goToLink" ? action.url : ""}
            onChange={(config) => setCurConfig(config)}
          />
        )}
        {key === "消息提示" && (
          <ShowMessage
            key={"showMessage"}
            value={action?.type === "showMessage" ? action.config : undefined}
            onChange={(config) => setCurConfig(config)}
          />
        )}
        {key === "组件方法" && (
          <ComponentMethod
            key="componentMethod"
            value={
              action?.type === "componentMethod" ? action.config : undefined
            }
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === "自定义 JS" && (
          <CustomJS
            key={"customJS"}
            value={action?.type === "customJS" ? action.code : ""}
            onChange={(config) => setCurConfig(config)}
          />
        )}
      </div>
    </Modal>
  );
}
