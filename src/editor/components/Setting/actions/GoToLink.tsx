import { Input } from "antd";
import { ComponentEvent } from "../../../stores/componentConfig";
import { useComponentsStore } from "../../../stores/components";

export function GoToLink(props: { event: ComponentEvent }) {
  const { curComponentId, updateComponentProps, curComponent } =
    useComponentsStore();

  function urlChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props[eventName],
        url: value,
      },
    });
  }
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <div>链接</div>
        <Input
          onChange={(e) => {
            urlChange(props.event.name, e.target.value);
          }}
          value={curComponent?.props?.[props.event.name]?.url}
        />
      </div>
    </div>
  );
}
