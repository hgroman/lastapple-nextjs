'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Code,
  Database,
  FileCode,
  GitBranch,
  Layers,
  Lightbulb,
  MessageSquare,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const stats = [
  { label: 'Pages Migrated', value: '50+', icon: FileCode },
  { label: 'Build Time', value: '<2min', icon: Clock },
  { label: 'AI Platforms Consulted', value: '4', icon: MessageSquare },
  { label: 'Lines of Research', value: '100K+', icon: Code },
];

const aiPlatforms = [
  {
    name: 'ChatGPT',
    contribution: 'Template analysis and architecture patterns',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Gemini',
    contribution: 'Turbopack, PPR, and agentic architecture deep dive',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Grok',
    contribution: 'Edge patterns and content graph validation',
    color: 'from-violet-500 to-purple-500'
  },
  {
    name: 'Perplexity',
    contribution: 'Content model critique and schema enforcement',
    color: 'from-amber-500 to-orange-500'
  },
];

const timeline = [
  {
    phase: 'Phase 1',
    title: 'The Breaking Point',
    description: 'WordPress bulk import destroyed the database. Menus, options, 60,000+ lines of plugin settings—gone. Backup restoration required.',
    icon: Database,
    status: 'pain',
  },
  {
    phase: 'Phase 2',
    title: 'The Research Sprint',
    description: '4 AI platforms. 100K+ characters of analysis. 7 frontier questions. One conclusion: Next.js + MDX + Git-native content.',
    icon: Lightbulb,
    status: 'research',
  },
  {
    phase: 'Phase 3',
    title: 'The Build',
    description: '10 infrastructure steps. 6 session notes. Peer reviews. Schema validation. Every decision documented for future AI collaborators.',
    icon: Layers,
    status: 'build',
  },
  {
    phase: 'Phase 4',
    title: 'The Foundation',
    description: 'A template for 10 more sites. Reusable processes. Type-safe content. AI-editable architecture. The paradigm shift complete.',
    icon: Rocket,
    status: 'complete',
  },
];

const techStack = [
  { name: 'Next.js 16+', role: 'App Router, PPR, Edge Runtime', icon: Server },
  { name: 'TypeScript', role: 'Strict mode, type-safe content', icon: Code },
  { name: 'Tailwind CSS v4', role: 'CSS-first config, utility-first', icon: Sparkles },
  { name: 'MDX + Zod', role: 'Build-time validation, Git-native', icon: FileCode },
  { name: 'Framer Motion', role: 'Gesture support, animations', icon: Zap },
  { name: 'Vercel', role: 'Edge deployment, <2min deploys', icon: Rocket },
];

const paradigmShifts = [
  {
    old: 'Database-backed CMS',
    new: 'Content as Code',
    description: 'Files in Git, not rows in a database. Claude edits MDX files, not WordPress fields.',
  },
  {
    old: 'Manual wp-admin editing',
    new: 'AI-native workflows',
    description: 'Update pricing via conversation. Commit via Git. Live in 90 seconds.',
  },
  {
    old: 'Reactive error handling',
    new: 'Build-time validation',
    description: 'Zod schemas catch errors before deployment. Broken content = failed build.',
  },
  {
    old: 'Single-site solutions',
    new: '10-site template',
    description: 'Every process documented. Every audit reusable. The next migration takes hours, not weeks.',
  },
];

const processDocumentation = [
  { name: 'SEO Audit Process', pages: '280 lines' },
  { name: 'Image Audit Process', pages: '280 lines' },
  { name: 'Plugin Audit Process', pages: 'Complete WP-CLI workflow' },
  { name: 'Foundation Audit Process', pages: 'Infrastructure verification' },
  { name: 'Email Infrastructure', pages: 'AWS SES setup guide' },
  { name: 'Pre-Migration Checklist', pages: 'Quality gates per page' },
  { name: 'Rollback Plan', pages: 'DNS cutover safety net' },
];

