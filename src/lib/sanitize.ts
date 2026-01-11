import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Used for rendering MDX body content safely.
 */
export function sanitizeContent(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Text formatting
      'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del', 'ins',
      'mark', 'small', 'sub', 'sup',
      // Lists
      'ul', 'ol', 'li',
      // Links and media
      'a', 'img',
      // Code
      'pre', 'code', 'kbd', 'samp', 'var',
      // Quotes and citations
      'blockquote', 'q', 'cite', 'abbr',
      // Tables
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
      // Semantic sections
      'article', 'section', 'aside', 'header', 'footer', 'nav', 'main',
      // Other
      'div', 'span', 'figure', 'figcaption', 'details', 'summary',
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading'],
      'th': ['scope', 'colspan', 'rowspan'],
      'td': ['colspan', 'rowspan'],
      'code': ['class'], // For syntax highlighting language classes
      'pre': ['class'],
      'span': ['class'],
      'div': ['class'],
      '*': ['id', 'class'], // Allow id and class on all elements
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    // Force all links to have rel="noopener noreferrer" for security
    transformTags: {
      'a': (tagName, attribs) => {
        // External links get noopener noreferrer
        if (attribs.href && (attribs.href.startsWith('http://') || attribs.href.startsWith('https://'))) {
          return {
            tagName,
            attribs: {
              ...attribs,
              rel: 'noopener noreferrer',
              target: '_blank',
            },
          };
        }
        return { tagName, attribs };
      },
    },
  });
}

/**
 * Escape HTML special characters for safe text display.
 * Use this for user-provided text that should NOT be rendered as HTML.
 */
export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
