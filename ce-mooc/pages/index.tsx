// pages/index.tsx

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
    const categories = ["Science", "Math", "Software", "Hardware", "Language"];
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/search/${searchTerm}`);
    };

    return (
        <div>
            <h1>CE MOOC</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for courses"
                />
                <button type="submit">Search</button>
            </form>
            <h2>Categories</h2>
            {categories.map((category, index) => (
                <div key={index}>
                    <Link href={`/category/${category}`}>
                        {category}
                    </Link>
                </div>
            ))}
            <div>
                <h2>All Courses</h2>
                <Link href="/course">
                    All Courses
                </Link>
            </div>
        </div>
    );
};

export default Home;
