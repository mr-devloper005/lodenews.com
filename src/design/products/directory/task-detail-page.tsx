'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Globe, MapPin, Phone, SquareArrowOutUpRight, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const [activeImage, setActiveImage] = useState(images[0] || '')

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
  }

  const splitDescription = description
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  const overview = splitDescription[0] || description
  const idealFor = splitDescription[1] || ''
  const valueProp = splitDescription[2] || ''

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <Link href={taskRoute} className="mb-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
          Back to {taskLabel}
        </Link>

        <header className="border-b border-border pb-5">
          <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                {location}
              </span>
            ) : null}
          </div>
        </header>

        <div className="mt-4 flex items-center border-b border-border pb-3 text-sm">
          <div className="relative font-medium text-foreground">
            Details
            <span className="absolute -bottom-3 left-0 h-0.5 w-16 bg-amber-500" />
          </div>
        </div>

        <section className="mt-6 rounded-md border border-border bg-card p-3 sm:p-4">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group relative mx-auto block aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-sm bg-muted"
                onClick={() => setActiveImage(images[0] || '')}
              >
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" priority />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none" showCloseButton>
              <DialogTitle className="sr-only">{post.title} image preview</DialogTitle>
              <div className="relative aspect-[4/5] max-h-[85vh] w-full overflow-hidden rounded-md bg-black">
                <ContentImage src={activeImage || images[0]} alt={`${post.title} enlarged`} fill className="object-contain" />
              </div>
            </DialogContent>
          </Dialog>

          {images.length > 1 ? (
            <div className="mx-auto mt-3 grid w-full max-w-2xl grid-cols-4 gap-2">
              {images.slice(1, 5).map((image) => (
                <Dialog key={image}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-muted"
                      onClick={() => setActiveImage(image)}
                    >
                      <ContentImage src={image} alt={`${post.title} preview`} fill className="object-cover transition-transform duration-300 hover:scale-[1.04]" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none" showCloseButton>
                    <DialogTitle className="sr-only">{post.title} image preview</DialogTitle>
                    <div className="relative aspect-[4/5] max-h-[85vh] w-full overflow-hidden rounded-md bg-black">
                      <ContentImage src={activeImage || image} alt={`${post.title} enlarged`} fill className="object-contain" />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : null}
        </section>

        {(website || phone) ? (
          <section className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {website ? (
              <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary hover:underline">
                <Globe className="h-4 w-4" />
                Website
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {phone ? (
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary hover:underline sm:justify-end">
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            ) : null}
          </section>
        ) : null}

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">Overview</h2>
            <RichContent
              html={formatRichHtml(overview)}
              className="mt-3 text-[15px] leading-7 text-muted-foreground prose-p:my-3"
            />
          </div>

          {highlights.length ? (
            <div>
              <h3 className="text-base font-semibold text-foreground">Key Features</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {idealFor ? (
            <div>
              <h3 className="text-base font-semibold text-foreground">Who It's For</h3>
              <RichContent
                html={formatRichHtml(idealFor)}
                className="mt-3 text-[15px] leading-7 text-muted-foreground prose-p:my-3"
              />
            </div>
          ) : null}

          {valueProp ? (
            <div>
              <h3 className="text-base font-semibold text-foreground">Why You'll Like It</h3>
              <RichContent
                html={formatRichHtml(valueProp)}
                className="mt-3 text-[15px] leading-7 text-muted-foreground prose-p:my-3"
              />
            </div>
          ) : null}
        </section>

        {mapEmbedUrl ? (
          <section className="mt-8">
            <h3 className="text-base font-semibold text-foreground">Location map</h3>
            <div className="mt-3 overflow-hidden rounded-md border border-border">
              <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[280px] w-full border-0 sm:h-[320px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </section>
        ) : null}

        <section className="mt-12 border-t border-border pt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground">More in {category}</h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Tag className="h-3.5 w-3.5" /> {taskLabel}
            </span>
          </div>
          {related.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No related posts yet.</p>
          )}
        </section>
      </main>
    </div>
  )
}
