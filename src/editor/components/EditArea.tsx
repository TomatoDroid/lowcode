import React, { MouseEventHandler, useState } from "react";
import { Component, useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/componentConfig";
import HoverMask from "./HoverMask";
import SelectedMask from "./SelectedMask";

export function EditArea() {
  const { components, curComponentId, setCurComponentId } =
    useComponentsStore();
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
  };

  const handleClick: MouseEventHandler = (e) => {
    const target = (e.target as HTMLElement).closest("[data-component-id]");
    if (target) {
      const id = target.getAttribute("data-component-id");
      if (id) {
        setCurComponentId(+id);
      }
    }
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
      onClick={handleClick}
    >
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
