// app/course/[refcode]/page.tsx

interface Course {
  _Courses__title: string;
  _Courses__desc: string;
  _Courses__teacher: string;
}


export default async function Page({ params }: { params: { refcode: string } }) {
  const res = await fetch(`http://127.0.0.1:8000/courses/${params.refcode}`);
  const course: Course = await res.json();

  return (
      <div>
          <h1>{course._Courses__title}</h1>
          <p>{course._Courses__desc}</p>
          <p>{course._Courses__teacher}</p>
      </div>
  );
}