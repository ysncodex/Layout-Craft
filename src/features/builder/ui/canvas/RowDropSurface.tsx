'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { RowDropData } from '../dnd';

export const RowDropSurface = ({
  sectionId,
  rowId,
  children,
}: {
  sectionId: string;
  rowId: string;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `row-${rowId}`,
    data: {
      kind: 'row',
      sectionId,
      rowId,
    } satisfies RowDropData,
  });

  return (
    <article
      ref={setNodeRef}
      className={`rounded-lg border bg-white p-2 ${isOver ? 'border-sky-400 ring-1 ring-sky-300' : 'border-slate-200'}`}
    >
      {children}
    </article>
  );
};
