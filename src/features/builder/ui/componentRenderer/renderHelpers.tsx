import Image from 'next/image';
import React from 'react';
import {
  BuilderComponent,
  ButtonComponent,
  GalleryComponent,
  IconTextComponent,
  ImageComponent,
  InputFieldComponent,
  PillComponent,
  PriceTagComponent,
  RatingStarsComponent,
  TextComponent,
} from '../../model/types';

export type RenderContext = {
  sectionName?: string;
  rowIndex?: number;
  componentIndex?: number;
  previewOnly: boolean;
};

const getSection = (sectionName?: string) => sectionName?.toLowerCase() ?? '';

export const renderTextComponent = (component: TextComponent, context: RenderContext) => {
  const section = getSection(context.sectionName);

  if (section === 'hero') {
    if (component.text === 'Save more, Travel more') {
      return (
        <p className="text-center font-serif text-6xl font-semibold italic text-white">
          {component.text}
        </p>
      );
    }

    if (component.text === 'Find the best flights, hotels and destinations in one place.') {
      return <p className="text-center text-sm text-slate-200">{component.text}</p>;
    }

    if (context.rowIndex === 0 && component.text.toUpperCase() === component.text) {
      return <p className="text-xl font-bold tracking-wide text-emerald-400">{component.text}</p>;
    }

    if (context.rowIndex === 3) {
      return <p className="text-center text-sm text-slate-200">{component.text}</p>;
    }

    if (context.rowIndex === 0) {
      if (component.text === 'Contact Us —' || component.text === 'Customer service') {
        return (
          <p className="w-full text-center text-xs leading-4 text-slate-300">{component.text}</p>
        );
      }

      return <p className="text-xs leading-4 text-slate-300">{component.text}</p>;
    }

    return <p className="text-[14px] leading-6 text-slate-200">{component.text}</p>;
  }

  if (section === 'offers') {
    if (context.rowIndex === 0) {
      return <p className="text-center text-3xl font-semibold text-slate-800">{component.text}</p>;
    }

    if (context.rowIndex === 1) {
      return <p className="text-sm text-slate-500">{component.text}</p>;
    }

    if (component.text.includes('%')) {
      return <p className="text-base font-semibold text-slate-900">{component.text}</p>;
    }

    return <p className="text-sm text-slate-500">{component.text}</p>;
  }

  if (section === 'recommended') {
    if (context.rowIndex === 0) {
      return <p className="text-center text-3xl font-semibold text-slate-900">{component.text}</p>;
    }

    if (component.text.includes('$')) {
      return <p className="text-lg font-semibold text-slate-900">{component.text}</p>;
    }

    return <p className="text-sm text-slate-700">{component.text}</p>;
  }

  if (section === 'destinations') {
    if (context.rowIndex === 0 && context.componentIndex === 0) {
      return <p className="text-center text-4xl font-semibold text-slate-900">{component.text}</p>;
    }

    if (context.rowIndex === 0 && context.componentIndex === 1) {
      return (
        <p className="mx-auto max-w-3xl text-center text-sm text-slate-500">{component.text}</p>
      );
    }

    if (component.text.includes('accommodations')) {
      return <p className="text-[11px] text-slate-500">{component.text}</p>;
    }

    return <p className="text-sm font-semibold text-slate-900">{component.text}</p>;
  }

  if (section === 'footer') {
    if (context.rowIndex === 0 || component.text === 'Payment Methods') {
      return <p className="text-sm font-semibold text-slate-800">{component.text}</p>;
    }

    if (context.rowIndex === 2 && component.text === 'Our Partners') {
      return <p className="mb-1 text-xs font-semibold text-slate-700">{component.text}</p>;
    }

    return <p className="text-xs text-slate-500">{component.text}</p>;
  }

  return <p className="text-[14px] leading-6 text-slate-600">{component.text}</p>;
};

export const renderButtonComponent = (component: ButtonComponent, context: RenderContext) => {
  const section = getSection(context.sectionName);

  const variantClass =
    component.variant === 'success'
      ? 'bg-emerald-500 text-white'
      : component.variant === 'ghost'
        ? 'border border-slate-300 bg-white text-slate-700'
        : 'bg-indigo-600 text-white';

  const sizeClass =
    component.size === 'sm'
      ? 'px-3 py-1.5 text-[11px] leading-none'
      : 'px-4 py-2 text-sm leading-none';

  const isHeroTopRow = section === 'hero' && context.rowIndex === 0;
  const isHeroSearchRow = section === 'hero' && context.rowIndex === 5;
  const heroTopRowClass = isHeroTopRow
    ? 'h-7 rounded-md px-3 text-xs font-semibold tracking-tight'
    : '';
  const heroSearchRowClass = isHeroSearchRow ? 'h-10 rounded-md px-8 text-base font-semibold' : '';

  return (
    <a
      href={component.url || '#'}
      onClick={(event) => {
        if (!context.previewOnly) {
          event.preventDefault();
        }
      }}
      className={`inline-flex items-center justify-center gap-1 rounded-md font-semibold ${variantClass} ${sizeClass} ${heroTopRowClass} ${heroSearchRowClass} ${section === 'hero' && context.rowIndex !== 0 ? 'mx-auto' : ''}`}
    >
      {component.label}
    </a>
  );
};

export const renderRatingStarsComponent = (component: RatingStarsComponent) => {
  const fullStars = Math.max(0, Math.min(component.count, component.rating));
  const emptyStars = Math.max(0, component.count - fullStars);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={`full-${index}`} className="text-[12px] text-amber-500">
          ★
        </span>
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={`empty-${index}`} className="text-[12px] text-slate-300">
          ★
        </span>
      ))}
    </div>
  );
};

