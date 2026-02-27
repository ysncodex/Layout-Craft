export type ComponentType =
  | 'text'
  | 'button'
  | 'ratingStars'
  | 'image'
  | 'gallery'
  | 'spacer'
  | 'pill'
  | 'inputField'
  | 'iconText'
  | 'priceTag';

export type TextComponent = {
  id: string;
  type: 'text';
  text: string;
};

export type ButtonComponent = {
  id: string;
  type: 'button';
  label: string;
  url: string;
  variant: 'primary' | 'success' | 'ghost';
  size: 'sm' | 'md';
};

export type RatingStarsComponent = {
  id: string;
  type: 'ratingStars';
  rating: number;
  count: number;
};

export type ImageComponent = {
  id: string;
  type: 'image';
  src: string;
  alt: string;
};

export type GalleryComponent = {
  id: string;
  type: 'gallery';
  images: string[];
};

export type SpacerComponent = {
  id: string;
  type: 'spacer';
  height: number;
};

export type PillComponent = {
  id: string;
  type: 'pill';
  label: string;
  tone: 'default' | 'active';
};

export type InputFieldComponent = {
  id: string;
  type: 'inputField';
  label: string;
  placeholder: string;
};

export type IconTextComponent = {
  id: string;
  type: 'iconText';
  icon: string;
  text: string;
};

export type PriceTagComponent = {
  id: string;
  type: 'priceTag';
  amount: string;
  suffix: string;
};

export type BuilderComponent =
  | TextComponent
  | ButtonComponent
  | RatingStarsComponent
  | ImageComponent
  | GalleryComponent
  | SpacerComponent
  | PillComponent
  | InputFieldComponent
  | IconTextComponent
  | PriceTagComponent;

export type ComponentMap = {
  text: TextComponent;
  button: ButtonComponent;
  ratingStars: RatingStarsComponent;
  image: ImageComponent;
  gallery: GalleryComponent;
  spacer: SpacerComponent;
  pill: PillComponent;
  inputField: InputFieldComponent;
  iconText: IconTextComponent;
  priceTag: PriceTagComponent;
};

export type ComponentPatchByType = {
  [Type in ComponentType]: Partial<Omit<ComponentMap[Type], 'id' | 'type'>>;
};

export type ComponentUpdate = {
  [Type in ComponentType]: {
    type: Type;
    patch: ComponentPatchByType[Type];
  };
}[ComponentType];

export type Column = {
  id: string;
  span: number;
  components: BuilderComponent[];
};

export type Row = {
  id: string;
  label?: string;
  columns: Column[];
};

export type Section = {
  id: string;
  name: string;
  label?: string;
  rows: Row[];
};

export type PageLayout = {
  title: string;
  sections: Section[];
};
