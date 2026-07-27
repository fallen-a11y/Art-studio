export type SizeOption = {
  id: string;
  label: string;
  tierLabel: string;
  priceDelta: number;
};

export type FrameOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export const SIZE_OPTIONS: SizeOption[] = [
  { id: "12x16", label: '12" x 16"', tierLabel: "Base", priceDelta: 0 },
  { id: "24x36", label: '24" x 36"', tierLabel: "Medium", priceDelta: 300 },
  { id: "36x48", label: '36" x 48"', tierLabel: "Large", priceDelta: 750 },
];

export const FRAME_OPTIONS: FrameOption[] = [
  { id: "unframed", label: "Unframed / Stretched Canvas", priceDelta: 0 },
  { id: "oak", label: "Raw Oak Float Frame", priceDelta: 120 },
  { id: "gold", label: "Antique Gold Leaf Frame", priceDelta: 200 },
];

export const DEPOSIT_RATIO = 0.5;

export type Medium = {
  id: string;
  name: string;
  tagline: string;
  image: string;
};

export const MEDIUMS: Medium[] = [
  {
    id: "watercolors",
    name: "Watercolors & Fine Paper",
    tagline: "Translucent washes on cotton-rag paper",
    image: "https://images.unsplash.com/photo-1629654858857-615c2c8be8a8",
  },
  {
    id: "oils",
    name: "Oils & Contemporary Canvases",
    tagline: "Layered pigment, built up by hand",
    image: "https://images.unsplash.com/photo-1548685913-fe6678babe8d",
  },
  {
    id: "miniatures",
    name: "Traditional Miniatures & Gold Leaf",
    tagline: "Heritage detail work, gilded by hand",
    image: "https://images.unsplash.com/photo-1618352357270-ef40d25bcef8",
  },
  {
    id: "tiles",
    name: "Custom Hand-Painted Tiles",
    tagline: "Kiln-fired glaze, laid to order",
    image: "https://images.unsplash.com/photo-1551893478-d726eaf0442c",
  },
];

export type Artwork = {
  id: string;
  title: string;
  mediumId: string;
  mediumLabel: string;
  description: string;
  basePrice: number;
  image: string;
};

export const ARTWORKS: Artwork[] = [
  {
    id: "oasis-in-ochre",
    title: "Oasis in Ochre",
    mediumId: "oils",
    mediumLabel: "Oil on Linen",
    description:
      "A sun-warmed study in ochre and umber, built in slow layers to hold the weight of afternoon light.",
    basePrice: 350,
    image: "https://images.unsplash.com/photo-1614189647266-8fbdad9c72de",
  },
  {
    id: "quiet-tide",
    title: "Quiet Tide",
    mediumId: "watercolors",
    mediumLabel: "Watercolor on Cotton Paper",
    description:
      "Loose, breathing washes tracing a coastline at low tide — restrained, transparent, unhurried.",
    basePrice: 280,
    image: "https://images.unsplash.com/photo-1630609083938-3acb39a06392",
  },
  {
    id: "gilded-study-no-3",
    title: "Gilded Study No. 3",
    mediumId: "miniatures",
    mediumLabel: "Traditional Miniature, Gold Leaf",
    description:
      "Fine-brush miniature work finished with hand-applied gold leaf, in the heritage atelier tradition.",
    basePrice: 620,
    image: "https://images.unsplash.com/photo-1594292226956-b227b6fe7be1",
  },
  {
    id: "terracotta-weave",
    title: "Terracotta Weave",
    mediumId: "tiles",
    mediumLabel: "Hand-Painted Tile, Kiln-Fired",
    description:
      "A woven geometric motif glazed by hand and kiln-fired for a floor or wall installation.",
    basePrice: 410,
    image: "https://images.unsplash.com/photo-1613124152913-c180d8c1d740",
  },
  {
    id: "storm-over-the-valley",
    title: "Storm Over the Valley",
    mediumId: "oils",
    mediumLabel: "Oil on Canvas",
    description:
      "A classical, weather-broken valley scene — shafts of light cutting through storm cloud onto still water.",
    basePrice: 520,
    image: "https://images.unsplash.com/photo-1685391722227-df9eec0583ec",
  },
  {
    id: "faded-bloom",
    title: "Faded Bloom",
    mediumId: "watercolors",
    mediumLabel: "Watercolor & Ink",
    description:
      "A single stem in diluted watercolor, left to bleed softly into breathing, unbounded paper.",
    basePrice: 310,
    image: "https://images.unsplash.com/photo-1530903677198-7c9f3577a63e",
  },
];

export function priceForSelection(
  basePrice: number,
  sizeId: string,
  frameId: string
) {
  const size = SIZE_OPTIONS.find((s) => s.id === sizeId) ?? SIZE_OPTIONS[0];
  const frame = FRAME_OPTIONS.find((f) => f.id === frameId) ?? FRAME_OPTIONS[0];
  const total = basePrice + size.priceDelta + frame.priceDelta;
  return {
    total,
    deposit: Math.round(total * DEPOSIT_RATIO),
  };
}
