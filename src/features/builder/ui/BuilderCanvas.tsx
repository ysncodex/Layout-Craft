'use client';

import React from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import { CanvasSectionList } from './canvas/CanvasSectionList';
import { useCollapseState } from './canvas/useCollapseState';

export const BuilderCanvas = () => {
  const layout = useBuilderStore((state) => state.layout);
  const addRow = useBuilderStore((state) => state.addRow);
  const deleteRow = useBuilderStore((state) => state.deleteRow);
  const addColumn = useBuilderStore((state) => state.addColumn);
  const deleteSection = useBuilderStore((state) => state.deleteSection);
  const { sectionCollapseState, rowCollapseState, toggleSection, toggleRow } = useCollapseState();

  return (
    <main className="flex-1 overflow-auto bg-slate-100 p-3.5">
      <div className="mx-auto max-w-245 space-y-3">
        <CanvasSectionList
          sections={layout.sections}
          sectionCollapseState={sectionCollapseState}
          rowCollapseState={rowCollapseState}
          onToggleSection={toggleSection}
          onToggleRow={toggleRow}
          onAddRow={addRow}
          onDeleteSection={deleteSection}
          onAddColumn={addColumn}
          onDeleteRow={deleteRow}
        />
      </div>
    </main>
  );
};
