'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CourseCard from './CourseCard';
import { fetchCourses } from '@/utils/api';
import Loader from './Loader';

export default function CourseList() {
    const { data, error, isLoading } = useQuery('courses', fetchCourses);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(data?.products || []);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm.length === 0) {
            setFilteredCourses(data?.products);
        } else {
            const filtered = data?.products?.filter((course: any) =>
                course?.title?.toLowerCase()?.includes(debouncedSearchTerm?.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    }, [debouncedSearchTerm, data]);

    if (isLoading) return  <Loader isLoading={true}/>;
    if (error) return <p>Error loading courses</p>;

    return (
        <div className="flex flex-col my-12 w-full">
            <div className="flex items-center justify-between max-md:flex-col max-md:items-start w-full gap-4">
                <h1 className="text-3xl font-bold">Course List</h1>
                <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded max-md:w-full w-2/5"
                />
            </div>
            <div className="my-8 pt-8 border-t">
                {filteredCourses?.length > 0 ? (
                    <span className="text-[22px] font-bold">
                        Found {filteredCourses.length} Products
                    </span>
                ) : (
                    <span className="text-[22px] font-bold">No Products Found</span>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-3">
                {filteredCourses?.map((course: any) => (
                    <CourseCard key={course?.id} course={course} />
                ))}
            </div>
        </div>
    );
}
