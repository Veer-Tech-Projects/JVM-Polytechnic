// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { departments } from "../data/departments";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jvm-polytechnic.vercel.app"; // Replace with your domain

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/vision`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/departments`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  // Dynamic department pages
  const departmentPages = departments.map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Combine all pages
  return [...staticPages, ...departmentPages] as MetadataRoute.Sitemap; 
  // ✅ Type assertion fixes TypeScript issues
}
