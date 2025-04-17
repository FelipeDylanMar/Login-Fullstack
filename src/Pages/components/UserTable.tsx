import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
  } from '@tanstack/react-table';
  import { useMemo } from 'react';
  
  type User = {
    name: string;
    email: string;
    role: string;
  };
  
  const data: User[] = [
    { name: 'Alice', email: 'alice@mail.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@mail.com', role: 'Editor' },
    { name: 'Charlie', email: 'charlie@mail.com', role: 'Viewer' },
  ];
  
  export default function UserTable() {
    const columns = useMemo<ColumnDef<User>[]>(() => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
    ], []);
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
        <div className="mt-10 w-full bg-slate-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">User List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full w-full bg-slate-800 rounded-lg overflow-hidden">
              <thead className="text-left text-indigo-300 bg-slate-700">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-6 py-3">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-white divide-y divide-slate-700">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-600/50 transition">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
  }
  