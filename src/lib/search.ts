// src/lib/search.ts
import { departments } from '@/data/departments';
import { faculty } from '@/data/faculty';

export type SearchHit = {
  id: string;
  kind: 'department' | 'event' | 'faculty' | 'testimonial' | 'section'  | 'page'  ;
  title: string;
  snippet?: string;
  href: string; // should be the final URL we want to navigate to (may include #fragment)
};

function normalize(s?: string) {
  return (s ?? '').toLowerCase().trim();
}

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

  // Events (if you have event pages)
  /*events.forEach((e) => {
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
  });*/

  // Faculty — important: point to department page with #faculty-{slug}
  faculty.forEach((f) => {
    const hay = `${f.name} ${f.title ?? ''} ${f.bio ?? ''}`.toLowerCase();
    if (hay.includes(q)) {
      // ensure f.department exists in your data (it does)
      results.push({
        id: `fac-${f.slug ?? f.id}`,
        kind: 'faculty',
        title: f.name,
        snippet: f.title ?? f.bio?.slice(0, 120),
        // link to department page + fragment id that you already added in dept page
        href: `/departments/${f.department}#faculty-${f.slug ?? f.id}`,
      });
    }
  });

  // Testimonials -> shallow link to home section id (you already have /#testimonials)
  /*testimonials.forEach((t, i) => {
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
  });*/

  // STATIC site sections (home sections and top-level pages) — add as searchable items
  const staticSections = [
    { id: 'jvm-world', title: 'JVM World', href: '/#jvm-world' },
    { id: 'principal', title: 'Principal Message', href: '/#principal' },
    // add more if you want (events section already has id 'events' in your Events.tsx)
    { id: 'events', title: 'Events', href: '/#events' },
  ];

  staticSections.forEach((s) => {
    if (s.title.toLowerCase().includes(q)) {
      results.push({
        id: `sec-${s.id}`,
        kind: 'section',
        title: s.title,
        snippet: undefined,
        href: s.href,
      });
    }
  });

  const staticpages = [
    { id: 'about-us', title: 'About Us', href: '/about' },
    { id: 'vision-section', title: 'Vision & Mission', href: '/vision' },
    { id: 'contact-us', title: 'Contact Us', href: '/contact' },
  ]

   staticpages.forEach((s) => {
    if (s.title.toLowerCase().includes(q)) {
      results.push({
        id: `sec-${s.id}`,
        kind: 'page',
        title: s.title,
        snippet: undefined,
        href: s.href,
      });
    }
  });


  return results;
}
