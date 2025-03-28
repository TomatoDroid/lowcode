import React, { useEffect, useMemo, useState } from "react";
import { CommonComponentProps } from "../../interface";
import { Table as AntdTable } from "antd";
import axios from "axios";
import { format } from "date-fns";

export function TableProd({ url, children }: CommonComponentProps) {
  const [data, setData] = useState<Record<string, any>[]>();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (url) {
      setLoading(true);
      const { data } = await axios.get(url);
      setData(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      if (item?.props?.type === "date") {
        return {
          title: item.props.title,
          dataIndex: item.props.dataIndex,
          render: (value: any) => (value ? format(value, "yyyy-MM-dd") : null),
        };
      } else {
        return {
          title: item.props.title,
          dataIndex: item.props.dataIndex,
        };
      }
    });
  }, [children]);

  return (
    <AntdTable
      dataSource={data}
      pagination={false}
      columns={columns}
      rowKey={"id"}
      loading={loading}
    />
  );
}
