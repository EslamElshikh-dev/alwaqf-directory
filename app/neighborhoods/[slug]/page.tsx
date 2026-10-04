import { notFound, permanentRedirect } from "next/navigation";
import { cityLocalities } from "@/lib/data";

export function generateStaticParams() {
  return cityLocalities.map(locality => ({ slug: locality.slug }));
}

export default async function LegacyLocalityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locality = cityLocalities.find(item => item.slug === decodeURIComponent(slug));
  if (!locality) notFound();
  permanentRedirect(`/localities/${encodeURIComponent(locality.slug)}`);
}
