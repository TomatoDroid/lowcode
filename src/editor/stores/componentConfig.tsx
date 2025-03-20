import { create } from "zustand";
import { Container } from "../materials/Container";
import { Button } from "../materials/Button";
import { Page } from "../materials/Page";
import { devtools } from "zustand/middleware";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

interface State {
  componentConfig: {
    [key: string]: ComponentConfig;
  };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>()(
  devtools((set) => {
    return {
      componentConfig: {
        Container: {
          name: "Container",
          defaultProps: {},
          component: Container,
        },
        Button: {
          name: "Button",
          defaultProps: {
            text: "按钮",
            type: "primary",
          },
          component: Button,
        },
        Page: {
          name: "Page",
          defaultProps: {},
          component: Page,
        },
      },
      registerComponent(name, componentConfig) {
        set((state) => {
          return {
            componentConfig: {
              ...state.componentConfig,
              [name]: componentConfig,
            },
          };
        });
      },
    };
  })
);
