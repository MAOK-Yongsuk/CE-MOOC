// pages/category/[catg].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Course {
    _Courses__refcode: string;
    _Courses__title: string;
}

const CategoryCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const router = useRouter();
    const { catg } = router.query;

    useEffect(() => {
        if (catg) {
            fetch(`http://localhost:8000/courses/category/${catg}`)
                .then(response => response.json())
                .then(data => setCourses(data));
        }
    }, [catg]);

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
};

export default CategoryCourses;
