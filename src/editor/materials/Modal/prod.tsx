import { Ref, useImperativeHandle, useState } from "react";
import { CommonComponentProps } from "../../interface";
import { Modal as AntModal } from "antd";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

export function ModalProd({
  children,
  title,
  onOk,
  onCancel,
  styles,
  ref,
}: CommonComponentProps & { ref: Ref<ModalRef> }) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
      };
    },
    []
  );

  return (
    <AntModal
      title={title}
      style={styles}
      open={open}
      onOk={() => {
        onOk?.();
        setOpen(false);
      }}
      onCancel={() => {
        onCancel?.();
        setOpen(false);
      }}
      destroyOnClose
    >
      {children}
    </AntModal>
  );
}
