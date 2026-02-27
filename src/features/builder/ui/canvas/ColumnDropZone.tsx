'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column } from '../../model/types';
import { useBuilderStore } from '../../store/useBuilderStore';
import { ColumnDropData } from '../dnd';
import { SortableComponentCard } from '../SortableComponentCard';
import { InsertDropLine } from './InsertDropLine';

export const ColumnDropZone = ({
  sectionId,
  rowId,
  column,
}: {
  sectionId: string;
  rowId: string;
  column: Column;
}) => {
  const deleteColumn = useBuilderStore((state) => state.deleteColumn);
  const setColumnSpan = useBuilderStore((state) => state.setColumnSpan);

  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      kind: 'column',
      columnId: column.id,
    } satisfies ColumnDropData,
  });

  return (
    <div style={{ gridColumn: `span ${column.span} / span ${column.span}` }} className="min-w-0">
      <article
        ref={setNodeRef}
        className={`rounded-lg border bg-slate-50 p-2 ${isOver ? 'border-sky-400 ring-1 ring-sky-300' : 'border-slate-200'}`}
      >
        <header className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-[11px] text-slate-500">
              ⠿
            </span>
            <span className="text-[13px] font-semibold leading-none text-slate-700">
              Column ({column.span}/12)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-[12px] text-slate-500">
              <span className="font-semibold">Span</span>
              <input
                type="number"
                min={1}
                max={12}
                value={column.span}
                onChange={(event) =>
                  setColumnSpan(sectionId, rowId, column.id, Number(event.target.value))
                }
                className="h-7 w-12 rounded-md border border-slate-300 bg-white px-1.5 text-[12px]"
              />
            </label>
            <button
              onClick={() => deleteColumn(sectionId, rowId, column.id)}
              className="text-[12px] font-semibold text-slate-500 hover:text-rose-600"
            >
              Delete
            </button>
          </div>
        </header>

        <SortableContext
          items={column.components.map((component) => `component-${component.id}`)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            <InsertDropLine columnId={column.id} index={0} />

            {column.components.map((component, index) => (
              <React.Fragment key={component.id}>
                <SortableComponentCard component={component} columnId={column.id} />
                <InsertDropLine columnId={column.id} index={index + 1} />
              </React.Fragment>
            ))}

            {column.components.length === 0 && (
              <div className="rounded-md border border-dashed border-slate-300 p-4 text-center text-[11px] text-slate-500">
                Drag components here
              </div>
            )}
          </div>
        </SortableContext>
      </article>
    </div>
  );
};
