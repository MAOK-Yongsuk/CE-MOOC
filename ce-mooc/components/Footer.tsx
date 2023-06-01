// components/Footer.tsx

const Footer = () => {
     const year = new Date().getFullYear();
     return (
         <footer>
             <p>&copy; {year} CE MOOC. All rights reserved.</p>
             <style jsx>{`
                 footer {
                     padding: 1em;
                     text-align: center;
                     margin-top: 2em;
                     border-top: 1px solid #ddd;
                 }
             `}</style>
         </footer>
     );
 };
 
 export default Footer;
 