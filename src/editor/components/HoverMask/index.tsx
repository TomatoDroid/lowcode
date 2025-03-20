import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils";
import { getComponentById, useComponentsStore } from "../../stores/components";

interface HoverMaskProps {
  portalWrapperClassName: string;
  containerClassName: string;
  componentId: number;
}
export default function HoverMask({
  portalWrapperClassName,
  containerClassName,
  componentId,
}: HoverMaskProps) {
  const { components } = useComponentsStore();
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
    console.log(labelTop);

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
        <div className="px-2 py-1 bg-blue-950 rounded-b-md text-white cursor-pointer text-wrap">
          {curComponent?.name}
        </div>
      </div>
    </>,
    el
  );
}
