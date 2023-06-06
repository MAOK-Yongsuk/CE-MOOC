// src/app/search/[data]/page.tsx

import React from 'react'
import Link from 'next/link';

interface Course {
  _Courses__refcode: string;
  _Courses__title: string;
  _Courses__release: string;
}

interface Params {
    data: string;
  }

export default async function Page({ params }: { params: Params }) {
  const { data } = params;

  const res = await fetch(`http://127.0.0.1:8000/courses/search/?data=${data}`);
  const courses: Course[] = await res.json();

  return (
    <div>
      <h2>Search Results for "{data}"</h2>
      {courses.map((course, index) => (
        <div key={index}>
          <Link href={`/course/${course._Courses__refcode}`}>
            {course._Courses__title} ({course._Courses__refcode})
          </Link>
        </div>
      ))}
    </div>
  )
}