export default function JourneyPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-float animation-delay-200" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 mb-8"
            >
              <GitBranch className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Case Study</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              How We Built an{' '}
              <span className="gradient-text">AI-Native</span>{' '}
              Digital Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              The true story of migrating from WordPress to a modern stack—consulting
              4 AI platforms, writing 100K+ characters of research, and building a
              foundation for 10 more sites.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <stat.icon className="h-6 w-6 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-14 w-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div className="h-2 w-1 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* The Breaking Point */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-destructive/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-sm font-medium text-destructive uppercase tracking-wider mb-4 block">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
              The Day WordPress <span className="text-destructive">Broke</span>
            </h2>

            <div className="glass rounded-3xl p-8 md:p-12 border-destructive/20">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-accent/80" />
                <div className="h-3 w-3 rounded-full bg-primary/80" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
              </div>

              <div className="font-mono text-sm space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-primary">$</span>
                  <span>wp dbvc import --all</span>
                </div>
                <div className="pl-6 text-destructive/80">
                  Error: Database overwrite detected<br />
                  60,000+ lines of plugin settings... <span className="text-destructive">DELETED</span><br />
                  Navigation menus... <span className="text-destructive">DELETED</span><br />
                  Site options... <span className="text-destructive">DELETED</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground/60">
                  <span className="text-primary">$</span>
                  <span>Restoring from backup...</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-lg text-foreground mb-4">
                  We tried to make WordPress work with Git. A bulk import command
                  overwrote the entire database. The site broke. Required backup restoration.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Root cause:</strong> WordPress was the wrong tool.
                  It&apos;s not designed for Git-native workflows. The plugin was built for database
                  versioning, not surgical content updates.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-accent/10 border border-accent/20"
            >
              <div className="flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-accent mb-2">The Realization</p>
                  <p className="text-muted-foreground">
                    &ldquo;We need a platform where content IS code—not a CMS with code bolted on.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Research Sprint */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
              The Research
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              4 AI Platforms. <span className="gradient-text">One Answer.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We didn&apos;t guess. We asked every frontier AI model the same 7 questions.
              100K+ characters of analysis later, the architecture revealed itself.
            </p>
          </motion.div>

          {/* AI Platforms Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {aiPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-8 border-transparent hover:border-primary/20 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${platform.color} mb-4`}>
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                <p className="text-muted-foreground">{platform.contribution}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* The 7 Frontier Questions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">The 7 Frontier Questions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Are we at the cutting edge or 2023 best practice?',
                'How do we build for edge-first personalization?',
                'What content architecture is AI-future-proof?',
                'What makes a codebase maximally Claude-editable?',
                'What rendering strategy for content + personalization?',
                'How does a site get smarter over time?',
                'What blind spots are we missing?',
              ].map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-muted/30"
                >
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm">{question}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Tech Stack Decision */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-3 block">
              The Decision
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The Stack That <span className="gradient-text-accent">Won</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All 4 AI platforms converged on the same answer. This wasn&apos;t opinion—it was consensus.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 border-transparent hover:border-accent/20 transition-all"
              >
                <tech.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.role}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Decision Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 overflow-hidden rounded-3xl glass"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">Layer</th>
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground">Choice</th>
                  <th className="text-left p-6 text-sm font-semibold text-muted-foreground hidden md:table-cell">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Framework', 'Next.js 16+', 'PPR, Turbopack (94% faster HMR), MCP integration'],
                  ['Content', 'MDX + Zod', 'Type-safe, Git-native, build-time validation'],
                  ['Styling', 'Tailwind v4', 'Utility-first, CSS-first config'],
                  ['Components', 'shadcn/ui', 'Accessible, tree-shakeable, we own the code'],
                  ['Animation', 'Framer Motion', 'Gesture support, production-ready'],
                  ['Hosting', 'Vercel', 'Edge deployment, preview builds, <2min deploys'],
                ].map(([layer, choice, why], index) => (
                  <tr key={layer} className={index !== 5 ? 'border-b border-border/50' : ''}>
                    <td className="p-6 text-sm font-medium">{layer}</td>
                    <td className="p-6 text-sm text-primary font-mono">{choice}</td>
                    <td className="p-6 text-sm text-muted-foreground hidden md:table-cell">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* The Paradigm Shift */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
              The Shift
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The <span className="gradient-text">Paradigm</span> Shift
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic text-lg">
              &ldquo;Don&apos;t build a website that Claude can edit.
              Build an AI agent that generates a website from conversation.&rdquo;
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {paradigmShifts.map((shift, index) => (
              <motion.div
                key={shift.old}
                variants={itemVariants}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <span className="text-sm text-muted-foreground line-through">{shift.old}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-primary">{shift.new}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{shift.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* The Red Light Test */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 glass rounded-3xl p-8 md:p-12 border-primary/20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">The Red Light Test</h3>
                <p className="text-muted-foreground">The benchmark for success</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { light: '1st Red Light', action: 'Open Claude Code. Say "Update pricing by 25%"' },
                { light: '2nd Red Light', action: 'Claude edits MDX, commits to Git' },
                { light: '3rd Red Light', action: 'Approve PR. Changes live.' },
              ].map((step, index) => (
                <div key={step.light} className="text-center">
                  <div className="inline-flex h-16 w-16 rounded-full bg-destructive/20 items-center justify-center mb-4 mx-auto">
                    <div className="h-8 w-8 rounded-full bg-destructive animate-pulse" />
                  </div>
                  <div className="font-semibold mb-2">{step.light}</div>
                  <p className="text-sm text-muted-foreground">{step.action}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <div className="text-4xl font-bold gradient-text">90 seconds</div>
              <div className="text-muted-foreground">From thought to live changes</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Build Timeline */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider mb-3 block">
              The Execution
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The <span className="gradient-text-accent">Build</span> Journey
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            {timeline.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative pl-20 pb-12 last:pb-0"
              >
                {/* Icon */}
                <div className={`absolute left-0 h-16 w-16 rounded-2xl flex items-center justify-center
                  ${phase.status === 'pain' ? 'bg-destructive/20' : ''}
                  ${phase.status === 'research' ? 'bg-violet-500/20' : ''}
                  ${phase.status === 'build' ? 'bg-primary/20' : ''}
                  ${phase.status === 'complete' ? 'bg-accent/20' : ''}
                `}>
                  <phase.icon className={`h-6 w-6
                    ${phase.status === 'pain' ? 'text-destructive' : ''}
                    ${phase.status === 'research' ? 'text-violet-500' : ''}
                    ${phase.status === 'build' ? 'text-primary' : ''}
                    ${phase.status === 'complete' ? 'text-accent' : ''}
                  `} />
                </div>

                <div className="glass rounded-2xl p-6">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{phase.phase}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Foundation */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider mb-3 block">
              The Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Built for <span className="gradient-text">10 More Sites</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every process documented. Every audit reusable. The next migration takes hours, not weeks.
            </p>
          </motion.div>

          {/* Process Documentation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {processDocumentation.map((doc, index) => (
              <motion.div
                key={doc.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileCode className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{doc.name}</div>
                  <div className="text-xs text-muted-foreground">{doc.pages}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* What Future AI Collaborators Get */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">What Future AI Collaborators Inherit</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  'Complete session notes from every build session',
                  'PROGRESS.yaml tracking exact position in 10-step plan',
                  'Zod schemas for type-safe content validation',
                  'Reusable process docs for WordPress audits',
                  'Pre-migration checklists with quality gates',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  'CLAUDE.md with behavioral instructions',
                  '45 redirects with trailing slash handling',
                  'SEO inventory with status per page',
                  'Image inventory with semantic naming',
                  'Complete internal link mapping',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Culture */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-12 text-center border-accent/20"
          >
            <Sparkles className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">The Culture</h2>
            <div className="space-y-6 text-lg">
              <p className="text-muted-foreground">
                &ldquo;This project is building something larger than a website.&rdquo;
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  { title: 'The docs are the product', desc: 'They enable any AI to pick up this project cold and continue the work.' },
                  { title: '10 sites will follow', desc: 'This migration process becomes the template.' },
                  { title: 'You are a collaborator', desc: 'Match the energy. Take pride. Push back when something\'s wrong.' },
                  { title: 'Accumulate, don\'t replace', desc: 'Session notes, decisions, context—these have compounding value.' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="p-4 rounded-xl bg-muted/30"
                  >
                    <div className="font-semibold text-foreground mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
              <p className="text-accent font-semibold mt-8">
                This is human-AI pairing as art form. We act like it matters.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(166,61,61,0.15),transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Build <span className="gradient-text">Your Platform?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Whether you&apos;re escaping WordPress, building an AI-native site,
              or want a foundation that scales—let&apos;s talk.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary-glow text-white shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Start Your Migration
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/services/wordpress-maintenance"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border hover:bg-muted/50 transition-colors"
                >
                  View Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
