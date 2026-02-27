'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ComponentType } from '../model/types';
import { PaletteDragData } from './dnd';
import { TypeIcon } from './TypeIcon';

type PaletteItem = {
  type: ComponentType;
  label: string;
};

const PALETTE_ITEMS: PaletteItem[] = [
  { type: 'text', label: 'Text' },
  { type: 'button', label: 'Button' },
  { type: 'ratingStars', label: 'Rating' },
  { type: 'image', label: 'Image' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'spacer', label: 'Spacer' },
  { type: 'pill', label: 'Pill' },
  { type: 'inputField', label: 'Field' },
  { type: 'iconText', label: 'Meta' },
  { type: 'priceTag', label: 'Price' },
];

const PaletteButton = ({ item }: { item: PaletteItem }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${item.type}`,
    data: {
      kind: 'palette',
      componentType: item.type,
    } satisfies PaletteDragData,
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex h-11 items-center justify-start gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 text-[12px] font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800 ${isDragging ? 'opacity-60' : ''}`}
      type="button"
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-slate-700 bg-slate-950 text-slate-400">
        <TypeIcon type={item.type} className="h-3.5 w-3.5" />
      </span>
      {item.label}
    </button>
  );
};

export const ComponentPalette = () => {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-3">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-sm">
        <h2 className="text-4xl font-semibold leading-none tracking-tight text-slate-100">
          Inspector
        </h2>
        <p className="mt-5 text-[13px] leading-snug text-slate-400">
          Select a component to edit its props.
        </p>

        <div className="mt-6 h-px w-full bg-slate-700/80" />

        <div className="mt-5">
          <h3 className="text-[13px] font-semibold text-slate-100">Components</h3>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {PALETTE_ITEMS.map((item) => (
              <PaletteButton key={item.type} item={item} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
