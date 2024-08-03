import Image from "next/image";
import Link from "next/link";

type Course = {
    id: number;
    title: string;
    brand: string;
    images: string[];
    category: string;
    price: number;
};

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="border flex flex-col gap-2 rounded-md items-center justify-around p-5">
            <Image src={course.images[0]} alt={course.title} width={300} height={300} loading="lazy" className="course-image" />
            <div className="flex flex-col gap-1">
                <span className="text-xl font-semibold">{course.title}</span>
                <p>Instructor: {course.brand}</p>
                <p>Level: {course.category}</p>
                <p>Duration: {course.price} hours</p>
            </div>
            <Link href={`/product/${course.id}`} className="border w-full text-center my-2 py-1">
                View Details
            </Link>
        </div>
    );
}
