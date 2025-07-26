import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

// CRITICAL STEP: Ensure the GSAP plugin is registered.
// Best practice is to do this ONCE in your main app entry file (e.g., main.jsx).

const categoriesData = [
  { title: 'USA', count: '1,258', iconPath: 'M10.25 4.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5zM7.75 6.25a.75.75 0 110-1.5.75.75 0 010 1.5zM5.25 4.75a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0v-1.5zM9.5 9.75a.75.75 0 100-1.5H6.25a.75.75 0 100 1.5h3.25zM4.5 9A.75.75 0 015.25 8h.25a.75.75 0 110 1.5H6a.75.75 0 110-1.5h.25a.75.75 0 110 1.5h.25a.75.75 0 110-1.5h.25a.75.75 0 110 1.5H8a.75.75 0 110-1.5h.25a.75.75 0 110 1.5h.25a.75.75 0 110-1.5h.25a.75.75 0 110 1.5h.25a.75.75 0 110-1.5H10a.75.75 0 110-1.5h.25a.75.75 0 110 1.5H11a.75.75 0 110-1.5h.25a.75.75 0 110 1.5H12a.75.75 0 110-1.5h.25a.75.75 0 110 1.5h.25a.75.75 0 110-1.5h.25a.75.75 0 110-1.5H15a.75.75 0 110 1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5H14a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5h-.25a.75.75 0 110-1.5H9.5a.75.75 0 110-1.5H6.25a.75.75 0 110-1.5H4.5A2.25 2.25 0 002.25 4v10.5A2.25 2.25 0 004.5 17h11a2.25 2.25 0 002.25-2.25V7.5A2.25 2.25 0 0015.5 5h-1a.75.75 0 01-.75-.75V3a.75.75 0 01.75-.75h1A2.25 2.25 0 0117.75 4v1.5a.75.75 0 101.5 0V4A3.75 3.75 0 0015.5 1h-1a2.25 2.25 0 00-2.25 2.25v1.25a.75.75 0 101.5 0V3.75a.75.75 0 01.75-.75h1a.75.75 0 01.75.75v3.75A2.25 2.25 0 0115.25 10h-1.5a.75.75 0 000 1.5h1.5A2.25 2.25 0 0117.5 14h-1.5a.75.75 0 000 1.5h1.5a.75.75 0 01.75.75v.25a2.25 2.25 0 01-2.25 2.25H4.5A3.75 3.75 0 01.75 14.5V4A2.25 2.25 0 013 2.25h1.5a.75.75 0 100-1.5H3A3.75 3.75 0 00-.75 4v10.5A3.75 3.75 0 003 18.25h14A3.75 3.75 0 0020.75 14.5V7.5A3.75 3.75 0 0017 3.75h-1.75a.75.75 0 100 1.5h1.75a2.25 2.25 0 012.25 2.25V14.5a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75V4a.75.75 0 01.75-.75h1.5z', color: 'text-blue-500' },
  { title: 'UK', count: '1,018', iconPath: 'M15.21 4.439a.75.75 0 011.06 1.06l-6.25 6.25a.75.75 0 01-1.06 0L4.21 7.009a.75.75 0 011.06-1.06l3.97 3.97 5.97-5.97z M8.97 18.21a.75.75 0 00-1.06-1.06l-3.25 3.25a.75.75 0 001.06 1.06l3.25-3.25z', color: 'text-green-500' },
  { title: 'Switzerland', count: '314', iconPath: 'M8.75 4.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V4.75z M12.25 5.5a.75.75 0 01.75-.75h3.25a.75.75 0 010 1.5H13v3.25a.75.75 0 01-1.5 0V6.25h-.25a.75.75 0 01-.75-.75zM15.5 12.75a.75.75 0 100-1.5H4.25a.75.75 0 100 1.5h11.25z', color: 'text-yellow-500' },
  { title: 'Sweden', count: '1,717', iconPath: 'M4.75 5.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75zM4.75 8.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75zM4.75 11.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75zM4.75 14.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75z', color: 'text-purple-500' },
  { title: 'Norway', count: '1,044', iconPath: 'M5.25 6.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 7a.75.75 0 100-1.5.75.75 0 000 1.5zM10 6.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.5 7a.75.75 0 100-1.5.75.75 0 000 1.5zM15.25 6.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM5.5 11a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 10.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM10.5 11a.75.75 0 100-1.5.75.75 0 000 1.5zM13.25 10.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z', color: 'text-red-500' },
  { title: 'Germany', count: '55', iconPath: 'M4.75 4.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V4.75z M7.75 5.5a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-2.5v8.5a.75.75 0 01-1.5 0v-8.5h-2.5a.75.75 0 01-.75-.75z', color: 'text-teal-500' },
  { title: 'Poland', count: '1,303', iconPath: 'M8.75 6.75a.75.75 0 00-1.5 0v8.5a.75.75 0 001.5 0v-8.5zM12 4.75a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V5.5a.75.75 0 01.75-.75zM5.5 9.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H6.25a.75.75 0 01-.75-.75z', color: 'text-orange-500' },
  { title: 'Malaysia', count: '438', iconPath: 'M4.75 7.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM8.5 4.75a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V5.5a.75.75 0 01.75-.75zM12.25 6.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5zM16 8.75a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z', color: 'text-pink-500' },
  { title: 'Singapure', count: '809', iconPath: 'M14.75 4.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM11.75 6.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8.75 4.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6.5 9a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.5 11a.75.75 0 100-1.5H6.25a.75.75 0 100 1.5h3.25zM4.5 12a.75.75 0 100-1.5H3.75a.75.75 0 100 1.5h.75zM17.25 10.5a.75.75 0 100 1.5h.75a.75.75 0 100-1.5h-.75z', color: 'text-lime-600' },
  { title: 'Bangladesh', count: '1,609', iconPath: 'M4.75 7.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75zM4.75 10.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75zM4.75 13.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.5a.75.75 0 01-.75-.75z', color: 'text-orange-400' },
];

const CourseCategories = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Use gsap.from() for a more concise animation.
    // It animates FROM the specified values TO the element's default state in the CSS.
    // We removed the 'opacity-0' class from the JSX for this reason.
    gsap.from(containerRef.current.querySelector('.animated-title'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 2,
      ease: 'power3.out',
    });

    gsap.from(containerRef.current.querySelectorAll('.category-card'), {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 3,
      stagger: 0.1,
      ease: 'power3.out',
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#F0FDF4] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="animated-title text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Explore 5,500+ Scholarships
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categoriesData.map((category) => (
            // We removed 'opacity-0' here. GSAP now controls the initial state.
            <div key={category.title} className="category-card">
              <div className="bg-white rounded-2xl shadow-sm p-4 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg h-full flex flex-col justify-center items-center">
                <div className={`mb-3 inline-block p-3 rounded-lg bg-opacity-10 ${category.color.replace('text-', 'bg-')}`}>
                  <svg className={`w-8 h-8 ${category.color}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d={category.iconPath}></path>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 leading-tight">{category.title}</h3>
                <a href="#" className="flex items-center justify-center mt-2 text-sm text-gray-500 group hover:text-blue-600">
                  {category.count} Shcolarships
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;