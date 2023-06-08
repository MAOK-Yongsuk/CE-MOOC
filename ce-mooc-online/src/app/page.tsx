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
  const [ranCourses, setRanCourses] = useState<Course[]>([]);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = (event.currentTarget.elements.namedItem('data') as HTMLInputElement).value;
    if (data.toLowerCase() === '') {
        window.location.href = `/course`;
    } else {
        window.location.href = `/search/${data}`;
    }
};

  useEffect(() => {
    fetch('http://127.0.0.1:8000/courses')
      .then(response => response.json())
      .then(data => {
        const shuffledCourses = data.sort(() => 0.5 - Math.random());
        setRanCourses(shuffledCourses.slice(0, 4));
        const sortedCourses = data.sort((a: Course, b: Course) =>
          new Date(b._Courses__release).getTime() - new Date(a._Courses__release).getTime()
        );
        setRecentCourses(sortedCourses.slice(0, 8));
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form className="mt-1 flex rounded-md shadow-sm" onSubmit={handleSubmit}>
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
          </div>

          <input
            type="text"
            name="data"
            className={`block w-full rounded-none rounded-l-md pl-10 sm:text-sm outline-[#1e3a8a]`}
            placeholder="Search for courses"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

        </div>
        <button type="submit" className="ml-3 relative 
                                    inline-flex 
                                    items-center 
                                    px-4 py-2 
                                    border-transparent 
                                    text-sm 
                                    font-medium 
                                    rounded-md 
                                    text-white 
                                    bg-[#1e3a8a] 
                                    focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-offset-2 
                                    focus:ring-[#d4d4d4]">
          Search
        </button>
      </form>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1e3a8a] text-white text-center py-20 mt-4 rounded-md">
          <h1 className="text-5xl">Welcome to CE MOOC</h1>
        </div>
      </div>  

      <div className="mt-4">
        <h2 className="text-lg leading-6 font-bold text-[#1e3a8a]">Course Categories</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <Link href={`/category/${category}`}>
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {category}
                  </dt>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg leading-6 font-bold text-[#1e3a8a]">Recommended Courses</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {ranCourses.map((course) => (
            <Link href={`/course/${course._Courses__refcode}`} key={course._Courses__refcode}>
              <p className="block bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {course._Courses__title}
                  </dt>
                </div>
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg leading-6 font-bold text-[#1e3a8a]">Latest Courses</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {recentCourses.map((course) => (
            <Link href={`/course/${course._Courses__refcode}`} key={course._Courses__refcode}>
              <p className="block bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {course._Courses__title}
                  </dt>
                </div>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}