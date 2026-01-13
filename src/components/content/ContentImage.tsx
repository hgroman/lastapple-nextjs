'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ContentImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  // Layout variants
  variant?: 'default' | 'full' | 'float-left' | 'float-right' | 'hero';
  // Enable zoom/lightbox on click
  zoomable?: boolean;
  // Priority loading for above-fold images
  priority?: boolean;
  // Custom aspect ratio (e.g., "16/9", "4/3", "1/1")
  aspectRatio?: string;
  // Custom className for additional styling
  className?: string;
}

export function ContentImage({
  src,
  alt,
  width,
  height,
  caption,
  variant = 'default',
  zoomable = false,
  priority = false,
  aspectRatio,
  className = '',
}: ContentImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Determine container classes based on variant
  const variantClasses = {
    default: 'my-8 mx-auto max-w-2xl',
    full: 'my-8 -mx-4 sm:-mx-8 lg:-mx-16',
    'float-left': 'float-left mr-6 mb-4 mt-2 w-1/2 max-w-xs',
    'float-right': 'float-right ml-6 mb-4 mt-2 w-1/2 max-w-xs',
    hero: 'my-12 mx-auto max-w-4xl',
  };

  // Determine aspect ratio style
  const getAspectStyle = () => {
    if (aspectRatio) {
      return { aspectRatio };
    }
    if (width && height) {
      return { aspectRatio: `${width}/${height}` };
    }
    return { aspectRatio: '16/9' }; // Default
  };

  const handleZoomClick = () => {
    if (zoomable) {
      setIsZoomed(true);
    }
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`${variantClasses[variant]} ${className}`}
      >
        <div
          className={`relative overflow-hidden rounded-xl border border-border/50 shadow-lg shadow-primary/5 ${
            zoomable ? 'cursor-zoom-in group' : ''
          }`}
          style={getAspectStyle()}
          onClick={handleZoomClick}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-10 pointer-events-none" />

          {/* Image */}
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes={
              variant === 'full'
                ? '100vw'
                : variant === 'float-left' || variant === 'float-right'
                ? '(max-width: 640px) 50vw, 320px'
                : '(max-width: 768px) 100vw, 672px'
            }
          />

          {/* Zoom indicator */}
          {zoomable && (
            <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <ZoomIn className="h-4 w-4 text-foreground" />
            </div>
          )}
        </div>

        {/* Caption */}
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
            {caption}
          </figcaption>
        )}
      </motion.figure>

      {/* Lightbox/Zoom Modal */}
      {isZoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
          onClick={handleCloseZoom}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors z-50"
            onClick={handleCloseZoom}
            aria-label="Close zoom"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Zoomed image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Caption in lightbox */}
          {caption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg bg-card/90 backdrop-blur-sm border border-border">
              <p className="text-sm text-foreground">{caption}</p>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

// Gallery component for multiple images
interface ContentGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  columns?: 2 | 3 | 4;
  zoomable?: boolean;
}

export function ContentGallery({
  images,
  columns = 3,
  zoomable = true,
}: ContentGalleryProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`grid ${columnClasses[columns]} gap-4 my-8`}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ContentImage
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            zoomable={zoomable}
            aspectRatio="1/1"
            variant="default"
            className="my-0"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Before/After comparison component
interface ContentCompareProps {
  before: {
    src: string;
    alt: string;
    label?: string;
  };
  after: {
    src: string;
    alt: string;
    label?: string;
  };
  caption?: string;
}

export function ContentCompare({ before, after, caption }: ContentCompareProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-8"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Before */}
        <div className="relative">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50">
            <Image
              src={before.src}
              alt={before.alt}
              fill
              className="object-cover"
            />
          </div>
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-red-500/90 text-white">
            {before.label || 'Before'}
          </span>
        </div>

        {/* After */}
        <div className="relative">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50">
            <Image
              src={after.src}
              alt={after.alt}
              fill
              className="object-cover"
            />
          </div>
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-green-500/90 text-white">
            {after.label || 'After'}
          </span>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
