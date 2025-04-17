import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { User } from '../../types/types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const columns = useMemo<ColumnDef<User>[]>(() => [
    { accessorKey: 'name', header: 'Nome' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'status', header: 'Status' },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex space-x-2">
            <button
              className="bg-yellow-500 text-white p-1 rounded-lg hover:bg-yellow-600"
              onClick={() => onEdit(user)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600"
              onClick={() => onDelete(user)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ], [onEdit, onDelete]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id,
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
