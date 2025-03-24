import { CSSProperties } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Component {
  id: number;
  name: string;
  props: any;
  styles?: CSSProperties;
  desc: string;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
  mode: "edit" | "preview";
  curComponentId: number | null;
  curComponent: Component | null;
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
  updateComponentStyles: (
    componentId: number,
    styles: CSSProperties,
    replace?: boolean
  ) => void;
  setCurComponentId: (componentId: number | null) => void;
  setMode: (mode: State["mode"]) => void;
}

export const useComponentsStore = create<State & Action>()(
  devtools((set, get) => {
    return {
      components: [
        {
          id: 1,
          name: "Page",
          props: {},
          desc: "页面",
        },
      ],
      curComponentId: null,
      curComponent: null,
      mode: "edit",
      setMode(mode) {
        set({ mode });
      },
      setCurComponentId(componentId) {
        set((state) => {
          return {
            curComponentId: componentId,
            curComponent: getComponentById(componentId, state.components),
          };
        });
      },
      addComponent(component, parentId) {
        set((state) => {
          if (parentId) {
            const parent = getComponentById(parentId, state.components);
            if (parent) {
              if (parent.children) {
                parent.children.push(component);
              } else {
                parent.children = [component];
              }
            }
            component.parentId = parentId;
            return {
              components: [...state.components],
            };
          }
          return {
            components: [...state.components, component],
          };
        });
      },
      deleteComponent(componentId) {
        if (!componentId) return;
        const component = getComponentById(componentId, get().components);
        if (component?.parentId) {
          const parent = getComponentById(component.parentId, get().components);
          if (parent) {
            parent.children = parent.children?.filter(
              (item) => item.id !== componentId
            );
            set({ components: [...get().components] });
          }
        }
      },
      updateComponentProps(componentId, props) {
        const component = getComponentById(componentId, get().components);
        if (component) {
          component.props = { ...component.props, ...props };
          set({ components: [...get().components] });
        }
        return { components: [...get().components] };
      },
      updateComponentStyles(componentId, styles, replace) {
        const component = getComponentById(componentId, get().components);
        if (component) {
          component.styles = replace
            ? { ...styles }
            : { ...component.styles, ...styles };
          set({ components: [...get().components] });
        }
        return { components: [...get().components] };
      },
    };
  })
);

export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
