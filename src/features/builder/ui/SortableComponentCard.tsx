'use client';

import React, { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderComponent } from '../model/types';
import { useBuilderStore } from '../store/useBuilderStore';
import { ComponentDragData } from './dnd';
import { ComponentRenderer } from './ComponentRenderer';
import { TypeIcon } from './TypeIcon';
import { renderComponentEditorFields } from './componentEditors/renderComponentEditorFields';

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const loadImageElement = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image for processing.'));
    image.src = src;
  });

const compressImageFile = async (
  file: File,
  options?: { maxDimension?: number; quality?: number }
) => {
  const maxDimension = options?.maxDimension ?? 1280;
  const quality = options?.quality ?? 0.72;

  if (file.type === 'image/svg+xml') {
    return readAsDataUrl(file);
  }

  const dataUrl = await readAsDataUrl(file);
  const image = await loadImageElement(dataUrl);

  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  if (!context) {
    return dataUrl;
  }

  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', quality);
};

export const SortableComponentCard = ({
  component,
  columnId,
}: {
  component: BuilderComponent;
  columnId: string;
}) => {
  const removeComponent = useBuilderStore((state) => state.removeComponent);
  const updateComponent = useBuilderStore((state) => state.updateComponent);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `component-${component.id}`,
    data: {
      kind: 'component',
      componentId: component.id,
      columnId,
    } satisfies ComponentDragData,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-md border border-slate-200 bg-white ${isDragging ? 'opacity-60' : ''}`}
    >
      <header
        className="flex cursor-grab items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-[10px] text-indigo-500"
            aria-label="Drag component"
          >
            <TypeIcon type={component.type} className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {component.type}
          </span>
        </div>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => removeComponent(columnId, component.id)}
          className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-[12px] font-semibold text-slate-500 hover:text-rose-600"
        >
          <span className="text-[11px]">🗑</span>
          Delete
        </button>
      </header>

      <div
        className="space-y-2 p-3"
        onClick={() => {
          if (component.type === 'image') {
            imageInputRef.current?.click();
          }
          if (component.type === 'gallery') {
            galleryInputRef.current?.click();
          }
        }}
      >
        <ComponentRenderer component={component} previewOnly={false} />

        {renderComponentEditorFields(component, updateComponent)}

        {component.type === 'image' && (
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (event) => {
              try {
                const file = event.target.files?.[0];
                if (!file) return;

                const base64 = await compressImageFile(file, { maxDimension: 1600, quality: 0.78 });
                updateComponent(component.id, {
                  type: 'image',
                  patch: { src: base64 },
                });
              } finally {
                event.currentTarget.value = '';
              }
            }}
          />
        )}

        {component.type === 'gallery' && (
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (event) => {
              try {
                const files = event.target.files;
                if (!files || files.length === 0) return;

                const encoded = await Promise.all(
                  Array.from(files).map((file) =>
                    compressImageFile(file, { maxDimension: 1024, quality: 0.68 })
                  )
                );

                updateComponent(component.id, {
                  type: 'gallery',
                  patch: { images: encoded.filter(Boolean) },
                });
              } finally {
                event.currentTarget.value = '';
              }
            }}
          />
        )}

      </div>
    </article>
  );
};
