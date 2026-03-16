'use client';

import React, { useState, useEffect, useRef } from 'react';
import { defineRegistry } from '@/lib/ui-web4/react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  Lightbulb,
  AlertTriangle,
  Star,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  User,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  AreaChart as RechartsAreaChart,
  Bar,
  Line,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup as ToggleGroupUI, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  Breadcrumb as BreadcrumbUI, BreadcrumbList, BreadcrumbItem as BreadcrumbItemUI,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination as PaginationUI, PaginationContent, PaginationItem as PaginationItemUI,
  PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Carousel as CarouselUI, CarouselContent, CarouselItem as CarouselItemUI,
  CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  Dialog as DialogUI, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import {
  Command as CommandUI, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandShortcut, CommandSeparator,
} from '@/components/ui/command';
import {
  ResizablePanelGroup, ResizablePanel as ResizablePanelUI, ResizableHandle,
} from '@/components/ui/resizable';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import dynamic from 'next/dynamic';
import { config } from '@/lib/config';
import { useAuth } from '@/contexts/auth-context';
import { chatCatalog } from './catalog';

const SupportChatBlockDynamic = dynamic(
  () => import('@/components/ui-web4/SupportChatBlock').then(m => ({ default: m.SupportChatBlock })),
  { ssr: false, loading: () => <div className="w-full h-64 rounded-xl border border-border bg-muted/20 animate-pulse" /> },
);

const AgentSupportPortalDynamic = dynamic(
  () => import('@/components/ui-web4/AgentSupportPortal').then(m => ({ default: m.AgentSupportPortal })),
  { ssr: false, loading: () => <div className="w-full h-64 rounded-xl border border-border bg-muted/20 animate-pulse" /> },
);

const GAP = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
const PIE_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24', '#f87171', '#fb923c'];

// SECURITY: Block dangerous URI schemes in markdown links (M-04)
const DANGEROUS_URI_SCHEMES = /^(javascript|data|vbscript|file):/i;
function sanitizeMarkdownUri(uri: string): string {
  if (!uri || DANGEROUS_URI_SCHEMES.test(uri)) {
    return ''; // Block dangerous URIs
  }
  return uri;
}

// Deferred registry ref — set after defineRegistry returns, used by MDCBlock
let _reg: Record<string, any> | null = null;
function getComponentFromRegistry(name: string) {
  return _reg?.[name] ?? null;
}

