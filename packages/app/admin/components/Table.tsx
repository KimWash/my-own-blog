import "@my-own-blog/core/lib/date/date.extensions";
import { Key } from "react";
import Link from "next/link";

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
  linkMapper,
}: {
  columns: Column<T>[];
  rows: T[];
  keyMapper: (data: T) => Key;
  linkMapper: (data: T) => string;
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
          {rows.map((row) => (
            <tr key={keyMapper(row)}>
              {columns.map((col) => (
                <td key={col.name} colSpan={col.width}>
                  <Link href={linkMapper(row)}>
                  {col.render
                    ? col.render(row[col.name])
                    : row[col.name]?.toString()}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
