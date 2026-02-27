'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SectionDropData } from '../dnd';

export const SectionDropSurface = ({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `section-${sectionId}`,
    data: {
      kind: 'section',
      sectionId,
    } satisfies SectionDropData,
  });

  return (
    <section
      ref={setNodeRef}
      className={`rounded-lg border bg-white p-2.5 shadow-sm ${isOver ? 'border-sky-400 ring-1 ring-sky-300' : 'border-slate-200'}`}
    >
      {children}
    </section>
  );
};
