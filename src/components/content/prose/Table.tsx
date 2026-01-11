'use client';

import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
  isHeader?: boolean;
}

interface TableCellProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

export function Table({ children }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-muted/50">
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TableRow({ children, isHeader = false }: TableRowProps) {
  return (
    <tr className={isHeader ? '' : 'hover:bg-muted/30 transition-colors'}>
      {children}
    </tr>
  );
}

export function TableCell({ children, align = 'left' }: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <td className={`px-4 py-3 ${alignClass[align]} text-muted-foreground`}>
      {children}
    </td>
  );
}

export function TableHeaderCell({ children, align = 'left' }: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <th className={`px-4 py-3 ${alignClass[align]} font-semibold text-foreground`}>
      {children}
    </th>
  );
}
