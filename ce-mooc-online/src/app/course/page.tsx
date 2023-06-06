// src/app/courses/page.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Course {
    _Courses__refcode: string;
    _Courses__title: string;
}

export default async function Page() {
  const res = await fetch('http://127.0.0.1:8000/courses');
  const courses = await res.json();

  return (
    <div>
        <h1>All Courses</h1>
        {courses.map((course:Course, index:number) => (
            <div key={index}>
                <h3>
                    <Link href={`/course/${course._Courses__refcode}`}>
                        {course._Courses__title} ({course._Courses__refcode})
                    </Link>
                </h3>
            </div>
        ))}
    </div>
  );
}
