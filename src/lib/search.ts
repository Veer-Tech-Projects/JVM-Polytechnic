// src/lib/search.ts
import { departments } from '@/data/departments';
import { events } from '@/data/events';
import { faculty } from '@/data/faculty';
import { testimonials } from '@/data/testimonials';

export type SearchHit = {
  id: string;
  kind: 'department' | 'event' | 'faculty' | 'testimonial';
  title: string;
  snippet?: string;
  href: string;
};

// Helper to normalize input
function normalize(s?: string) {
  return (s ?? '').toLowerCase().trim();
}

// ✅ Simple search (no suggestions)
export function searchAll(query: string): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];

  const results: SearchHit[] = [];

  // Departments
  departments.forEach((d) => {
    const hay = `${d.name} ${d.shortDesc ?? ''} ${d.description ?? ''}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `dept-${d.slug}`,
        kind: 'department',
        title: d.name,
        snippet: d.shortDesc ?? d.description?.slice(0, 120),
        href: `/departments/${d.slug}`,
      });
    }
  });

  // Events
  events.forEach((e) => {
    const hay = `${e.title} ${e.summary ?? ''} ${e.description ?? ''}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `evt-${e.id}`,
        kind: 'event',
        title: e.title,
        snippet: e.summary ?? e.description?.slice(0, 120),
        href: `/events/${e.slug ?? e.id}`,
      });
    }
  });

  // Faculty
  faculty.forEach((f) => {
    const hay = `${f.name} ${f.title ?? ''} ${f.bio ?? ''}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `fac-${f.slug ?? f.id}`,
        kind: 'faculty',
        title: f.name,
        snippet: f.title ?? f.bio?.slice(0, 120),
        href: `/faculty/${f.slug ?? f.id}`,
      });
    }
  });

  // Testimonials
  testimonials.forEach((t, i) => {
    const hay = `${t.author ?? ''} ${t.text ?? ''}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        id: `test-${i}`,
        kind: 'testimonial',
        title: t.author ?? 'Testimonial',
        snippet: t.text?.slice(0, 120),
        href: `/#testimonials`,
      });
    }
  });

  return results;
}
