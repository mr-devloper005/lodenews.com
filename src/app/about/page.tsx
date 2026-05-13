import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  {
    title: "Editorial standards extend to ads",
    description:
      "Scam patterns, misleading prices, and stolen photos are reviewed with the same skepticism we bring to tips on the news desk.",
  },
  {
    title: "Built for real transactions",
    description:
      "Large photos, clear fields, and contact paths that keep buyers and sellers in control—without a middleman clipping every message.",
  },
  {
    title: "Local first",
    description:
      "Categories and geography reflect how Coloradans actually buy and sell: mountain gear, leases, trucks, and weekend projects.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} pairs independent reporting with a premium classifieds marketplace for the Front Range and beyond.`}
      actions={
        <Link href="/contact" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Contact Us
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">News you trust, listings that behave like the real world.</h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} started as a reader-supported newsroom. The classifieds layer gives those same readers a safer, faster way to buy and sell without leaving a brand they already know.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
