// pages/course/[refcode].tsx

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Course {
    _Courses__refcode: string;
    _Courses__title: string;
    _Courses__desc: string;
    _Courses__teacher: string;
    // Include other properties of the course that you want to display
}

const CourseDetails = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const router = useRouter();
    const { refcode } = router.query;

    useEffect(() => {
        if (refcode) {
            fetch(`http://localhost:8000/courses/${refcode}`)
                .then(response => response.json())
                .then(data => setCourse(data));
        }
    }, [refcode]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course._Courses__title}</h1>
            <p>{course._Courses__desc}</p>
            <p>{course._Courses__teacher}</p>
            {/* Display other properties of the course */}
        </div>
    );
};

export default CourseDetails;
