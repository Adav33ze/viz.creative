import mediaManifest from './generated-media.json'

export function publicMediaPath(path: string | undefined) {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  return path.startsWith('/') ? path : `/${path}`
}

type ImageAttributes = { src: string; width?: number; height?: number; srcSet?: string }

export function imageAttributes(path: string): ImageAttributes {
  const source = publicMediaPath(path)
  return (mediaManifest as Record<string, ImageAttributes>)[source] || { src: source }
}

export function optimizedMediaPath(path: string | undefined) {
  return path ? imageAttributes(path).src : ''
}
