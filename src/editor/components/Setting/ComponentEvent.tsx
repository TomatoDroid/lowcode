import { Button, Collapse, CollapseProps } from "antd";
import {
  type ComponentEvent,
  useComponentConfigStore,
} from "../../stores/componentConfig";
import { getComponentById, useComponentsStore } from "../../stores/components";
import { useState } from "react";
import { ActionConfig, ActionModal } from "./ActionModal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function ComponentEvent() {
  const { curComponent, curComponentId, updateComponentProps, components } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [actionModal, setActionModal] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();
  const [curAction, setCurAction] = useState<ActionConfig>();
  const [curActionIndex, setActionIndex] = useState<number>();

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

  function editAction(config: ActionConfig, index: number) {
    if (!curComponentId) return;

    setCurAction(config);
    setActionIndex(index);
    setActionModal(true);
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
            (item: ActionConfig, index: number) => {
              return (
                <div key={index}>
                  {item.type === "goToLink" && (
                    <div className="border border-blue-500 m-2.5 p-2.5 rounded-md relative">
                      <div className="text-indigo-500">跳转链接</div>
                      <div>{item.url}</div>
                      <div
                        className="absolute top-2.5 right-7 cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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
                        className="absolute top-2.5 right-7 cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                      <div
                        className="absolute top-2.5 right-2.5 cursor-pointer"
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  )}
                  {item.type === "componentMethod" ? (
                    <div
                      key="componentMethod"
                      className="border m-[10px] p-[10px] relative rounded-md"
                    >
                      <div className="text-indigo-500">组件方法</div>
                      <div>
                        {
                          getComponentById(item.config.componentId, components)
                            ?.desc
                        }
                      </div>
                      <div>{item.config.componentId}</div>
                      <div>{item.config.method}</div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 30,
                          cursor: "pointer",
                        }}
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : null}
                  {item.type === "customJS" && (
                    <div className="border border-blue-500 m-2.5 p-2.5 rounded-md relative">
                      <div className="text-indigo-500">自定义 JS</div>
                      <div
                        className="absolute top-2.5 right-7 cursor-pointer"
                        onClick={() => editAction(item, index)}
                      >
                        <EditOutlined />
                      </div>
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

  function handleModalOk(config?: ActionConfig) {
    if (!curComponentId || !config || !curEvent) return;
    if (curAction) {
      updateComponentProps(curComponentId, {
        [curEvent.name]: {
          actions: curComponent?.props[curEvent.name]?.actions.map(
            (item: ActionConfig, index: number) => {
              return index === curActionIndex ? config : item;
            }
          ),
        },
      });
    } else {
      updateComponentProps(curComponentId, {
        [curEvent.name]: {
          actions: [
            ...(curComponent?.props[curEvent.name]?.actions || []),
            config,
          ],
        },
      });
    }
    setCurAction(undefined);
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
        action={curAction}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModal(false);
          setCurAction(undefined);
        }}
      />
    </div>
  );
}
