import type { ImgHTMLAttributes } from 'react'
import { imageAttributes } from '../../lib/media'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'> & {
  src: string
  alt: string
  sizes: string
}

// Build-time WebP variants work on static hosting without an image server.
export default function ResponsiveImage({ src, alt, loading = 'lazy', decoding = 'async', ...props }: Props) {
  return <img {...imageAttributes(src)} alt={alt} loading={loading} decoding={decoding} {...props} />
}
