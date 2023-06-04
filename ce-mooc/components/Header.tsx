// components/Header.tsx

import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <nav>
               <h2>
                    <Link href="/">CE MOOC</Link>
                    <Link href="/course">All Courses</Link>
                    <Link href="/register">Register</Link>
                    <Link href="/login">Login</Link>
                    {/* Add more links as needed */}
               </h2>               
            </nav>
            <style jsx>{`
                header {
                    padding: 1em;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #ddd;
                }
                nav a {
                    margin-right: 1em;
                }
            `}</style>
        </header>
    );
};

export default Header;