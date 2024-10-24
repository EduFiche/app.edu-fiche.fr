"use client";
import AddCourseCard from "./_components/add-course-card";
import CourseCard from "./_components/card-courses";
import { courses } from "@prisma/client";

export default function Page() {
  const courses: courses[] = [];

  if (courses.length === 0) {
    return <AddCourseCard />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((c) => (
        <CourseCard key={c.id} courses={c} />
      ))}
      <AddCourseCard />
    </div>
  );
}
