import React, { MouseEventHandler, useState } from "react";
import { Component, useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/componentConfig";
import HoverMask from "./HoverMask";

export function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleOnMouseOver: MouseEventHandler = (e) => {
    const target = (e.target as HTMLElement).closest("[data-component-id]");
    if (target) {
      const id = target.getAttribute("data-component-id");
      if (id) {
        setHoverComponentId(+id);
      }
    }
    // const path = e.nativeEvent.composedPath();
    // for (let i = 0; i < path.length; i++) {
    //   const ele = path[i] as HTMLElement;

    //   const componentId = ele.dataset?.componentId;
    //   if (componentId) {
    //     setHoverComponentId(+componentId);
    //     return;
    //   }
    // }
  };

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig?.[component.name];
      if (!config?.component) {
        return null;
      }
      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div
      className="h-full edit-area"
      onMouseOver={handleOnMouseOver}
      onMouseLeave={() => setHoverComponentId(undefined)}
    >
      {renderComponents(components)}
      {hoverComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
    </div>
  );
}
