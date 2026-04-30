'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

function getLoginConfig(kind: ReturnType<typeof getProductKind>, brandPack: string) {
  if (kind === 'directory') {
    if (brandPack === 'market-utility') {
      return {
        shell: 'bg-[linear-gradient(180deg,#faf5f7_0%,#f3e9ee_100%)] text-[#62013C]',
        panel: 'border border-[#e8d0da] bg-white shadow-[0_28px_72px_rgba(98,1,60,0.09)]',
        side: 'border border-[#ead6e0] bg-[#fdf8fa]',
        muted: 'text-[#6b4a60]',
        title: 'text-[#62013C]',
        badge: 'bg-[#AD2959] text-[#fff5f7]',
        action: 'bg-[#F2676A] text-white shadow-[0_12px_32px_rgba(242,103,106,0.35)] hover:bg-[#e85558]',
        icon: Building2,
        titleText: 'Access your business dashboard',
        body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
      }
    }
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      title: 'text-slate-950',
      badge: 'bg-slate-950 text-white',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      icon: Building2,
      titleText: 'Access your business dashboard',
      body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      title: 'text-[#241711]',
      badge: 'bg-[#241711] text-[#fff1e2]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      titleText: 'Sign in to your publication workspace',
      body: 'Draft, review, and publish long-form work with the calmer reading system intact.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
      side: 'border border-white/10 bg-white/6',
      muted: 'text-slate-300',
      title: 'text-white',
      badge: 'bg-[#8df0c8] text-[#07111f]',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      titleText: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools without dropping into a generic admin shell.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    titleText: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
  }
}

export default function LoginPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind, recipe.brandPack)
  const Icon = config.icon
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    router.push('/')
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className={`mt-5 text-4xl font-semibold tracking-[-0.05em] ${config.title}`}>{config.titleText}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Cleaner product-specific workflows', 'Palette and layout matched to the site family', 'Fewer repeated admin patterns'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <input 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Email address" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
