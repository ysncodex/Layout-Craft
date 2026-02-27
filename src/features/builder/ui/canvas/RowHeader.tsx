'use client';

import React from 'react';
import { Row } from '../../model/types';

export const RowHeader = ({
  row,
  rowIndex,
  collapsed,
  onToggle,
  onAddColumn,
  onDelete,
}: {
  row: Row;
  rowIndex: number;
  collapsed: boolean;
  onToggle: () => void;
  onAddColumn: () => void;
  onDelete: () => void;
}) => {
  const rowName = row.label ?? `Row ${rowIndex + 1}`;

  return (
    <header className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-[13px] text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`Toggle ${rowName}`}
        >
          {collapsed ? '▸' : '▾'}
        </button>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-[12px] text-slate-600">
          ⠿
        </span>
        <span className="text-[15px] font-semibold leading-none text-slate-700">Row {rowIndex + 1}</span>
        {row.label ? (
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
            {row.label}
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onAddColumn}
          className="rounded-md border border-slate-300 px-2 py-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`Add column to ${rowName}`}
        >
          + Add Column
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-slate-300 px-2 py-1 text-[12px] font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label={`Delete ${rowName}`}
        >
          Delete Row
        </button>
      </div>
    </header>
  );
};
