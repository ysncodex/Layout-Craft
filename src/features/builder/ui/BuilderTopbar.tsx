'use client';

import React, { useMemo, useState } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';

export const BuilderTopbar = () => {
  const title = useBuilderStore((state) => state.layout.title);
  const setTitle = useBuilderStore((state) => state.setTitle);
  const loadTravelLandingTemplate = useBuilderStore((state) => state.loadTravelLandingTemplate);
  const addSection = useBuilderStore((state) => state.addSection);
  const undo = useBuilderStore((state) => state.undo);
  const redo = useBuilderStore((state) => state.redo);
  const canUndo = useBuilderStore((state) => state.pastLayouts.length > 0);
  const canRedo = useBuilderStore((state) => state.futureLayouts.length > 0);
  const saveLayout = useBuilderStore((state) => state.saveLayout);

  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');

  const statusText = useMemo(() => {
    if (status === 'saved') return 'Saved';
    if (status === 'error') return 'Save failed';
    return 'Unsaved';
  }, [status]);

  const handleSave = () => {
    const ok = saveLayout();
    setStatus(ok ? 'saved' : 'error');
    setTimeout(() => setStatus('idle'), 1500);
  };

  const handleView = () => {
    const ok = saveLayout();
    setStatus(ok ? 'saved' : 'error');
    if (ok) {
      window.open('/preview', '_blank', 'noopener,noreferrer');
    }
  };

  const statusClasses =
    status === 'error'
      ? 'border-rose-800 bg-rose-950 text-rose-300'
      : status === 'saved'
        ? 'border-sky-900 bg-sky-950 text-sky-300'
        : 'border-slate-700 bg-slate-900 text-slate-300';

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950 px-2.5 md:px-4">
      <div className="flex h-full items-center justify-between gap-2.5">
        <div className="flex items-end gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Page Title
            </span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-8 w-46 rounded-lg border border-slate-700 bg-slate-900 px-2.5 text-xs font-medium text-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Page title"
            />
          </label>

          <button
            onClick={addSection}
            className="h-8 rounded-lg border border-slate-700 bg-slate-900 px-3 text-[11px] font-semibold text-slate-100 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Add section"
          >
            + Add Section
          </button>

          <button
            onClick={loadTravelLandingTemplate}
            className="h-8 rounded-lg border border-emerald-800 bg-emerald-950 px-3 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Load travel landing template"
          >
            Load Travel Template
          </button>

          <button
            onClick={handleSave}
            className="h-8 rounded-lg border border-slate-700 bg-slate-900 px-3 text-[11px] font-semibold text-slate-100 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Save layout"
          >
            Save
          </button>

          <span
            className={`inline-flex h-8 items-center rounded-full border px-3 text-[11px] font-semibold ${statusClasses}`}
          >
            {statusText}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={undo}
            className="h-7.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-[10px] font-semibold text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            disabled={!canUndo}
            aria-label="Undo last change"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="h-7.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 text-[10px] font-semibold text-slate-400 disabled:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            disabled={!canRedo}
            aria-label="Redo last undone change"
          >
            Redo
          </button>
          <button
            onClick={handleView}
            className="h-8 rounded-lg border border-slate-700 bg-slate-900 px-3.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Open page preview"
          >
            View Page
          </button>
        </div>
      </div>
    </header>
  );
};
