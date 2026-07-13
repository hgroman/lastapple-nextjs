// Twitter uses the same branded card as OpenGraph. Re-export the OG generator
// so there is a single source of truth for the Stream social image.
export { default, size, contentType, alt } from './opengraph-image';
