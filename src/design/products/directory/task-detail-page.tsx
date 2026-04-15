import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const price = typeof content.price === 'number' && Number.isFinite(content.price) ? content.price : null
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  const contactRows = [
    location ? { icon: MapPin, label: 'Location', value: location, href: null as string | null } : null,
    phone ? { icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` } : null,
    email ? { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` } : null,
    website ? { icon: Globe, label: 'Website', value: website, href: website } : null,
  ].filter(Boolean) as Array<{ icon: typeof MapPin; label: string; value: string; href: string | null }>

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fefcfd_0%,#f8f0f3_100%)] text-[#62013C]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link href={taskRoute} className="mb-8 inline-flex items-center gap-2 text-base font-semibold text-[#AD2959] hover:text-[#F2676A]">
          ← Back to {taskLabel}
        </Link>

        <div className="mb-8 flex flex-col gap-4 border-b border-[#ead6e0] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#AD2959]">{category || taskLabel}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">{post.title}</h1>
            {price != null ? <p className="mt-4 text-4xl font-black tracking-tight text-[#F2676A] sm:text-5xl">${price.toLocaleString()}</p> : null}
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8d0da] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#62013C] shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#AD2959]" /> Verified listing
          </span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-[#e8d0da] bg-white shadow-[0_28px_80px_rgba(98,1,60,0.1)]">
              <div className="relative h-[min(52vh,480px)] overflow-hidden bg-[#f3e9ee]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#62013C]/25 via-transparent to-transparent" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-2 p-4 sm:gap-3">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#ead6e0] bg-[#fdf8fa]">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-[#e8d0da] bg-white p-8 shadow-[0_24px_64px_rgba(98,1,60,0.07)] lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#AD2959]">About this listing</p>
              <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#62013C] lg:text-3xl">Full description</h2>
              <p className="mt-5 text-lg leading-8 text-[#5c3d4f]">{description}</p>
              {highlights.length ? (
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-[#f0dde6] bg-[#fdf8fa] px-4 py-4 text-sm font-medium leading-relaxed text-[#62013C]">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FBE087] text-xs font-bold text-[#62013C]">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-[#e8d0da] bg-[#62013C] p-7 text-white shadow-[0_24px_64px_rgba(98,1,60,0.22)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#FBE087]/90">Contact & facts</p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em]">Reach out</h2>
              <div className="mt-6 grid gap-3">
                {contactRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 py-3.5 text-sm"
                  >
                    <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FBE087]" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{row.label}</p>
                      {row.href ? (
                        <a href={row.href} className="mt-1 block break-all font-semibold text-white hover:text-[#FBE087]" target={row.href.startsWith('http') ? '_blank' : undefined} rel={row.href.startsWith('http') ? 'noreferrer' : undefined}>
                          {row.value}
                        </a>
                      ) : (
                        <span className="mt-1 block font-semibold">{row.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {website ? (
                  <a href={website} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F2676A] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F2676A]/25 hover:bg-[#e85558] sm:flex-none">
                    Visit website <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link href={taskRoute} className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold hover:bg-white/15 sm:flex-none">
                  More in category
                </Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-[#e8d0da] bg-white shadow-[0_20px_50px_rgba(98,1,60,0.08)]">
                <div className="border-b border-[#ead6e0] bg-[#fdf8fa] px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#AD2959]">Map</p>
                  <p className="mt-1 text-sm font-semibold text-[#62013C]">Where you&apos;ll find this listing</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0 sm:h-[320px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-[#e8d0da] bg-white p-6 shadow-[0_18px_48px_rgba(98,1,60,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#AD2959]">At a glance</p>
              <dl className="mt-4 grid gap-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#f0dde6] pb-3">
                  <dt className="font-medium text-[#6b4a60]">Category</dt>
                  <dd className="font-bold text-[#62013C]">{category}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#f0dde6] pb-3">
                  <dt className="font-medium text-[#6b4a60]">Listing type</dt>
                  <dd className="font-bold capitalize text-[#62013C]">{task}</dd>
                </div>
                {post.publishedAt ? (
                  <div className="flex justify-between gap-4">
                    <dt className="font-medium text-[#6b4a60]">Published</dt>
                    <dd className="font-bold text-[#62013C]">{new Date(post.publishedAt).toLocaleDateString()}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-16 border-t border-[#ead6e0] pt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#AD2959]">You may also like</p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#62013C] sm:text-4xl">Similar in {category}</h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e8d0da] bg-[#fdf8fa] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#62013C]">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
