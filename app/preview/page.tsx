'use client';
import React, { useState } from 'react';
import { localStorageLayoutRepository } from '@/src/features/builder/infra/localStorageLayoutRepository';
import { PageLayout } from '@/src/features/builder/model/types';
import { PreviewRenderer } from '@/src/features/builder/ui/PreviewRenderer';

export default function PreviewPage() {
  const [state] = useState<{ layout: PageLayout | null; repaired: boolean; malformed: boolean }>(
    () => {
      return localStorageLayoutRepository.loadLayout();
    }
  );

  const layout = state.layout;

  if (!layout) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            {state.malformed ? 'Saved page is invalid' : 'No saved page yet'}
          </h1>
          <p className="mt-2 text-slate-600">
            {state.malformed
              ? 'The stored layout could not be repaired. Open the editor and load or rebuild your layout.'
              : 'Build a layout in the editor, save it, then open preview.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {state.repaired ? (
        <div className="mx-auto w-full max-w-6xl px-4 pt-4">
          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Saved layout had minor issues and was auto-repaired for preview.
          </div>
        </div>
      ) : null}

      <PreviewRenderer layout={layout} />
    </div>
  );
}
