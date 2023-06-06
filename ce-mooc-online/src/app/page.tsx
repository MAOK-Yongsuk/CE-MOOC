// src/app/page.tsx

'use client'
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

interface Course {
  _Courses__refcode: string;
  _Courses__title: string;
  _Courses__release: string;
}

export default function Home() {
  const categories = ["Science", "Math", "Software", "Hardware", "Language"];
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = (event.currentTarget.elements.namedItem('data') as HTMLInputElement).value;
    window.location.href = `/search/${data}`;
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/courses')
      .then(response => response.json())
      .then(data => {
        const shuffledCourses = data.sort(() => 0.5 - Math.random());
        setCourses(shuffledCourses.slice(0, 4));
        const sortedCourses = data.sort((a: Course, b: Course) =>
          new Date(b._Courses__release).getTime() - new Date(a._Courses__release).getTime()
        );
        setRecentCourses(sortedCourses.slice(0, 8));
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="data"
          placeholder="Search for courses"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <h2>Categories</h2>
      {categories.map((category, index) => (
        <div key={index}>
          <Link href={`/category/${category}`}>{category}</Link>
        </div>
      ))}
      <div>
        <h2>Recommended Courses</h2>
        {courses.map((course, index) => (
          <div key={index}>
            <Link href={`/course/${course._Courses__refcode}`}>
              {course._Courses__title} ({course._Courses__refcode})
            </Link>
          </div>
        ))}
        <h2>Recent Courses</h2>
        {recentCourses.map((course, index) => (
          <div key={index}>
            <Link href={`/course/${course._Courses__refcode}`}>
              {course._Courses__title} ({course._Courses__refcode})
            </Link>
          </div>
        ))}
        <h2>All Courses</h2>
        <Link href="/course">See All Courses</Link>
      </div>
    </div>
  );
};

