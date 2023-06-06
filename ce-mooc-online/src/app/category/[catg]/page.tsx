import React from 'react'
import Link from 'next/link'

interface Course {
    _Courses__refcode: string;
    _Courses__title: string;
}

interface Params {
    catg: string;
}

export default async function CategoryCourses({ params }: { params: Params }) {
    const { catg } = params;

    try {
        const res = await fetch(`http://127.0.0.1:8000/courses/category/${catg}`);
        const courses: Course[] = await res.json();

        return (
            <div>
                <h1>Courses in Category: {catg}</h1>
                {courses.map((course, index) => (
                    <div key={index}>
                        <h2>
                            <Link href={`/course/${course._Courses__refcode}`}>
                                {course._Courses__title} ({course._Courses__refcode})
                            </Link>
                        </h2>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch courses: ", error);
        return <div>Error fetching courses</div>;
    }
};