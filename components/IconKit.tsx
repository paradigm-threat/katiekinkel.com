import type { ComponentType, SVGProps } from 'react'
import {
  Bot,
  Brain,
  Briefcase,
  CheckCircle2,
  Code2,
  Cpu,
  FileText,
  FolderKanban,
  Heart,
  Layers,
  LayoutTemplate,
  Lightbulb,
  MessageSquare,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  SiAnthropic,
  SiClaude,
  SiCursor,
  SiGithubcopilot,
  SiGooglegemini,
  SiNextdotjs,
  SiNotion,
  SiReact,
  SiSpotify,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons'
import { clsx } from 'clsx'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string; color?: string | 'default' }>

const lucideMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  bot: Bot,
  folders: FolderKanban,
  layout: LayoutTemplate,
  target: Target,
  code: Code2,
  chart: Brain,
  users: Users,
  check: CheckCircle2,
  search: Search,
  spark: Sparkles,
  file: FileText,
  cpu: Cpu,
  message: MessageSquare,
  lightbulb: Lightbulb,
  rocket: Rocket,
  heart: Heart,
  briefcase: Briefcase,
  layers: Layers,
  chat: MessageSquare,
  grok: Bot,
  cursor: Sparkles,
  copilot: Code2,
  claude: Bot,
  gemini: Sparkles,
}

export function BrandMark({
  name,
  className,
}: {
  name:
    | 'cursor'
    | 'copilot'
    | 'claude'
    | 'gemini'
    | 'spotify'
    | 'anthropic'
    | 'vercel'
    | 'next'
    | 'react'
    | 'typescript'
    | 'notion'
  className?: string
}) {
  const map: Record<string, SvgIcon> = {
    cursor: SiCursor,
    copilot: SiGithubcopilot,
    claude: SiClaude,
    gemini: SiGooglegemini,
    spotify: SiSpotify,
    anthropic: SiAnthropic,
    vercel: SiVercel,
    next: SiNextdotjs,
    react: SiReact,
    typescript: SiTypescript,
    notion: SiNotion,
  }
  const Icon = map[name]
  return <Icon className={clsx('h-8 w-8', className)} title={name} color="default" />
}

export function IconBadge({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = lucideMap[name] ?? Sparkles
  return <Icon className={clsx('h-5 w-5', className)} aria-hidden />
}

export const toolLogos = [
  { name: 'cursor' as const, label: 'Cursor' },
  { name: 'copilot' as const, label: 'GitHub Copilot' },
  { name: 'claude' as const, label: 'Claude' },
  { name: 'gemini' as const, label: 'Gemini' },
  { name: 'notion' as const, label: 'Notion' },
]