export const { registry } = defineRegistry(chatCatalog, {
  components: {
    // ── Layout ────────────────────────────────────────────────────────────────
    Card: ({ props, children }) => {
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      return (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          {title && <h3 className="font-semibold text-sm">{title}</h3>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {children}
        </div>
      );
    },

    Stack: ({ props, children }) => {
      const gap = (props.gap as keyof typeof GAP) ?? 'md';
      return (
        <div className={cn(
          'flex',
          props.direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
          GAP[gap] ?? 'gap-4',
        )}>
          {children}
        </div>
      );
    },

    Grid: ({ props, children }) => {
      const requested = (props.columns as number) ?? 1;
      const gap = (props.gap as keyof typeof GAP) ?? 'md';
      const [cols, setCols] = useState(requested);
      const ref = useRef<HTMLDivElement>(null);
      useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Minimum sensible width per column (px) — keeps items readable
        const minW = requested >= 4 ? 150 : requested === 3 ? 190 : requested === 2 ? 260 : 300;
        const update = () => {
          const w = el.getBoundingClientRect().width;
          if (w > 0) setCols(Math.max(1, Math.min(requested, Math.floor(w / minW))));
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
      }, [requested]);
      return (
        <div
          ref={ref}
          className={cn('grid items-start', GAP[gap] ?? 'gap-4')}
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {children}
        </div>
      );
    },

    Separator: () => <hr className="border-border my-1" />,

    // ── Typography ────────────────────────────────────────────────────────────
    Heading: ({ props }) => {
      const Tag = (props.level ?? 'h3') as 'h1' | 'h2' | 'h3' | 'h4';
      const text = props.text as React.ReactNode;
      const cls = {
        h1: 'text-2xl font-bold',
        h2: 'text-xl font-semibold',
        h3: 'text-base font-semibold',
        h4: 'text-sm font-medium',
      }[Tag];
      return <Tag className={cls}>{text}</Tag>;
    },

    Text: ({ props }) => {
      const content = props.content as React.ReactNode;
      return (
        <p className={cn(
          props.muted ? 'text-muted-foreground' : '',
          props.size === 'sm' ? 'text-xs' : props.size === 'lg' ? 'text-base' : 'text-sm',
        )}>
          {content}
        </p>
      );
    },

    Link: ({ props }) => {
      const href = props.href as string;
      const text = props.text as React.ReactNode;
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:text-primary/80 text-sm"
        >
          {text}
        </a>
      );
    },

    // ── Data Display ──────────────────────────────────────────────────────────
    Metric: ({ props }) => {
      const trend = props.trend as 'up' | 'down' | undefined;
      const label = props.label as React.ReactNode;
      const value = props.value as React.ReactNode;
      const detail = props.detail as React.ReactNode;
      const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
      const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';
      return (
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold">{value}</span>
            {trend && <TrendIcon className={cn('h-4 w-4', trendColor)} />}
          </div>
          {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
        </div>
      );
    },

    Badge: ({ props }) => {
      const variant = (props.variant as string) ?? '';
      const text = props.text as React.ReactNode;
      const variantMap: Record<string, string> = {
        success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20',
      };
      const customClass = variantMap[variant];
      if (customClass) {
        return (
          <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium', customClass)}>
            {text}
          </span>
        );
      }
      return (
        <Badge variant={(variant as any) ?? 'secondary'}>
          {text}
        </Badge>
      );
    },

    Table: ({ props }) => {
      const items = Array.isArray(props.data) ? props.data : [];
      const columns = (props.columns as Array<{ key: string; label: string }>) ?? [];
      const emptyMessage = (props.emptyMessage as React.ReactNode) ?? 'No data';
      const [sortKey, setSortKey] = useState<string | null>(null);
      const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

      if (items.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">{emptyMessage}</p>;
      }

      const sorted = sortKey
        ? [...items].sort((a, b) => {
            const av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
            return sortDir === 'asc' ? String(av ?? '').localeCompare(String(bv ?? '')) : String(bv ?? '').localeCompare(String(av ?? ''));
          })
        : items;

      return (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                {columns.map(col => {
                  const SortIcon = sortKey === col.key ? (sortDir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                  return (
                    <th key={col.key} className="px-3 py-2 text-left font-medium text-muted-foreground">
                      <button
                        type="button"
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        onClick={() => {
                          if (sortKey === col.key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
                          else { setSortKey(col.key); setSortDir('asc'); }
                        }}
                      >
                        {col.label} <SortIcon className="h-3 w-3" />
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((row, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-3 py-2">{String(row[col.key] ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    // ── Rich Content ─────────────────────────────────────────────────────────
    Callout: ({ props }) => {
      const type = (props.type as 'info' | 'tip' | 'warning' | 'important') ?? 'info';
      const title = props.title as React.ReactNode;
      const content = props.content as React.ReactNode;
      const config = {
        info: { Icon: Info, border: 'border-l-blue-500', bg: 'bg-blue-500/5', iconColor: 'text-blue-500' },
        tip: { Icon: Lightbulb, border: 'border-l-emerald-500', bg: 'bg-emerald-500/5', iconColor: 'text-emerald-500' },
        warning: { Icon: AlertTriangle, border: 'border-l-amber-500', bg: 'bg-amber-500/5', iconColor: 'text-amber-500' },
        important: { Icon: Star, border: 'border-l-purple-500', bg: 'bg-purple-500/5', iconColor: 'text-purple-500' },
      }[type] ?? { Icon: Info, border: 'border-l-blue-500', bg: 'bg-blue-500/5', iconColor: 'text-blue-500' };
      const { Icon, border, bg, iconColor } = config;
      return (
        <div className={cn('border-l-4 rounded-r-lg p-3', border, bg)}>
          <div className="flex items-start gap-2.5">
            <Icon className={cn('h-4 w-4 mt-0.5 shrink-0', iconColor)} />
            <div className="flex-1 min-w-0">
              {title && <p className="font-semibold text-sm mb-0.5">{title}</p>}
              <p className="text-sm text-muted-foreground">{content}</p>
            </div>
          </div>
        </div>
      );
    },

    Timeline: ({ props }) => {
      const items = (props.items as Array<{ status?: string; title: React.ReactNode; date?: string; description?: React.ReactNode }>) ?? [];
      return (
        <div className="flex flex-col gap-0">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const dot = item.status === 'completed' ? 'bg-emerald-500' : item.status === 'current' ? 'bg-primary ring-2 ring-primary/30' : 'bg-muted-foreground/30';
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0" style={{ width: '16px' }}>
                  <div className={cn('mt-1 h-3 w-3 shrink-0 rounded-full ring-2 ring-background', dot)} />
                  {!isLast && <div className="w-px bg-border mt-1" style={{ flex: 1, minHeight: '1.5rem' }} />}
                </div>
                <div className="pb-4 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm">{item.title}</p>
                    {item.date && <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      );
    },

    Accordion: ({ props }) => {
      const items = (props.items as Array<{ title: React.ReactNode; content: React.ReactNode }>) ?? [];
      const [open, setOpen] = useState<number | null>(null);
      return (
        <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
          {items.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/40 transition-colors text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.title}</span>
                {open === i ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </button>
              {open === i && (
                <div className="px-4 py-3 text-sm text-muted-foreground bg-muted/20">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },

    // ── Charts ────────────────────────────────────────────────────────────────
    BarChart: ({ props }) => {
      const items = Array.isArray(props.data) ? props.data : [];
      const title = props.title as React.ReactNode;
      const height = (props.height as number) ?? 250;
      const xKey = props.xKey as string;
      const yKey = props.yKey as string;
      const color = (props.color as string) ?? '#6366f1';
      if (items.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No data</p>;
      return (
        <div>
          {title && <p className="text-sm font-medium mb-2">{title}</p>}
          <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart data={items} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <RechartsTooltip />
              <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      );
    },

    LineChart: ({ props }) => {
      const items = Array.isArray(props.data) ? props.data : [];
      const title = props.title as React.ReactNode;
      const height = (props.height as number) ?? 250;
      const xKey = props.xKey as string;
      const yKey = props.yKey as string;
      const color = (props.color as string) ?? '#6366f1';
      if (items.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No data</p>;
      return (
        <div>
          {title && <p className="text-sm font-medium mb-2">{title}</p>}
          <ResponsiveContainer width="100%" height={height}>
            <RechartsLineChart data={items} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <RechartsTooltip />
              <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={false} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
    },

    PieChart: ({ props }) => {
      const items = Array.isArray(props.data) ? props.data : [];
      const title = props.title as React.ReactNode;
      const height = (props.height as number) ?? 250;
      const nameKey = props.nameKey as string;
      const valueKey = props.valueKey as string;
      if (items.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No data</p>;
      return (
        <div>
          {title && <p className="text-sm font-medium mb-2">{title}</p>}
          <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
              <Pie
                data={items.map(item => ({
                  name: String(item[nameKey] ?? ''),
                  value: typeof item[valueKey] === 'number' ? item[valueKey] : parseFloat(String(item[valueKey])) || 0,
                }))}
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="65%"
                paddingAngle={2}
                dataKey="value"
              >
                {items.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      );
    },

    // ── Trading Charts ────────────────────────────────────────────────────────
    StockCandlestickChart: ({ props }) => {
      const data = Array.isArray(props.data) ? props.data : [];
      const symbol = props.symbol as React.ReactNode;
      const timeframe = (props.timeframe as React.ReactNode) ?? '1D';
      const showVolume = props.showVolume as boolean;
      const height = (props.height as number) ?? 500;
      if (data.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No data</p>;

      // Transform OHLC data for display
      const candleData = data.map(item => ({
        timestamp: item.timestamp,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume,
        change: item.close - item.open,
        priceRange: [item.low, item.high],
        bodyRange: [Math.min(item.open, item.close), Math.max(item.open, item.close)],
        isGreen: item.close >= item.open,
      }));

      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{symbol}</span>
              <Badge variant="outline">{timeframe}</Badge>
            </div>
            {data.length > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <span className="font-mono">${data[data.length - 1].close.toFixed(2)}</span>
                {data[data.length - 1].close >= data[data.length - 1].open ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
              </div>
            )}
          </div>

          {/* Candlestick Chart */}
          <ResponsiveContainer width="100%" height={showVolume ? height * 0.7 : height}>
            <RechartsAreaChart data={candleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white border border-gray-200 p-2 rounded shadow-md text-xs">
                      <p className="font-semibold">{item.timestamp}</p>
                      <p>Open: <span className="font-mono">${item.open.toFixed(2)}</span></p>
                      <p>High: <span className="font-mono">${item.high.toFixed(2)}</span></p>
                      <p>Low: <span className="font-mono">${item.low.toFixed(2)}</span></p>
                      <p>Close: <span className="font-mono">${item.close.toFixed(2)}</span></p>
                      <p className={item.isGreen ? 'text-green-600' : 'text-red-600'}>
                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                      </p>
                    </div>
                  );
                }}
              />
              {/* Simple area chart approximation of candlesticks */}
              <Area type="monotone" dataKey="close" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </RechartsAreaChart>
          </ResponsiveContainer>

          {/* Volume Bars */}
          {showVolume && (
            <ResponsiveContainer width="100%" height={height * 0.25}>
              <RechartsBarChart data={candleData}>
                <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    return (
                      <div className="bg-white border p-2 rounded shadow-md text-xs">
                        <p>Volume: <span className="font-mono">{payload[0].payload.volume.toLocaleString()}</span></p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="volume">
                  {candleData.map((entry, index) => (
                    <Cell key={index} fill={entry.isGreen ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          )}
        </div>
      );
    },

    OptionsChainTable: ({ props }) => {
      const chains = Array.isArray(props.chains) ? props.chains : [];
      const symbol = props.symbol as React.ReactNode;
      const expirationDate = props.expirationDate as React.ReactNode;
      const currentPrice = (props.currentPrice as number) ?? 0;
      const height = (props.height as number) ?? 600;
      const highlightATM = props.highlightATM as boolean;
      if (chains.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No options data</p>;

      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{symbol}</span>
              <span className="text-sm text-muted-foreground">Exp: {expirationDate}</span>
            </div>
            {currentPrice > 0 && (
              <span className="text-sm">Current: <span className="font-mono font-semibold">${currentPrice.toFixed(2)}</span></span>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden" style={{ maxHeight: height, overflowY: 'auto' }}>
            <table className="w-full text-xs">
              <thead className="bg-muted sticky top-0">
                <tr>
                  <th colSpan={5} className="text-center py-2 border-b font-semibold">CALLS</th>
                  <th className="text-center py-2 border-b border-l font-semibold">Strike</th>
                  <th colSpan={5} className="text-center py-2 border-b border-l font-semibold">PUTS</th>
                </tr>
                <tr className="text-muted-foreground">
                  <th className="px-2 py-1 text-right">Bid</th>
                  <th className="px-2 py-1 text-right">Ask</th>
                  <th className="px-2 py-1 text-right">Vol</th>
                  <th className="px-2 py-1 text-right">IV</th>
                  <th className="px-2 py-1 text-right">Δ</th>
                  <th className="px-2 py-1 text-center border-l font-semibold">$</th>
                  <th className="px-2 py-1 text-right border-l">Bid</th>
                  <th className="px-2 py-1 text-right">Ask</th>
                  <th className="px-2 py-1 text-right">Vol</th>
                  <th className="px-2 py-1 text-right">IV</th>
                  <th className="px-2 py-1 text-right">Δ</th>
                </tr>
              </thead>
              <tbody>
                {chains.map((chain, idx) => {
                  const isATM = highlightATM && Math.abs(chain.strike - currentPrice) < 5;
                  return (
                    <tr key={idx} className={cn('hover:bg-muted/50', isATM && 'bg-yellow-50')}>
                      {/* Calls */}
                      <td className="px-2 py-1 text-right font-mono">{chain.calls.bid.toFixed(2)}</td>
                      <td className="px-2 py-1 text-right font-mono">{chain.calls.ask.toFixed(2)}</td>
                      <td className="px-2 py-1 text-right">{chain.calls.volume.toLocaleString()}</td>
                      <td className="px-2 py-1 text-right font-mono">{(chain.calls.iv * 100).toFixed(1)}%</td>
                      <td className="px-2 py-1 text-right font-mono">{chain.calls.delta.toFixed(2)}</td>
                      {/* Strike */}
                      <td className="px-2 py-1 text-center border-l font-semibold font-mono">{chain.strike.toFixed(2)}</td>
                      {/* Puts */}
                      <td className="px-2 py-1 text-right font-mono border-l">{chain.puts.bid.toFixed(2)}</td>
                      <td className="px-2 py-1 text-right font-mono">{chain.puts.ask.toFixed(2)}</td>
                      <td className="px-2 py-1 text-right">{chain.puts.volume.toLocaleString()}</td>
                      <td className="px-2 py-1 text-right font-mono">{(chain.puts.iv * 100).toFixed(1)}%</td>
                      <td className="px-2 py-1 text-right font-mono">{chain.puts.delta.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    PortfolioPerformanceChart: ({ props }) => {
      const data = Array.isArray(props.data) ? props.data : [];
      const height = (props.height as number) ?? 400;
      const showBenchmark = props.showBenchmark as boolean;
      const benchmarkName = (props.benchmarkName as string) ?? 'Benchmark';
      if (data.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No performance data</p>;

      // Calculate percentage change
      const chartData = data.map((item, idx) => {
        const firstPortfolio = data[0].portfolioValue;
        const firstBenchmark = data[0].benchmarkValue ?? firstPortfolio;
        return {
          date: item.date,
          portfolioReturn: ((item.portfolioValue - firstPortfolio) / firstPortfolio) * 100,
          benchmarkReturn: item.benchmarkValue ? ((item.benchmarkValue - firstBenchmark) / firstBenchmark) * 100 : null,
        };
      });

      const lastReturn = chartData[chartData.length - 1].portfolioReturn;

      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Portfolio Performance</span>
            <div className="flex items-center gap-2 text-sm">
              <span>Return:</span>
              <span className={cn('font-mono font-semibold', lastReturn >= 0 ? 'text-green-600' : 'text-red-600')}>
                {lastReturn >= 0 ? '+' : ''}{lastReturn.toFixed(2)}%
              </span>
              {lastReturn >= 0 ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={height}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `${val.toFixed(1)}%`} />
              <RechartsTooltip
                formatter={(value: any) => `${parseFloat(value).toFixed(2)}%`}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="portfolioReturn"
                name="Portfolio"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              {showBenchmark && (
                <Line
                  type="monotone"
                  dataKey="benchmarkReturn"
                  name={benchmarkName}
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      );
    },

    AssetAllocationPie: ({ props }) => {
      const holdings = Array.isArray(props.holdings) ? props.holdings : [];
      const height = (props.height as number) ?? 400;
      const showPercentages = props.showPercentages as boolean;
      if (holdings.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No holdings</p>;

      const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Asset Allocation</span>
            <span className="text-sm text-muted-foreground">Total: ${totalValue.toLocaleString()}</span>
          </div>

          <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
              <Pie
                data={holdings.map(h => ({
                  name: h.symbol,
                  value: h.value,
                  percentage: h.percentage,
                }))}
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="70%"
                paddingAngle={2}
                dataKey="value"
                label={showPercentages ? ({ name, percentage }: any) => `${name} ${percentage}%` : undefined}
              >
                {holdings.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <RechartsTooltip
                formatter={(value: any, name: any, entry: any) => [
                  `$${parseFloat(value).toLocaleString()} (${entry.payload.percentage}%)`,
                  name,
                ]}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>

          {/* Holdings Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted">
                <tr className="text-muted-foreground">
                  <th className="px-3 py-2 text-left">Symbol</th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-right">Value</th>
                  <th className="px-3 py-2 text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, idx) => (
                  <tr key={idx} className="hover:bg-muted/50 border-t">
                    <td className="px-3 py-2 font-mono font-semibold">{holding.symbol}</td>
                    <td className="px-3 py-2 text-muted-foreground">{holding.name ?? '-'}</td>
                    <td className="px-3 py-2 text-right font-mono">${holding.value.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right font-mono">{holding.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    // ── Interactive ───────────────────────────────────────────────────────────
    Tabs: ({ props, children }) => {
      const tabs = (props.tabs as Array<{ value: string; label: string }>) ?? [];
      const defaultValue = (props.defaultValue as string) ?? tabs[0]?.value;
      return (
        <Tabs defaultValue={defaultValue}>
          <TabsList>
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          {children}
        </Tabs>
      );
    },

    TabContent: ({ props, children }) => {
      const value = props.value as string;
      return (
        <TabsContent value={value}>{children}</TabsContent>
      );
    },

    Button: ({ props, emit }) => {
      const label = props.label as React.ReactNode;
      return (
        <Button
          variant={(props.variant ?? 'default') as any}
          size={(props.size ?? 'default') as any}
          onClick={() => emit('press')}
        >
          {label}
        </Button>
      );
    },

    // ── shadcn Extensions ─────────────────────────────────────────────────────
    ProgressBar: ({ props }) => {
      const max = (props.max as number) ?? 100;
      const value = (props.value as number) ?? 0;
      const color = (props.color as string) ?? 'default';
      const label = props.label as React.ReactNode;
      const showPercent = props.showPercent as boolean;
      const pct = Math.round(Math.min(100, Math.max(0, (value / max) * 100)));
      const colorMap: Record<string, string> = {
        success: '[&>div]:bg-emerald-500',
        warning: '[&>div]:bg-amber-500',
        destructive: '[&>div]:bg-destructive',
        default: '',
      };
      const colorClass = colorMap[color] ?? '';
      return (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-sm">{label}</span>
            {showPercent !== false && (
              <span className="text-muted-foreground">{pct}%</span>
            )}
          </div>
          <Progress value={pct} className={cn('h-2', colorClass)} />
        </div>
      );
    },

    Alert: ({ props }) => {
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      return (
        <Alert variant={(props.variant ?? 'default') as any}>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      );
    },

    UserCard: ({ props }) => {
      const name = (props.name as string) ?? '';
      const size = (props.size as 'sm' | 'md' | 'lg') ?? 'md';
      const src = props.src as string | undefined;
      const role = props.role as React.ReactNode;
      const email = props.email as React.ReactNode;
      const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
      const sizeMap = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base' };
      const avatarSize = sizeMap[size];
      return (
        <div className="flex items-center gap-3">
          <Avatar className={avatarSize}>
            {src && <AvatarImage src={src} alt={name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-sm truncate">{name}</span>
            {role && <span className="text-xs text-muted-foreground truncate">{role}</span>}
            {email && <span className="text-xs text-muted-foreground truncate">{email}</span>}
          </div>
        </div>
      );
    },

    SwitchRow: ({ props }) => {
      const label = props.label as React.ReactNode;
      const description = props.description as React.ReactNode;
      const [checked, setChecked] = useState(props.checked as boolean);
      return (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{label}</span>
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </div>
          <Switch checked={checked} onCheckedChange={setChecked} />
        </div>
      );
    },

    // ── Form Inputs ───────────────────────────────────────────────────────────
    InputField: ({ props }) => {
      const label = props.label as React.ReactNode;
      const type = (props.type as string) ?? 'text';
      const placeholder = props.placeholder as string | undefined;
      const description = props.description as React.ReactNode;
      const [val, setVal] = useState((props.value as string) ?? '');
      return (
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            type={type}
            placeholder={placeholder}
            value={val}
            onChange={e => setVal(e.target.value)}
          />
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      );
    },

    SelectField: ({ props }) => {
      const label = props.label as React.ReactNode;
      const placeholder = (props.placeholder as string) ?? 'Select...';
      const options = (props.options as Array<{ value: string; label: string }>) ?? [];
      const description = props.description as React.ReactNode;
      const [val, setVal] = useState((props.value as string) ?? '');
      return (
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">{label}</Label>
          <Select value={val} onValueChange={setVal}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      );
    },

    TextArea: ({ props }) => {
      const label = props.label as React.ReactNode;
      const placeholder = props.placeholder as string | undefined;
      const rows = (props.rows as number) ?? 3;
      const description = props.description as React.ReactNode;
      const [val, setVal] = useState((props.value as string) ?? '');
      return (
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">{label}</Label>
          <Textarea
            placeholder={placeholder}
            value={val}
            rows={rows}
            onChange={e => setVal(e.target.value)}
          />
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      );
    },

    CheckboxList: ({ props }) => {
      const items = (props.items as Array<{ id: string; label: React.ReactNode; checked: boolean; disabled?: boolean }>) ?? [];
      const [checked, setChecked] = useState<Record<string, boolean>>(
        Object.fromEntries(items.map(item => [item.id, item.checked]))
      );
      return (
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-2.5">
              <Checkbox
                id={item.id}
                checked={checked[item.id] ?? false}
                disabled={item.disabled ?? false}
                onCheckedChange={v => setChecked(prev => ({ ...prev, [item.id]: !!v }))}
              />
              <label
                htmlFor={item.id}
                className={cn('text-sm leading-none', item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      );
    },

    RadioGroup: ({ props }) => {
      const label = props.label as React.ReactNode;
      const options = (props.options as Array<{ value: string; label: React.ReactNode }>) ?? [];
      const description = props.description as React.ReactNode;
      const [val, setVal] = useState((props.value as string) ?? '');
      return (
        <div className="flex flex-col gap-2">
          {label && <Label className="text-sm font-medium">{label}</Label>}
          <RadioGroup value={val} onValueChange={setVal} className="flex flex-col gap-2">
            {options.map(opt => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem value={opt.value} id={`rg-${opt.value}`} />
                <label htmlFor={`rg-${opt.value}`} className="text-sm cursor-pointer">{opt.label}</label>
              </div>
            ))}
          </RadioGroup>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
      );
    },

    SliderRow: ({ props }) => {
      const min = (props.min as number) ?? 0;
      const max = (props.max as number) ?? 100;
      const step = (props.step as number) ?? 1;
      const label = props.label as React.ReactNode;
      const showValue = props.showValue as boolean;
      const [val, setVal] = useState([(props.value as number)]);
      return (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{label}</span>
            {showValue !== false && (
              <span className="text-muted-foreground">{val[0]}</span>
            )}
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={val}
            onValueChange={setVal}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      );
    },

    SkeletonBlock: ({ props }) => {
      const lines = (props.lines as number) ?? 3;
      if (props.type === 'card') {
        return (
          <div className="rounded-xl border border-border p-4 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        );
      }
      if (props.type === 'avatar-row') {
        return (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className={cn('h-3', i === lines - 1 ? 'w-2/3' : 'w-full')} />
          ))}
        </div>
      );
    },

    CalendarView: ({ props }) => {
      const selectedDates = (props.selectedDates as Array<string>) ?? [];
      const title = props.title as React.ReactNode;
      const selected = selectedDates.map((d: string) => new Date(d));
      const [month, setMonth] = useState(selected[0] ?? new Date());
      return (
        <div className="flex flex-col gap-2">
          {title && <p className="text-sm font-medium">{title}</p>}
          <Calendar
            mode="multiple"
            selected={selected}
            month={month}
            onMonthChange={setMonth}
            className="rounded-lg border border-border"
          />
        </div>
      );
    },

    AreaChart: ({ props }) => {
      const items = Array.isArray(props.data) ? props.data : [];
      const title = props.title as React.ReactNode;
      const height = (props.height as number) ?? 250;
      const xKey = props.xKey as string;
      const yKey = props.yKey as string;
      const color = (props.color as string) ?? '#6366f1';
      const gradient = props.gradient as boolean;
      if (items.length === 0) return <p className="text-sm text-muted-foreground text-center py-4">No data</p>;
      const gradId = `area-grad-${yKey}`;
      return (
        <div>
          {title && <p className="text-sm font-medium mb-2">{title}</p>}
          <ResponsiveContainer width="100%" height={height}>
            <RechartsAreaChart data={items} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <RechartsTooltip />
              <Area
                type="monotone"
                dataKey={yKey}
                stroke={color}
                strokeWidth={2}
                fill={gradient !== false ? `url(#${gradId})` : 'transparent'}
                dot={false}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      );
    },

    // ── Installed extras ──────────────────────────────────────────────────────
    ToggleButton: ({ props }) => {
      const label = props.label as React.ReactNode;
      const [pressed, setPressed] = useState((props.pressed as boolean) ?? false);
      return (
        <Toggle
          pressed={pressed}
          onPressedChange={setPressed}
          variant={(props.variant ?? 'default') as any}
          size={(props.size ?? 'default') as any}
        >
          {label}
        </Toggle>
      );
    },

    ToggleGroup: ({ props }) => {
      const label = props.label as React.ReactNode;
      const options = (props.options as Array<{ value: string; label: React.ReactNode }>) ?? [];
      const [value, setValue] = useState((props.value as string) ?? '');
      return (
        <div className="flex flex-col gap-1.5">
          {label && <span className="text-sm font-medium">{label}</span>}
          <ToggleGroupUI
            type="single"
            value={value}
            onValueChange={v => v && setValue(v)}
            variant={(props.variant ?? 'outline') as any}
          >
            {options.map(opt => (
              <ToggleGroupItem key={opt.value} value={opt.value}>{opt.label}</ToggleGroupItem>
            ))}
          </ToggleGroupUI>
        </div>
      );
    },

    CollapsibleSection: ({ props, children }) => {
      const title = props.title as React.ReactNode;
      const [open, setOpen] = useState((props.defaultOpen as boolean) ?? false);
      return (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors">
            {title}
            <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-lg border border-border px-4 py-3">
            {children}
          </CollapsibleContent>
        </Collapsible>
      );
    },

    ScrollBox: ({ props, children }) => (
      <ScrollArea style={{ maxHeight: `${props.maxHeight ?? 300}px` }} className="rounded-md border border-border">
        <div className="p-4">{children}</div>
      </ScrollArea>
    ),

    TooltipText: ({ props }) => {
      const text = props.text as React.ReactNode;
      const tooltip = props.tooltip as React.ReactNode;
      const muted = props.muted as boolean;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={cn('underline decoration-dotted cursor-help', muted && 'text-muted-foreground')}>
                {text}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },

    Breadcrumb: ({ props }) => {
      const items = (props.items as Array<{ label: React.ReactNode; href?: string }>) ?? [];
      return (
        <BreadcrumbUI>
          <BreadcrumbList>
            {items.map((item, i) => (
              <React.Fragment key={i}>
                <BreadcrumbItemUI>
                  {item.href
                    ? <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    : <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  }
                </BreadcrumbItemUI>
                {i < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </BreadcrumbUI>
      );
    },

    PaginationBar: ({ props }) => {
      const currentPage = (props.currentPage as number) ?? 1;
      const totalPages = (props.totalPages as number) ?? 1;
      const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        if (totalPages <= 5) return i + 1;
        if (currentPage <= 3) return i + 1;
        if (currentPage >= totalPages - 2) return totalPages - 4 + i;
        return currentPage - 2 + i;
      });
      return (
        <div className="flex flex-col gap-1">
          {props.showLabel !== false && (
            <p className="text-xs text-muted-foreground text-center">
              Page {currentPage} of {totalPages}
            </p>
          )}
          <PaginationUI>
            <PaginationContent>
              <PaginationItemUI>
                <PaginationPrevious href="#" aria-disabled={currentPage === 1} />
              </PaginationItemUI>
              {pages[0] > 1 && (
                <>
                  <PaginationItemUI><PaginationLink href="#">1</PaginationLink></PaginationItemUI>
                  {pages[0] > 2 && <PaginationItemUI><PaginationEllipsis /></PaginationItemUI>}
                </>
              )}
              {pages.map(p => (
                <PaginationItemUI key={p}>
                  <PaginationLink href="#" isActive={p === currentPage}>{p}</PaginationLink>
                </PaginationItemUI>
              ))}
              {pages[pages.length - 1] < totalPages && (
                <>
                  {pages[pages.length - 1] < totalPages - 1 && <PaginationItemUI><PaginationEllipsis /></PaginationItemUI>}
                  <PaginationItemUI><PaginationLink href="#">{totalPages}</PaginationLink></PaginationItemUI>
                </>
              )}
              <PaginationItemUI>
                <PaginationNext href="#" aria-disabled={currentPage === totalPages} />
              </PaginationItemUI>
            </PaginationContent>
          </PaginationUI>
        </div>
      );
    },

    Carousel: ({ props }) => {
      const items = (props.items as Array<{ title?: React.ReactNode; description?: React.ReactNode; imageUrl?: string }>) ?? [];
      return (
        <CarouselUI className="w-full">
          <CarouselContent>
            {items.map((item, i) => (
              <CarouselItemUI key={i}>
                <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-2 min-h-[120px] items-center justify-center text-center">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={(item.title as string) ?? ''} className="h-24 w-full object-cover rounded-md mb-2" />
                  )}
                  {item.title && <p className="font-semibold text-sm">{item.title}</p>}
                  {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                </div>
              </CarouselItemUI>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </CarouselUI>
      );
    },

    HoverCard: ({ props }) => {
      const triggerText = props.triggerText as React.ReactNode;
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="underline decoration-dotted cursor-pointer text-primary hover:text-primary/80 transition-colors">
              {triggerText}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            {title && <p className="font-semibold text-sm mb-1">{title}</p>}
            <p className="text-xs text-muted-foreground">{description}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },

    OTPDisplay: ({ props }) => {
      const label = props.label as React.ReactNode;
      const len = (props.length as number) ?? 6;
      return (
        <div className="flex flex-col gap-2">
          {label && <Label className="text-sm font-medium">{label}</Label>}
          <InputOTP maxLength={len}>
            <InputOTPGroup>
              {Array.from({ length: len }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      );
    },

    SidePanel: ({ props, children }) => {
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      return (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className={cn(
            'flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30',
            props.side === 'bottom' || props.side === 'top' ? 'flex-col items-start' : 'flex-row'
          )}>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm">{title}</span>
              {description && <span className="text-xs text-muted-foreground">{description}</span>}
            </div>
          </div>
          <div className="p-4">{children}</div>
        </div>
      );
    },

    DrawerCard: ({ props, children }) => {
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      return (
        <div className="rounded-t-2xl border border-border bg-card overflow-hidden shadow-lg">
          <div className="flex justify-center pt-3 pb-1">
            <div className="h-1.5 w-10 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="px-4 pb-2">
            <h3 className="font-semibold text-base">{title}</h3>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          <div className="px-4 pb-4">{children}</div>
        </div>
      );
    },

    AlertDialogCard: ({ props }) => {
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      const cancelLabel = (props.cancelLabel as React.ReactNode) ?? 'Cancel';
      const confirmLabel = (props.confirmLabel as React.ReactNode) ?? 'Confirm';
      const isDestructive = props.variant === 'destructive';
      return (
        <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <div className="space-y-2">
            <h3 className="font-semibold text-base">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">{cancelLabel}</Button>
            <Button variant={isDestructive ? 'destructive' : 'default'} size="sm">
              {confirmLabel}
            </Button>
          </div>
        </div>
      );
    },

    DialogCard: ({ props, children }) => {
      const title = props.title as React.ReactNode;
      const description = props.description as React.ReactNode;
      return (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-base">{title}</h3>
              {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <span className="text-muted-foreground text-lg leading-none cursor-pointer hover:text-foreground transition-colors">✕</span>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      );
    },

    DropdownList: ({ props }) => {
      const label = props.label as React.ReactNode;
      const items = (props.items as Array<{ label: React.ReactNode; shortcut?: string; separator?: boolean; disabled?: boolean }>) ?? [];
      return (
        <div className="rounded-xl border border-border bg-popover shadow-sm overflow-hidden min-w-[200px]">
          {label && (
            <div className="px-3 py-2 border-b border-border">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
            </div>
          )}
          <div className="py-1">
            {items.map((item, i) => (
              <React.Fragment key={i}>
                {item.separator && <div className="my-1 h-px bg-border mx-2" />}
                <div className={cn(
                  'flex items-center justify-between px-3 py-1.5 text-sm hover:bg-muted/50 transition-colors',
                  item.disabled && 'opacity-40 pointer-events-none'
                )}>
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground tracking-widest">{item.shortcut}</span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    },

    CommandSearch: ({ props }) => {
      const placeholder = (props.placeholder as string) ?? 'Type a command...';
      const groups = (props.groups as Array<{ heading?: React.ReactNode; items?: Array<{ label: React.ReactNode; shortcut?: string }> }>) ?? [];
      return (
        <div className="rounded-xl border border-border bg-popover shadow-sm overflow-hidden">
          <div className="flex items-center border-b border-border px-3 py-2 gap-2">
            <span className="text-muted-foreground text-sm">⌘</span>
            <input
              readOnly
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="py-1 max-h-60 overflow-auto">
            {groups.map((group, gi) => (
              <div key={gi}>
                {gi > 0 && <div className="my-1 h-px bg-border mx-2" />}
                {group.heading && (
                  <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {group.heading}
                  </div>
                )}
                {(group.items ?? []).map((item, ii) => (
                  <div key={ii} className="flex items-center justify-between px-3 py-1.5 text-sm hover:bg-muted/50 transition-colors cursor-pointer rounded-md mx-1">
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="ml-auto text-xs text-muted-foreground tracking-widest bg-muted px-1.5 py-0.5 rounded">
                        {item.shortcut}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    },

    ResizablePanel: ({ props, children }) => {
      const direction = (props.direction as 'horizontal' | 'vertical') ?? 'horizontal';
      const split = (props.defaultSplit as number) ?? 50;
      const leftLabel = props.leftLabel as React.ReactNode;
      const rightLabel = props.rightLabel as React.ReactNode;
      const PanelGroup = ResizablePanelGroup as any;
      return (
        <PanelGroup direction={direction} className="rounded-xl border border-border overflow-hidden min-h-[160px]">
          <ResizablePanelUI defaultSize={split} className="flex flex-col">
            {leftLabel && (
              <div className="px-3 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
                {leftLabel}
              </div>
            )}
            <div className="flex-1 p-3">{children}</div>
          </ResizablePanelUI>
          <ResizableHandle withHandle />
          <ResizablePanelUI defaultSize={100 - split} className="flex flex-col">
            {rightLabel && (
              <div className="px-3 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
                {rightLabel}
              </div>
            )}
            <div className="flex-1 p-3 text-xs text-muted-foreground">Drag the handle to resize panels.</div>
          </ResizablePanelUI>
        </PanelGroup>
      );
    },

    AspectBox: ({ props, children }) => {
      const label = props.label as React.ReactNode;
      const ratio = (props.ratio as number) ?? 16 / 9;
      const bg = (props.bg as string) ?? 'bg-muted/30';
      return (
        <div className="w-full">
          {label && <p className="text-xs text-muted-foreground mb-1">{label}</p>}
          <AspectRatio ratio={ratio} className={cn('rounded-xl border border-border overflow-hidden', bg)}>
            {children ?? (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                {ratio === 1 ? '1:1' : ratio > 1.7 ? '16:9' : ratio > 1.3 ? '4:3' : 'Content Area'}
              </div>
            )}
          </AspectRatio>
        </div>
      );
    },

    // ── File Formats ──────────────────────────────────────────────────────────
    JsonViewer: ({ props }) => {
      const title = props.title as React.ReactNode;
      const maxHeight = props.maxHeight as number | undefined;
      const defaultExpanded = props.defaultExpanded as boolean | undefined;

      function renderJson(value: unknown, depth: number, path: string): React.ReactNode {
        if (value === null) return <span className="text-muted-foreground italic">null</span>;
        if (typeof value === 'boolean') return <span className="text-amber-500">{String(value)}</span>;
        if (typeof value === 'number') return <span className="text-blue-500">{value}</span>;
        if (typeof value === 'string') return <span className="text-emerald-600 dark:text-emerald-400">"{value}"</span>;

        if (Array.isArray(value)) {
          if (value.length === 0) return <span className="text-muted-foreground">[]</span>;
          return (
            <CollapsibleJsonNode label={`[ ${value.length} items ]`} depth={depth} path={path} defaultOpen={defaultExpanded !== false}>
              {value.map((item, i) => (
                <div key={i} className="flex gap-1">
                  <span className="text-muted-foreground shrink-0">{i}:</span>
                  {renderJson(item, depth + 1, `${path}.${i}`)}
                  {i < value.length - 1 && <span className="text-muted-foreground">,</span>}
                </div>
              ))}
            </CollapsibleJsonNode>
          );
        }

        if (typeof value === 'object') {
          const keys = Object.keys(value as object);
          if (keys.length === 0) return <span className="text-muted-foreground">{'{}'}</span>;
          return (
            <CollapsibleJsonNode label={`{ ${keys.length} keys }`} depth={depth} path={path} defaultOpen={defaultExpanded !== false || depth === 0}>
              {keys.map((key, i) => (
                <div key={key} className="flex gap-1 flex-wrap">
                  <span className="text-foreground font-medium shrink-0">"{key}":</span>
                  {renderJson((value as Record<string, unknown>)[key], depth + 1, `${path}.${key}`)}
                  {i < keys.length - 1 && <span className="text-muted-foreground">,</span>}
                </div>
              ))}
            </CollapsibleJsonNode>
          );
        }

        return <span>{String(value)}</span>;
      }

      return (
        <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
          {title && (
            <div className="px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
              {title}
            </div>
          )}
          <div
            className="p-4 font-mono text-xs overflow-auto"
            style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
          >
            {renderJson(props.data, 0, 'root')}
          </div>
        </div>
      );
    },

    MarkdownBlock: ({ props }) => {
      const content = (props.content as string) ?? '';
      return (
        <div className={cn(
          'text-sm leading-relaxed',
          '[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-4',
          '[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:mt-4',
          '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1.5 [&_h3]:mt-3',
          '[&_h4]:text-sm [&_h4]:font-medium [&_h4]:mb-1 [&_h4]:mt-2',
          '[&_p]:mb-3 [&_p]:text-foreground',
          '[&_strong]:font-semibold',
          '[&_em]:italic',
          '[&_ul]:mb-3 [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:space-y-1',
          '[&_ol]:mb-3 [&_ol]:pl-4 [&_ol]:list-decimal [&_ol]:space-y-1',
          '[&_li]:text-foreground',
          '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
          '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-3',
          '[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono',
          '[&_pre]:bg-muted [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-auto [&_pre]:my-3 [&_pre]:text-xs',
          '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
          '[&_hr]:border-border [&_hr]:my-4',
          '[&_table]:w-full [&_table]:text-xs [&_table]:border-collapse',
          '[&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:border [&_th]:border-border',
          '[&_td]:px-3 [&_td]:py-2 [&_td]:border [&_td]:border-border',
        )}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            disallowedElements={['script', 'style', 'iframe', 'object', 'embed', 'link']}
            urlTransform={sanitizeMarkdownUri}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    },

    AvatarCard: ({ props }) => {
      const size = (props.size as string) ?? 'md';
      const title = props.title as React.ReactNode;
      const removable = props.removable as boolean;

      const { user } = useAuth();
      const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
      const [bgColor, setBgColor] = useState<string | null>(null);
      const [visible, setVisible] = useState(true);

      useEffect(() => {
        if (!user?.id) return;

        // Load active avatar + bg color
        Promise.all([
          fetch(`${config.backendUrl}/api/avatars?userId=${user.id}&isActive=true`).then(r => r.json()),
          fetch(`${config.backendUrl}/api/avatar/settings?userId=${user.id}`).then(r => r.json()),
        ]).then(([avatarData, settingsData]) => {
          if (avatarData.success && avatarData.avatars?.length) {
            const active = avatarData.avatars.find((a: { isActive: boolean }) => a.isActive) || avatarData.avatars[0];
            const url = active.localGlbPath || active.glbUrl;
            if (url) setAvatarUrl(url);
            if (active.bgColor) setBgColor(active.bgColor);
          } else if (settingsData.settings?.rpmAvatarUrl) {
            setAvatarUrl(settingsData.settings.rpmAvatarUrl);
          }
          if (!bgColor && settingsData.settings?.bgColor) setBgColor(settingsData.settings.bgColor);
        }).catch(() => {});
      }, [user?.id]);

      const sizeDims: Record<string, { w: number; h: number }> = {
        sm: { w: 200, h: 300 },
        md: { w: 260, h: 390 },
        lg: { w: 320, h: 480 },
      };
      const { w, h } = sizeDims[size] ?? sizeDims.md;

      if (!visible) return null;

      const widgetSrc = avatarUrl
        ? `/avatar-widget?url=${encodeURIComponent(avatarUrl)}&preset=bust${bgColor ? `&bg=${encodeURIComponent(bgColor)}` : ''}`
        : null;

      return (
        <div className="relative inline-flex flex-col items-center rounded-xl overflow-hidden border border-border bg-black shadow-md" style={{ width: w, height: h }}>
          {title && (
            <div className="absolute top-2 left-3 z-10 text-xs font-medium text-white/70">{title}</div>
          )}
          {removable && (
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-1 text-white/70 hover:text-white hover:bg-black/80 transition-colors"
              aria-label="Close avatar"
            >
              <User className="h-3.5 w-3.5 opacity-0 pointer-events-none absolute" />
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
          {widgetSrc ? (
            <iframe
              src={widgetSrc}
              className="w-full h-full border-none"
              allow="microphone"
              title="Avatar"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-white/40">
              <User className="h-12 w-12" />
              <span className="text-xs">No avatar configured</span>
            </div>
          )}
        </div>
      );
    },

    SupportChatBlock: ({ props }) => {
      const agentName = (props.agentName as string) ?? 'Assistant';
      const height = (props.height as number) ?? 500;
      const removable = (props.removable as boolean) ?? false;
      const bgColor = (props.bgColor as string) ?? null;
      return (
        <SupportChatBlockDynamic
          agentName={agentName}
          height={height}
          removable={removable}
          bgColor={bgColor}
        />
      );
    },

    AgentSupportPortal: ({ props }) => {
      const height = (props.height as number) ?? 560;
      const bgColor = (props.bgColor as string) ?? null;
      const title = (props.title as string) ?? 'Choose your assistant';
      return (
        <AgentSupportPortalDynamic
          height={height}
          bgColor={bgColor}
          title={title}
        />
      );
    },

    WeatherCard: ({ props }) => {
      type Condition = 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'windy';
      const size = (props.size as string) ?? 'md';
      const unit = (props.unit as string) ?? 'C';
      const condition = props.condition as Condition;
      const temperature = props.temperature as React.ReactNode;
      const location = props.location as React.ReactNode;
      const feelsLike = props.feelsLike as React.ReactNode | null | undefined;
      const humidity = props.humidity as React.ReactNode | null | undefined;
      const wind = props.wind as React.ReactNode | null | undefined;
      const forecast = props.forecast as Array<{ day: string; condition: string; high: React.ReactNode; low: React.ReactNode }> | undefined;

      const COND: Record<Condition, { label: string; bg: string; iconColor: string; IconComp: React.ElementType }> = {
        sunny:           { label: 'Sunny',         bg: 'from-amber-400/20 to-orange-300/10',  iconColor: 'text-amber-500',  IconComp: Sun },
        'partly-cloudy': { label: 'Partly Cloudy', bg: 'from-sky-300/20 to-blue-200/10',     iconColor: 'text-sky-400',    IconComp: CloudSun },
        cloudy:          { label: 'Cloudy',         bg: 'from-slate-400/20 to-slate-300/10',  iconColor: 'text-slate-400',  IconComp: Cloud },
        rainy:           { label: 'Rainy',          bg: 'from-blue-500/20 to-cyan-400/10',    iconColor: 'text-blue-500',   IconComp: CloudRain },
        snowy:           { label: 'Snowy',          bg: 'from-sky-200/30 to-blue-100/20',     iconColor: 'text-sky-300',    IconComp: CloudSnow },
        stormy:          { label: 'Stormy',         bg: 'from-violet-500/20 to-slate-400/10', iconColor: 'text-violet-500', IconComp: CloudLightning },
        windy:           { label: 'Windy',          bg: 'from-teal-400/20 to-cyan-300/10',    iconColor: 'text-teal-500',   IconComp: Wind },
      };

      const cfg = COND[condition] ?? COND.cloudy;
      const IconComponent = cfg.IconComp as any;
      const tempClass = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-5xl' : 'text-4xl';

      if (size === 'sm') {
        return (
          <div className={cn('rounded-xl border bg-gradient-to-br p-4 flex items-center gap-3', cfg.bg)}>
            <IconComponent className={cn('shrink-0 h-8 w-8', cfg.iconColor)} />
            <div>
              <div className={cn('font-bold leading-none', tempClass)}>{temperature}°{unit}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />{location}
              </div>
            </div>
          </div>
        );
      }

      if (size === 'md') {
        return (
          <div className={cn('rounded-xl border bg-gradient-to-br p-5', cfg.bg)}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3 shrink-0" />{location}
                </div>
                <div className={cn('font-bold leading-none', tempClass)}>{temperature}°{unit}</div>
                <div className="text-sm text-muted-foreground mt-1">{cfg.label}</div>
                {feelsLike != null && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Thermometer className="h-3 w-3 shrink-0" />Feels like {feelsLike}°{unit}
                  </div>
                )}
              </div>
              <IconComponent className={cn('shrink-0 h-10 w-10', cfg.iconColor)} />
            </div>
            {(humidity != null || wind != null) && (
              <div className="mt-4 flex gap-4 border-t border-border/40 pt-3">
                {humidity != null && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Droplets className="h-3.5 w-3.5 shrink-0 text-blue-400" />{humidity}% humidity
                  </div>
                )}
                {wind != null && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Wind className="h-3.5 w-3.5 shrink-0 text-teal-400" />{wind} km/h
                  </div>
                )}
              </div>
            )}
          </div>
        );
      }

      // lg
      return (
        <div className={cn('rounded-xl border bg-gradient-to-br p-5', cfg.bg)}>
          {/* Top row: location + main icon */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />{location}
              </div>
              <div className={cn('font-bold leading-none', tempClass)}>{temperature}°{unit}</div>
              <div className={cn('text-sm font-medium mt-1', cfg.iconColor)}>{cfg.label}</div>
              {feelsLike != null && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <Thermometer className="h-3 w-3 shrink-0" />Feels {feelsLike}°{unit}
                </div>
              )}
            </div>
            <IconComponent className={cn('shrink-0 h-12 w-12', cfg.iconColor)} />
          </div>

          {(humidity != null || wind != null) && (
            <div className="mt-3 flex gap-4 border-t border-border/40 pt-2.5">
              {humidity != null && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Droplets className="h-3.5 w-3.5 shrink-0 text-blue-400" />{humidity}% humidity
                </div>
              )}
              {wind != null && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Wind className="h-3.5 w-3.5 shrink-0 text-teal-400" />{wind} km/h
                </div>
              )}
            </div>
          )}

          {/* 5-day forecast */}
          {forecast && forecast.length > 0 && (
            <div className="mt-3 border-t border-border/40 pt-3">
              <div className="flex flex-row justify-between w-full">
                {forecast.slice(0, 5).map((day: any, i: number) => {
                  const dc = COND[day.condition as Condition] ?? COND.cloudy;
                  const DayIcon = dc.IconComp as any;
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flex: '1' }}>
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', fontWeight: 500 }}>{day.day}</span>
                      <DayIcon className={cn('h-4 w-4 shrink-0', dc.iconColor)} />
                      <span style={{ fontSize: '11px', fontWeight: 600 }}>{day.high}°</span>
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{day.low}°</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    },

    MDCBlock: ({ props }) => {
      const content = (props.content as string) ?? '';
      // Parse MDC: split on lines that start with ::ComponentName{...} or ::ComponentName
      const MDC_DIRECTIVE = /^::([A-Z][a-zA-Z0-9]*)(\{.*\})?$/;

      function parseMDCLine(line: string): { type: 'directive'; name: string; rawProps: string } | { type: 'text'; content: string } {
        const match = line.match(MDC_DIRECTIVE);
        if (!match) return { type: 'text', content: line };
        return { type: 'directive', name: match[1], rawProps: match[2] ?? '{}' };
      }

      function parseDirectiveProps(raw: string): Record<string, unknown> {
        if (!raw || raw === '{}') return {};
        // First: try direct JSON parse
        try { return JSON.parse(raw); } catch {}
        // Parse {key="value" key2=123 key3=true key4=[...]} assignment format
        const result: Record<string, unknown> = {};
        const inner = raw.slice(1, -1); // strip outer {}
        let i = 0;
        while (i < inner.length) {
          while (i < inner.length && /\s/.test(inner[i])) i++;
          if (i >= inner.length) break;
          const keyStart = i;
          while (i < inner.length && inner[i] !== '=') i++;
          const key = inner.slice(keyStart, i).trim();
          if (!key || i >= inner.length) break;
          i++; // skip =
          let value: unknown;
          const ch = inner[i];
          if (ch === '"') {
            let str = '';
            i++;
            while (i < inner.length && inner[i] !== '"') {
              if (inner[i] === '\\') i++;
              str += inner[i++];
            }
            i++; // skip closing "
            value = str;
          } else if (ch === '[' || ch === '{') {
            const open = ch, close = ch === '[' ? ']' : '}';
            let depth = 0;
            const start = i;
            while (i < inner.length) {
              const c = inner[i];
              if (c === '"') {
                i++;
                while (i < inner.length && inner[i] !== '"') { if (inner[i] === '\\') i++; i++; }
                i++;
              } else if (c === open) { depth++; i++; }
              else if (c === close) { depth--; i++; if (depth === 0) break; }
              else i++;
            }
            try { value = JSON.parse(inner.slice(start, i)); } catch { value = null; }
          } else {
            const start = i;
            while (i < inner.length && !/\s/.test(inner[i])) i++;
            const tok = inner.slice(start, i);
            value = tok === 'true' ? true : tok === 'false' ? false
              : tok !== '' && !isNaN(Number(tok)) ? Number(tok) : tok;
          }
          if (key) result[key] = value;
        }
        return result;
      }

      const lines = content.split('\n');
      const segments: Array<{ type: 'markdown'; text: string } | { type: 'component'; name: string; props: Record<string, unknown> }> = [];
      let textBuffer: string[] = [];

      for (const line of lines) {
        const parsed = parseMDCLine(line);
        if (parsed.type === 'directive') {
          if (textBuffer.length > 0) {
            segments.push({ type: 'markdown', text: textBuffer.join('\n') });
            textBuffer = [];
          }
          segments.push({ type: 'component', name: parsed.name, props: parseDirectiveProps(parsed.rawProps) });
        } else {
          textBuffer.push(parsed.content);
        }
      }
      if (textBuffer.length > 0) {
        segments.push({ type: 'markdown', text: textBuffer.join('\n') });
      }

      return (
        <div className="space-y-3">
          {segments.map((seg, i) => {
            if (seg.type === 'markdown') {
              const trimmed = seg.text.trim();
              if (!trimmed) return null;
              return (
                <div key={i} className={cn(
                  'text-sm leading-relaxed',
                  '[&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-2',
                  '[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-1.5',
                  '[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1',
                  '[&_p]:mb-2 [&_strong]:font-semibold [&_em]:italic',
                  '[&_ul]:pl-4 [&_ul]:list-disc [&_ul]:space-y-1',
                  '[&_ol]:pl-4 [&_ol]:list-decimal [&_ol]:space-y-1',
                  '[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono',
                  '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
                )}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                    disallowedElements={['script', 'style', 'iframe', 'object', 'embed', 'link']}
                    urlTransform={sanitizeMarkdownUri}
                  >
                    {trimmed}
                  </ReactMarkdown>
                </div>
              );
            }
            // Component directive — rendered via deferred registry ref
            return (
              <div key={i} className="my-1">
                <_MDCComponentRenderer name={seg.name} compProps={seg.props} />
              </div>
            );
          })}
        </div>
      );
    },
  },
});

// Set deferred ref after registry is fully built
_reg = registry;

// Render a single component by name using the deferred registry — used by MDCBlock
function _MDCComponentRenderer({ name, compProps }: { name: string; compProps: Record<string, unknown> }) {
  const Component = getComponentFromRegistry(name);
  if (!Component) {
    return (
      <div className="px-3 py-2 border border-dashed border-border rounded-lg text-xs text-muted-foreground">
        Unknown component: {name}
      </div>
    );
  }
  return (Component({ props: compProps, children: null, emit: () => {} }) as React.ReactElement) ?? null;
}

// Collapsible node for JsonViewer
function CollapsibleJsonNode({
  label,
  depth,
  path,
  defaultOpen,
  children,
}: {
  label: string;
  depth: number;
  path: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? depth < 2);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? '▾' : '▸'} <span className="text-foreground/60">{label}</span>
      </button>
      {open && (
        <div className="pl-4 border-l border-border/40 ml-1 mt-1 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
