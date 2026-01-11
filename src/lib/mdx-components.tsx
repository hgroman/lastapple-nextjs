import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { Callout } from '@/components/content/prose/Callout';
import { CodeBlock } from '@/components/content/prose/CodeBlock';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
} from '@/components/content/prose/Table';

// Type-safe component mappings for MDX
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type LinkProps = ComponentPropsWithoutRef<'a'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type CodeProps = ComponentPropsWithoutRef<'code'>;
type PreProps = ComponentPropsWithoutRef<'pre'> & {
  'data-language'?: string;
  'data-filename'?: string;
};
type ImageProps = ComponentPropsWithoutRef<'img'>;

export const mdxComponents = {
  // Headings
  h1: (props: HeadingProps) => (
    <h1
      className="text-3xl sm:text-4xl font-bold tracking-tight mt-12 mb-6 first:mt-0"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-2xl sm:text-3xl font-bold tracking-tight mt-12 mb-4 pb-2 border-b border-border"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-xl sm:text-2xl font-semibold tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="text-lg font-semibold tracking-tight mt-6 mb-2"
      {...props}
    />
  ),
  h5: (props: HeadingProps) => (
    <h5
      className="text-base font-semibold tracking-tight mt-4 mb-2"
      {...props}
    />
  ),
  h6: (props: HeadingProps) => (
    <h6
      className="text-sm font-semibold tracking-tight mt-4 mb-2 text-muted-foreground"
      {...props}
    />
  ),

  // Paragraphs
  p: (props: ParagraphProps) => (
    <p className="text-muted-foreground leading-relaxed my-4" {...props} />
  ),

  // Links
  a: ({ href, ...props }: LinkProps) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
          {...props}
        />
      );
    }
    return (
      <Link
        href={href || '#'}
        className="text-primary hover:underline"
        {...props}
      />
    );
  },

  // Lists
  ul: (props: ListProps) => (
    <ul className="my-4 ml-6 list-disc text-muted-foreground space-y-2" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="my-4 ml-6 list-decimal text-muted-foreground space-y-2" {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className="leading-relaxed" {...props} />
  ),

  // Blockquotes
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 border-l-4 border-primary bg-card/50 py-2 px-6 italic text-muted-foreground rounded-r-lg"
      {...props}
    />
  ),

  // Code
  code: ({ children, ...props }: CodeProps) => {
    // Inline code
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-muted text-accent font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Pre (code blocks)
  pre: ({ children, 'data-language': language, 'data-filename': filename, ...props }: PreProps) => {
    // Extract text content from children
    const codeContent = typeof children === 'string'
      ? children
      : (children as { props?: { children?: string } })?.props?.children || '';

    return (
      <CodeBlock language={language} filename={filename}>
        {codeContent}
      </CodeBlock>
    );
  },

  // Images
  img: ({ src, alt, ...props }: ImageProps) => (
    <img
      src={src}
      alt={alt || ''}
      className="my-6 rounded-lg border border-border max-w-full h-auto"
      loading="lazy"
      {...props}
    />
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-none h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  ),

  // Tables
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  td: TableCell,
  th: TableHeaderCell,

  // Custom components
  Callout,
  CodeBlock,
};

export type MDXComponents = typeof mdxComponents;
