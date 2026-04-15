'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-white/10 bg-[#62013C] text-white shadow-[0_8px_32px_rgba(98,1,60,0.22)] backdrop-blur-xl',
    logo: 'rounded-xl border border-white/15 bg-white/10',
    nav: 'text-white/75 hover:text-[#FBE087]',
    search: 'border border-white/15 bg-[#FBE087] text-[#3d1530] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]',
    cta: 'bg-[#F2676A] text-white hover:bg-[#e85558]',
    post: 'border border-white/20 bg-white/10 text-white hover:bg-white/15',
    mobile: 'border-t border-[#AD2959]/50 bg-[#4a0531]',
  },
} as const

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]
    const premiumClassifiedNav = recipe.brandPack === 'market-utility'

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8',
            premiumClassifiedNav ? 'min-h-[4.25rem] py-3 lg:min-h-[4.75rem] lg:py-0' : 'h-20',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-3 lg:gap-6',
              premiumClassifiedNav ? 'shrink-0' : 'min-w-0 flex-1',
            )}
          >
            <Link href="/" className="group flex min-w-0 shrink-0 flex-col justify-center gap-0.5">
              {premiumClassifiedNav ? (
                <div className="flex min-w-0 items-center gap-2.5">
                  <img
                    src="/favicon.png?v=1"
                    alt=""
                    width={40}
                    height={40}
                    className="h-9 w-9 shrink-0 rounded-xl object-contain shadow-[0_2px_12px_rgba(0,0,0,0.18)] ring-1 ring-white/30 sm:h-10 sm:w-10"
                    aria-hidden
                  />
                  <div className="flex min-w-0 flex-col justify-center gap-0.5">
                    <span
                      className="bg-gradient-to-r from-[#FBE087] via-white to-[#F2676A] bg-clip-text font-black tracking-[-0.07em] text-transparent"
                      style={{ fontSize: 'clamp(1.35rem, 3.8vw, 1.9rem)' }}
                    >
                      {SITE_CONFIG.name}
                    </span>
                    <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:block">{siteContent.navbar.tagline}</span>
                  </div>
                </div>
              ) : (
                <div className="flex min-w-0 flex-col gap-0.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <img
                      src="/favicon.png?v=1"
                      alt=""
                      width={36}
                      height={36}
                      className="h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
                      aria-hidden
                    />
                    <span className="truncate text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{SITE_CONFIG.name}</span>
                  </div>
                  <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:block">{siteContent.navbar.tagline}</span>
                </div>
              )}
            </Link>

            {!premiumClassifiedNav ? (
              <div className="hidden items-center gap-5 xl:flex">
                {primaryNavigation.slice(0, 4).map((task) => {
                  const isActive = pathname.startsWith(task.route)
                  return (
                    <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-foreground' : palette.nav)}>
                      {task.label}
                    </Link>
                  )
                })}
              </div>
            ) : null}
          </div>

          {premiumClassifiedNav ? (
            <>
              <Link
                href="/search"
                className="mx-1 hidden min-w-0 flex-[1.1] items-center gap-3 rounded-2xl border border-white/15 bg-[#FBE087] px-4 py-3 text-[#3d1530] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition hover:bg-[#fce99d] lg:flex"
              >
                <Search className="h-5 w-5 shrink-0 text-[#62013C]" />
                <span className="truncate text-base font-semibold">Search ads &amp; categories</span>
                <span className="ml-auto hidden items-center gap-1.5 text-sm font-medium text-[#62013C]/75 xl:flex">
                  <MapPin className="h-4 w-4" />
                  Near you
                </span>
              </Link>
              <Button variant="ghost" size="icon" asChild className="shrink-0 rounded-xl bg-[#FBE087] text-[#62013C] hover:bg-[#fce99d] lg:hidden">
                <Link href="/search" aria-label="Search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <div className={cn('flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3', palette.search)}>
                <Search className="h-4 w-4" />
                <span className="text-sm">Find businesses, spaces, and local services</span>
                <div className="ml-auto hidden items-center gap-1 text-xs opacity-75 md:flex">
                  <MapPin className="h-3.5 w-3.5" />
                  Local discovery
                </div>
              </div>
            </div>
          )}

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {primaryTask ? (
              <Link
                href={primaryTask.route}
                className={cn(
                  'hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] md:inline-flex',
                  premiumClassifiedNav ? 'border border-white/20 text-white/85 hover:bg-white/10' : 'border border-current/10 opacity-75',
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className={cn('rounded-full px-4', premiumClassifiedNav && 'text-white hover:bg-white/10 hover:text-white')}>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full font-semibold shadow-sm', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Post ad
                  </Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn('rounded-full', premiumClassifiedNav && 'text-white hover:bg-white/10 lg:hidden')}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {premiumClassifiedNav ? (
          <div className="border-t border-[#AD2959]/45 bg-white">
            <div className="mx-auto flex max-w-7xl items-center gap-0 overflow-x-auto overscroll-x-contain px-0 py-0 sm:px-2 lg:px-8">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'whitespace-nowrap border-r border-[#ead6e0] px-4 py-3 text-sm font-bold tracking-tight transition-colors last:border-r-0 sm:px-5',
                      isActive ? 'text-[#F2676A]' : 'text-[#62013C]/80 hover:bg-[#fdf8fa] hover:text-[#AD2959]',
                    )}
                  >
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold', palette.search)}
              >
                <Search className="h-4 w-4" />
                Search the marketplace
              </Link>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      isActive ? (premiumClassifiedNav ? 'bg-[#F2676A] text-white' : 'bg-foreground text-background') : palette.post,
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex min-w-0 shrink-0 flex-col gap-0.5 pr-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src="/favicon.png?v=1"
                alt=""
                width={36}
                height={36}
                className={cn('h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9', style.logo)}
                aria-hidden
              />
              <span className="truncate text-base font-extrabold tracking-tight sm:text-lg">{SITE_CONFIG.name}</span>
            </div>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:block">{siteContent.navbar.tagline}</span>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
