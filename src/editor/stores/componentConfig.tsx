import { create } from "zustand";
import { ContainerDev } from "../materials/Container/dev";
import { ButtonDev } from "../materials/Button/dev";
import { PageDev } from "../materials/Page/dev";
import { devtools } from "zustand/middleware";
import { ContainerProd } from "../materials/Container/prod";
import { ButtonProd } from "../materials/Button/prod";
import { PageProd } from "../materials/Page/prod";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  label: string;
}
export interface ComponentConfig {
  name: string;
  desc: string;
  defaultProps: Record<string, any>;
  setter: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  dev: any;
  prod: any;
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
          desc: "容器",
          dev: ContainerDev,
          prod: ContainerProd,
        },
        Button: {
          name: "Button",
          defaultProps: {
            text: "按钮",
            type: "primary",
          },
          setter: [
            {
              name: "type",
              label: "按钮类型",
              type: "select",
              options: [
                { label: "主按钮", value: "primary" },
                { label: "次按钮", value: "secondary" },
              ],
            },
            {
              name: "text",
              label: "按钮文本",
              type: "input",
            },
          ],
          stylesSetter: [
            {
              name: "width",
              label: "宽度",
              type: "inputNumber",
            },
            {
              name: "height",
              label: "高度",
              type: "inputNumber",
            },
          ],
          events: [
            {name: 'onClick', 'label': '点击事件'},
            {name: 'onDoubleClick', 'label': '双击事件'},
          ],
          desc: "按钮",
          dev: ButtonDev,
          prod: ButtonProd,
        },
        Page: {
          name: "Page",
          defaultProps: {},
          desc: "页面",
          dev: PageDev,
          prod: PageProd,
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
