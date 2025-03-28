import React, { useEffect, useMemo, useRef } from "react";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { CommonComponentProps } from "../../interface";
import { useDrag } from "react-dnd";
import { cn } from "../../../utils";
import { Table as AntdTable } from "antd";

export function TableDev({ id, name, children, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(["TableColumn"], id);

  const divRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: "move",
      id,
    },
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        title: (
          <div
            className="m-[-16px] p-[16px]"
            data-component-id={item.props?.id}
          >
            {item.props?.title}
          </div>
        ),
        key: item,
        dataIndex: item.props.dataIndex,
      };
    });
  }, [children]);

  return (
    <div
      className={cn(" border min-h-24", {
        "border-2 border-green-600": canDrop,
      })}
      data-component-id={id}
      style={styles}
      ref={divRef}
    >
      <AntdTable dataSource={[]} pagination={false} columns={columns} />
    </div>
  );
}
