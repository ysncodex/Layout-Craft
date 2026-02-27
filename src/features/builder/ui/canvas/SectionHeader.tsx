'use client';

import React from 'react';
import { Section } from '../../model/types';

export const SectionHeader = ({
  section,
  collapsed,
  onToggle,
  onAddRow,
  onDelete,
}: {
  section: Section;
  collapsed: boolean;
  onToggle: () => void;
  onAddRow: () => void;
  onDelete: () => void;
}) => {
  return (
    <header className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-[13px] text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`Toggle section ${section.label ?? section.name}`}
        >
          {collapsed ? '▸' : '▾'}
        </button>
        <button
          type="button"
          onClick={onAddRow}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-[12px] text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`Add row to section ${section.label ?? section.name}`}
        >
          ⠿
        </button>
        <h3 className="text-[16px] font-semibold leading-none text-slate-700" aria-label="Section name">
          {section.name}
        </h3>
        {section.label ? (
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
            {section.label}
          </span>
        ) : null}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onAddRow}
          className="rounded-md border border-slate-300 px-2 py-1 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={`Add row to section ${section.label ?? section.name}`}
        >
          + Add Row
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-slate-300 px-2 py-1 text-[12px] font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label={`Delete section ${section.label ?? section.name}`}
        >
          Delete
        </button>
      </div>
    </header>
  );
};
