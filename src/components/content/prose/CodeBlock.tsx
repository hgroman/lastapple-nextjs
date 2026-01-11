'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language = 'plaintext',
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.split('\n');

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          {/* Dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {filename && (
            <span className="ml-2 text-sm text-muted-foreground font-mono">
              {filename}
            </span>
          )}
          {!filename && language !== 'plaintext' && (
            <span className="ml-2 text-xs text-muted-foreground uppercase">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          <code>
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="select-none w-8 text-right pr-4 text-muted-foreground/50">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              children
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
