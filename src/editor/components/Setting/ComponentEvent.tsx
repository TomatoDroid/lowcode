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

export function ComponentEvent() {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [actionModal, setActionModal] = useState(false);
  const [curEvent, setCurEvent] = useState<ComponentEvent>();

  if (!curComponent) return null;

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
            onClick={() => {
              setCurEvent(event);
              setActionModal(true);
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: <div></div>,
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
      <Collapse className="mb-3" items={items} />
      <ActionModal
        visible={actionModal}
        eventConfig={curEvent!}
        handleOk={handleModalOk}
        handleCancel={() => setActionModal(false)}
      />
    </div>
  );
}
