import React, { useState, useEffect } from 'react';
import { LuCircleChevronRight, LuCircleChevronLeft } from "react-icons/lu";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Homepage = () => {
    const images = [
        '/assets/images/food1.svg',
        '/assets/images/food2.svg',
        '/assets/images/food3.svg',
        '/assets/images/food4.svg',
        '/assets/images/food5.svg',
    ];
    const titles = ['Food 1', 'Food 2', 'Food 3', 'Food 4', 'Food 5'];
    const descriptions = [
        'Delicious food with amazing flavors that will tantalize your taste buds. Each bite brings a burst of delightful spices and fresh ingredients, carefully selected to create a harmonious balance of taste and texture.',
        'Fresh and healthy ingredients to enjoy in every meal. Packed with nutrients and vitamins, this dish is perfect for anyone looking to indulge in a wholesome, yet delicious, experience. A great choice for those who prioritize their well-being.',
        'Exquisite taste and perfect balance come together in this dish. With a fusion of flavors, each component enhances the other to provide a memorable dining experience. The harmony of textures and tastes will leave you wanting more.',
        'A treat for your senses, full of flavor and vibrant colors. Every element in this dish is carefully crafted to offer a satisfying and indulgent meal. Perfectly cooked, rich in aroma, and with an unforgettable taste.',
        'Satisfy your cravings with this tasty dish that combines the best of both worlds – savory and sweet, light and hearty. The diverse flavors come together beautifully, offering a delicious solution to all your hunger pangs.'
    ];

    const [rotation, setRotation] = useState(55);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [radius, setRadius] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const totalImages = images.length;
    const angleStep = 360 / totalImages;

    const getRadius = (width) => {
        if (width >= 1024) return 400;
        if (width >= 768) return 300;
        return 200;
    };

    const rotateLeft = () => {
        setRotation(prev => (prev - angleStep + 360) % 360);
        setCurrentIndex(prev => (prev - 1 + totalImages) % totalImages);
    };

    const rotateRight = () => {
        setRotation(prev => (prev + angleStep) % 360);
        setCurrentIndex(prev => (prev + 1) % totalImages);
    };

    useEffect(() => {
        AOS.init({ duration: 1000, easing: 'ease-in-out' });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // trigger render
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // initial

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setRadius(getRadius(windowWidth));
    }, [windowWidth]); // whenever windowWidth changes, update radius

    return (
        <div className="w-full h-screen overflow-hidden relative">
            {/* bg section */}
            <div className="absolute z-[-10] flex flex-col md:flex-row w-full h-screen">
                <div className="bg-[#F28A38] md:w-1/2 md:h-screen w-full h-[50vh]"></div>
                <div className="bg-gradient-to-r from-[#24252b] to-[#10121a] md:w-1/2 md:h-screen w-full h-[50vh]"></div>
            </div>

            {/* Heading title and description */}
            <div className="flex flex-col">
                <div className="flex md:flex-row flex-col justify-center items-center md:items-start text-center h-[50vh] md:h-[50vh]">
                    <h1 className="text-center font-gochi lg:text-9xl md:text-7xl text-white md:items-start text-4xl w-1/2 md:p-20 p-10 md:text-end flex-grow" data-aos="fade-right">
                        Food <br /> Slider !
                    </h1>
                    <div className="w-1/2 text-white md:text-start md:p-20 md:space-y-10 space-y-5 flex-grow" data-aos="fade-left">
                        <h1 className="md:text-5xl transition-all duration-500 md:text-left">{titles[currentIndex]}</h1>
                        <p className='transition-all md:text-left duration-500 text-[12px] md:text-md'>{descriptions[currentIndex]}</p>
                        <button className="bg-[#F28A38] border-[1px] border-white border-b-4 shadow-lg/30 hover:scale-125 transition-all duration-400 shadow-[#F28A38] p-2 rounded-2xl text-[#10121a]">
                            check it!!
                        </button>
                    </div>
                </div>

                {/* ปุ่มหมุน */}
                <div className='absolute flex z-30 w-full top-1/2' data-aos="fade-up">
                    <div className='flex flex-row items-center w-full justify-center lg:space-x-200 md:space-x-100 space-x-50'>
                        <LuCircleChevronLeft size={50} color='white' onClick={rotateLeft} className="cursor-pointer hover:scale-125 transition-all duration-300" />
                        <LuCircleChevronRight size={50} color='white' onClick={rotateRight} className="cursor-pointer hover:scale-125 transition-all duration-300" />
                    </div>
                </div>

                {/* วงกลม + รูป */}
                <div className="relative h-full flex justify-center items-center" data-aos="fade-up">
                    <div className="w-full lg:w-1/2 md:h-screen h-[50vh] md:mt-[10%] mt-[50%] rounded-full border-2 border-white border-dashed flex justify-center items-center relative">
                        {images.map((img, index) => {
                            const angle = (index * angleStep + rotation) % 360;
                            const x = radius * Math.cos((angle * Math.PI) / 180);
                            const y = radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`image-${index}`}
                                    className="absolute w-40 md:w-80 h-40 md:h-80 rounded-full object-cover border-2 border-white transition-all duration-1000"
                                    style={{ transform: `translate(${x}px, ${y}px)` }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
