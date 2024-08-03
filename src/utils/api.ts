export const fetchCourses = async () => {
    const res = await fetch('https://dummyjson.com/products/');
    return res.json();
  };