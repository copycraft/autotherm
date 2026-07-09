'use client';
import Image from 'next/image';
import { getLocalImage } from '@/app/lib/image-map';

interface ImgProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function Img({ src, alt, width, height, className, fill, priority }: ImgProps) {
  const localSrc = getLocalImage(src);
  if (fill) {
    return (
      <Image
        src={localSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
    />
  );
}
