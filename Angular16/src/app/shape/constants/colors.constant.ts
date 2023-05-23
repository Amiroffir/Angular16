export const SystemColors = {
  Default: 'Black',
  Red: 'Red',
  Green: 'Green',
  Blue: 'Blue',
} as const;

// Colors as Iterable<string>
export type Color = (typeof SystemColors)[keyof typeof SystemColors];
