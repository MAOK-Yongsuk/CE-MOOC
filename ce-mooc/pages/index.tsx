// pages/index.tsx

import React from 'react';
import Link from 'next/link';

const Home = () => {
    const categories = ["Science", "Math", "Software", "Hardware", "Language"];

    return (
        <div>
            <h1>CE MOOC</h1>
            <h2>Categories</h2>
            {categories.map((category, index) => (
                <div key={index}>
                    <Link href={`/category/${category}`}>
                        {category}
                    </Link>
                </div>
            ))}
            <div>
              <h2>Courses</h2>
                <Link href="/course">
                    All Courses
                </Link>
            </div>
        </div>
    );
};

export default Home;