import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils";
import { getComponentById, useComponentsStore } from "../../stores/components";
import { Dropdown, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface SelectedMaskProps {
  portalWrapperClassName: string;
  containerClassName: string;
  componentId: number;
}
export default function SelectedMask({
  portalWrapperClassName,
  containerClassName,
  componentId,
}: SelectedMaskProps) {
  const { components, curComponentId, setCurComponentId, deleteComponent } =
    useComponentsStore();
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  useEffect(() => {
    setTimeout(() => {
      updatePosition();
    }, 200);
  }, [components]);

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  function updatePosition() {
    if (!componentId) return;
    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { left, top, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    let labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    if (labelTop <= 0) {
      labelTop -= -30;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
      width,
      height,
      labelTop,
      labelLeft,
    });
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`);
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  function handleDelete() {
    deleteComponent(componentId);
    setCurComponentId(null);
  }

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;
    while (component?.parentId) {
      component = getComponentById(component.parentId, components);
      parentComponents.push(component);
    }
    return parentComponents;
  }, [curComponent]);

  return createPortal(
    <>
      <div
        className={cn(
          "absolute bg-blue-700/10 z-10 box-border pointer-events-none",
          "border-dashed border border-blue-700 rounded-md"
        )}
        style={{
          left: position.left,
          top: position.top,
          width: position.width,
          height: position.height,
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <Space className="bg-blue-950 rounded-sm px-1">
          <Dropdown
            menu={{
              items: parentComponents.map((item) => ({
                key: item!.id,
                label: item!.desc,
              })),
              onClick: (item) => {
                setCurComponentId(+item!.key);
              },
            }}
            disabled={parentComponents.length === 0}
          >
            <div className="px-2 py-1 rounded-b-md text-white cursor-pointer text-wrap w-12">
              {curComponent?.desc}
            </div>
          </Dropdown>
          {curComponentId !== 1 && (
            <div>
              <Popconfirm
                title="确认删除"
                okText={"确认"}
                cancelText={"取消"}
                onConfirm={handleDelete}
              >
                <DeleteOutlined style={{ color: "#fb2c36" }} />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el
  );
}
