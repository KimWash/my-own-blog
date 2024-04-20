import Tag from "@core/components/Tag";
import { PostListDto } from "@core/lib/model/Post";
import client, { Post } from "@db/prisma";
import "@core/lib/date/date.extensions";
import { Attributes, Key } from "react";


export type Column<T> = {
  name: Extract<keyof T, string>;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
  width?: number;
};

export default function Table<T>({
  columns,
  rows,
  keyMapper,
}: {
  columns: Column<T>[];
  rows: T[];
  keyMapper: (data: T) => Key;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-fixed">
        {/* head */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name} colSpan={col.width}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((post) => (
            <tr key={keyMapper(post)}>
              {columns.map((col) => (
                <td key={col.name} colSpan={col.width}>
                  {col.render
                    ? col.render(post[col.name])
                    : post[col.name]?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