export const renderImageComponent = (component: ImageComponent, context: RenderContext) => {
  const section = getSection(context.sectionName);
  const isFooterPaymentLogo = section === 'footer' && component.alt.toLowerCase().includes('logo');
  const isFooterPartnerLogo =
    section === 'footer' && component.alt.toLowerCase().includes('partner');

  if (!component.src) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 px-3 py-2 text-[13px] text-slate-500">
        Click to upload image
      </div>
    );
  }

  return (
    <div
      className={
        section === 'hero'
          ? 'relative h-85 w-full overflow-hidden rounded-none border-0'
          : isFooterPaymentLogo
            ? 'relative mb-1 mr-1 inline-block h-6 w-16 overflow-hidden rounded-sm border border-slate-300 bg-white align-middle'
            : isFooterPartnerLogo
              ? 'relative mr-2 inline-block h-8 w-26 overflow-hidden rounded-sm border border-slate-300 bg-white align-middle'
              : section === 'recommended'
                ? 'relative h-36 w-full overflow-hidden rounded-lg border border-slate-200'
                : section === 'destinations'
                  ? 'relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200'
                  : 'relative h-56 w-full overflow-hidden rounded-md border border-slate-200'
      }
    >
      <Image
        src={component.src}
        alt={component.alt}
        fill
        className={section === 'footer' ? 'object-contain p-1' : 'object-cover'}
        sizes="100vw"
        unoptimized
      />
    </div>
  );
};

export const renderGalleryComponent = (component: GalleryComponent) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {component.images.length === 0 ? (
        <div className="col-span-full rounded-none border-0 p-0 text-[13px] text-slate-500">
          No media selected.
        </div>
      ) : (
        component.images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-22 overflow-hidden rounded-md border border-slate-200"
          >
            <Image
              src={src}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-cover"
              sizes="33vw"
              unoptimized
            />
          </div>
        ))
      )}
    </div>
  );
};

export const renderPillComponent = (component: PillComponent, context: RenderContext) => {
  const section = getSection(context.sectionName);
  const isFooter = section === 'footer';
  const isHero = section === 'hero';
  const isRecommended = section === 'recommended';
  const isActive = component.tone === 'active';

  if (isHero && context.rowIndex === 0 && component.label.startsWith('USD')) {
    return (
      <span className="inline-flex h-7 min-w-13 items-center justify-center rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700">
        {component.label}
      </span>
    );
  }

  return (
    <span
      className={
        isFooter
          ? 'inline-flex h-6 items-center rounded-md border border-slate-300 bg-white px-2 text-[10px] font-semibold text-slate-600'
          : isHero
            ? `inline-flex h-7 items-center rounded-full px-3 text-[11px] font-semibold ${isActive ? 'bg-emerald-500 text-white' : 'border border-slate-200 bg-white text-slate-600'}`
            : isRecommended
              ? `inline-flex h-7 items-center rounded-full px-4 text-[11px] font-semibold ${isActive ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-500'}`
              : `inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${isActive ? 'bg-emerald-500 text-white' : 'border border-slate-300 bg-white text-slate-600'}`
      }
    >
      {component.label}
    </span>
  );
};

export const renderInputFieldComponent = (component: InputFieldComponent) => {
  return (
    <div className="h-10 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
      <p className="text-[10px] font-semibold text-slate-500">{component.label}</p>
      <p className="text-[10px] text-slate-400">{component.placeholder}</p>
    </div>
  );
};

export const renderIconTextComponent = (component: IconTextComponent, context: RenderContext) => {
  const section = getSection(context.sectionName);

  if (section === 'hero' && context.rowIndex === 0) {
    if (component.text === 'English') {
      return (
        <span className="inline-flex h-7 min-w-20 items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700">
          <span className="text-[11px]">{component.icon}</span>
          <span>{component.text}</span>
        </span>
      );
    }

    return (
      <div className="inline-flex items-center justify-end gap-1.5 text-xs text-slate-100">
        <span className="text-xs">{component.icon}</span>
        <span className="font-medium">{component.text}</span>
      </div>
    );
  }

  if (section === 'hero' && context.rowIndex === 4) {
    const isFlights = component.text.toLowerCase() === 'flights';
    return (
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm ${isFlights ? 'bg-emerald-500 text-white' : 'bg-white text-slate-500'}`}
        >
          {component.icon}
        </span>
        <span
          className={`text-[11px] font-semibold ${isFlights ? 'text-white' : 'text-slate-100'}`}
        >
          {component.text}
        </span>
      </div>
    );
  }

  if (section === 'offers' && context.rowIndex === 2) {
    return (
      <div className="inline-flex items-center gap-1.5 text-[11px] text-rose-400">
        <span className="text-[12px]">{component.icon}</span>
        {component.text.trim().length > 0 ? <span>{component.text}</span> : null}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
      <span className="text-[11px]">{component.icon}</span>
      <span>{component.text}</span>
    </div>
  );
};

export const renderPriceTagComponent = (component: PriceTagComponent) => {
  return (
    <p className="text-lg font-semibold text-slate-900">
      {component.amount}{' '}
      <span className="text-xs font-medium text-slate-500">{component.suffix}</span>
    </p>
  );
};

export const renderSpacerComponent = (component: Extract<BuilderComponent, { type: 'spacer' }>) => {
  return (
    <div style={{ height: `${component.height}px` }} className="w-full rounded-md bg-slate-100" />
  );
};
