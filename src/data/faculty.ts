// src/data/faculty.ts
import type { Faculty } from "@/types/faculty";

export const faculty: Faculty[] = [
  {
    id: "fac1",
    slug: "ms-aparna-mundaganur",
    name: "Ms. Aparna Mundaganur",
    title: "Head of Computer Science Department",
    bio: "Ms. Aparna Mundaganur has over 15 years of experience in software engineering, AI, and machine learning research. She has guided numerous projects in data analytics and cloud computing.",
    image: "/images/faculty/faculty1.jpg",
    department: "cs",
  },
  {
    id: "fac2",
    slug: "mr-rahul-deshpande",
    name: "Mr. Rahul Deshpande",
    title: "Senior Lecturer, Computer Science Department",
    bio: "Mr. Deshpande specializes in web technologies, system design, and data structures. He is passionate about mentoring students in full-stack development and cloud systems.",
    image: "/images/faculty/faculty2.jpg",
    department: "cs",
  },
  {
    id: "fac3",
    slug: "ms-shweta-naik",
    name: "Ms. Shweta Naik",
    title: "Assistant Professor, Computer Science Department",
    bio: "Ms. Naik’s teaching areas include database systems, computer networks, and mobile application development. She has guided several innovative student projects.",
    image: "/images/faculty/faculty5.jpg",
    department: "cs",
  },
  {
    id: "fac4",
    slug: "mr-sameer-patil",
    name: "Mr. Sameer Patil",
    title: "Lecturer, Computer Science Department",
    bio: "Mr. Patil focuses on AI-driven applications and IoT. He believes in practical, project-based learning and has mentored students for national-level hackathons.",
    image: "/images/faculty/faculty4.jpg",
    department: "cs",
  },
];
