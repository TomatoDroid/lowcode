import { useDrag } from "react-dnd";

export interface MaterialItemProps {
  name: string;
}

export function MaterialItem(props: MaterialItemProps) {
  const { name } = props;

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  });

  return (
    <div
      ref={drag}
      className="border-dashed border border-white p-2 cursor-move hover:bg-blue-200 hover:text-black"
    >
      {name}
    </div>
  );
}
