import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

const CourseSlider = ({ courses = DEFAULT_COURSES }: { courses?: Course[] }) => {

  return (
    <div>
      {/* Main slider container */}
      <div className="w-full max-w-8xl">
        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            className=" overflow-hidden shadow-2xl"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <SlideContent course={course} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
};

interface SlideContentProps {
  course: Course;
}

const SlideContent = ({ course }: SlideContentProps) => {
  const navigate = useNavigate()
  return (
    <div className="h-96 sm:h-[500px] lg:h-[550px] w-full relative overflow-hidden">
     
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('${course.image}')`,
          backgroundAttachment: 'fixed',
        }}
      />

    
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/60 via-cyan-700/55 to-pink-800/70" />

    
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent  to-transparent " />

    
      <div className="absolute inset-0 flex flex-col justify-center ml-4 md:ml-[42px]  p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-2xl animate-fade-in">
       
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-bold text-white leading-tight text-balance">
            {course.title}
          </h2>

      
          <p className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed">
            {course.description}
          </p>

        
          <div className="pt-4 md:pt-8">
            <button onClick={()=> navigate("/courses")} className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold hover:shadow-2xl hover:scale-110 transition-all duration-300">
              Explore Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const DEFAULT_COURSES: Course[] = [
  {
    id: '1',
    title: 'Master Web Development',
    description:
      'Build modern, responsive websites with React, Next.js, and Tailwind CSS. Learn full-stack development and deploy production-ready applications.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Advanced AI & Machine Learning',
    description:
      'Dive into artificial intelligence and neural networks. Build intelligent systems and deploy AI models that solve real-world problems.',
    image: 'https://images.unsplash.com/photo-1677442d019e157395c63e78b8b3f4d5?w=1200&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description:
      'Create stunning user experiences and beautiful interfaces. Master design principles and become a world-class designer.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Cloud Computing & DevOps',
    description:
      'Master AWS, Azure, and Google Cloud. Learn containerization and CI/CD pipelines for modern cloud-native development.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Data Science Bootcamp',
    description:
      'Transform raw data into actionable insights. Master data analysis, visualization, and predictive analytics with Python.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  },
];

export default CourseSlider;
