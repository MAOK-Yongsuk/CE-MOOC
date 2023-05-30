// pages/course/index.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Course {
    _Courses__refcode: string;
    _Courses__title: string;
}

const AllCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/courses')
            .then(response => response.json())
            .then(data => setCourses(data));
    }, []);

    return (
        <div>
            <h1>All Courses</h1>
            {courses.map((course, index) => (
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
};

export default AllCourses;
