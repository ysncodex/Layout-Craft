'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { InsertDropData } from '../dnd';

export const InsertDropLine = ({ columnId, index }: { columnId: string; index: number }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `insert-${columnId}-${index}`,
    data: {
      kind: 'insert',
      columnId,
      index,
    } satisfies InsertDropData,
  });

  return (
    <div
      ref={setNodeRef}
      className={`my-0.5 rounded-md transition-all duration-150 ${isOver ? 'h-3 bg-sky-500 shadow-[0_0_0_1px_rgba(14,165,233,0.45)] animate-pulse' : 'h-2 bg-transparent'}`}
      aria-hidden
    />
  );
};
