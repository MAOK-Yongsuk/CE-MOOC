// pages/search/[data].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Course {
    _Courses__refcode: string;
    _Courses__title: string;
}

const SearchResults = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const { data } = router.query;

    useEffect(() => {
        if (data) {
            fetch(`http://localhost:8000/courses/search/?data=${data}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data) && data[0] === 'Course Not Found!!') {
                        setMessage('Course Not Found!!');
                        setCourses([]);
                    } else {
                        setCourses(data);
                        setMessage('');
                    }
                });
        }
    }, [data]);

    return (
        <div>
            <h1>Search Results for: {data}</h1>
            {message ? (
                <p>{message}</p>
            ) : (
                courses.map((course, index) => (
                    <div key={index}>
                        <h2>
                            <Link href={`/course/${course._Courses__refcode}`}>
                                {course._Courses__title} ({course._Courses__refcode})
                            </Link>
                        </h2>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResults;