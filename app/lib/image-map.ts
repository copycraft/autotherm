import imageMapData from './image-map.json';

const map: Record<string, string> = imageMapData as Record<string, string>;

export function getLocalImage(url: string): string {
  if (!url) return '/placeholder.svg';
  const mapped = map[url];
  if (!mapped) return '/placeholder.svg';
  if (mapped.startsWith('/images/')) return mapped;
  if (mapped.startsWith('http')) return mapped;
  return '/placeholder.svg';
}
