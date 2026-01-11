'use client';

import { motion } from 'framer-motion';
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<CalloutType, { icon: typeof Info; className: string; borderColor: string }> = {
  info: {
    icon: Info,
    className: 'bg-blue-500/10 text-blue-400',
    borderColor: 'border-l-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-500/10 text-yellow-400',
    borderColor: 'border-l-yellow-500',
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-500/10 text-green-400',
    borderColor: 'border-l-green-500',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-500/10 text-red-400',
    borderColor: 'border-l-red-500',
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-primary/10 text-primary',
    borderColor: 'border-l-primary',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`my-6 p-4 rounded-r-lg border-l-4 ${config.borderColor} bg-card/50`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-md ${config.className}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          )}
          <div className="text-sm text-muted-foreground prose-p:my-0">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
