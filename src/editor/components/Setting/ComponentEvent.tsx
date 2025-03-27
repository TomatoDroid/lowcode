import { Button, Collapse, CollapseProps } from "antd";
import {
  type ComponentEvent,
  useComponentConfigStore,
} from "../../stores/componentConfig";
import { useComponentsStore } from "../../stores/components";
import { GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessageConfig } from "./actions/ShowMessage";
import { useState } from "react";
import { ActionModal } from "./ActionModal";
import { DeleteOutlined } from "@ant-design/icons";

export function ComponentEvent() {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [actionModal, setActionModal] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();

  if (!curComponent) return null;

  function deleteAction(event: ComponentEvent, index: number) {
    if (!curComponentId) return;
    const actions = curComponent?.props[event.name]?.actions || [];
    actions.splice(index, 1);
    updateComponentProps(curComponentId, {
      [event.name]: {
        actions,
      },
    });
  }

  const items: CollapseProps["items"] = (
    componentConfig[curComponent.name]?.events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setCurEvent(event);
              setActionModal(true);
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: (
        <div>
          {(curComponent.props[event.name]?.actions || []).map(
            (item: GoToLinkConfig | ShowMessageConfig, index) => {
              return (
                <div>
                  {item.type === "goToLink" && (
                    <div className="border border-blue-500 m-2.5 p-2.5 rounded-md relative">
                      <div className="text-indigo-500">跳转链接</div>
                      <div>{item.url}</div>
                      <div
                        className="absolute top-2.5 right-2.5 cursor-pointer"
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  )}
                  {item.type === "showMessage" && (
                    <div className="border border-blue-500 m-2.5 p-2.5 rounded-md relative">
                      <div className="text-indigo-500">消息弹窗</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <div
                        className="absolute top-2.5 right-2.5 cursor-pointer"
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      ),
    };
  });

  function handleModalOk(config?: GoToLinkConfig | ShowMessageConfig) {
    if (!curComponentId || !config || !curEvent) return;
    updateComponentProps(curComponentId, {
      [curEvent.name]: {
        actions: [
          ...(curComponent?.props[curEvent.name]?.actions || []),
          config,
        ],
      },
    });
    setActionModal(false);
  }

  return (
    <div className="px-3">
      <Collapse
        className="mb-3"
        items={items}
        defaultActiveKey={componentConfig[curComponent.name].events?.map(
          (item) => item.name
        )}
      />
      <ActionModal
        visible={actionModal}
        eventConfig={curEvent!}
        handleOk={handleModalOk}
        handleCancel={() => setActionModal(false)}
      />
    </div>
  );
}
