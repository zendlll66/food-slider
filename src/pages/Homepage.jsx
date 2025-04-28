import React, { useState } from 'react';
import { LuCircleChevronRight, LuCircleChevronLeft } from "react-icons/lu";
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const Homepage = () => {
    const images = [
        '/assets/images/food1.svg',
        '/assets/images/food2.svg',
        '/assets/images/food3.svg',
        '/assets/images/food4.svg',
        '/assets/images/food5.svg',
    ];

    const titles = [
        'Food 1', 'Food 2', 'Food 3', 'Food 4', 'Food 5'
    ];

    const descriptions = [
        'Delicious food with amazing flavors that will tantalize your taste buds. Each bite brings a burst of delightful spices and fresh ingredients, carefully selected to create a harmonious balance of taste and texture.',
        'Fresh and healthy ingredients to enjoy in every meal. Packed with nutrients and vitamins, this dish is perfect for anyone looking to indulge in a wholesome, yet delicious, experience. A great choice for those who prioritize their well-being.',
        'Exquisite taste and perfect balance come together in this dish. With a fusion of flavors, each component enhances the other to provide a memorable dining experience. The harmony of textures and tastes will leave you wanting more.',
        'A treat for your senses, full of flavor and vibrant colors. Every element in this dish is carefully crafted to offer a satisfying and indulgent meal. Perfectly cooked, rich in aroma, and with an unforgettable taste.',
        'Satisfy your cravings with this tasty dish that combines the best of both worlds – savory and sweet, light and hearty. The diverse flavors come together beautifully, offering a delicious solution to all your hunger pangs.'
    ];


    const [rotation, setRotation] = useState(55); // state เก็บหมุนกี่องศา
    const [currentIndex, setCurrentIndex] = useState(0); // state สำหรับ index ของภาพที่หมุนอยู่
    const totalImages = images.length;
    const angleStep = 360 / totalImages; // ขนาดมุมแต่ละภาพ

    const rotateLeft = () => {
        setRotation((prev) => {
            const newRotation = (prev - angleStep + 360) % 360;
            const newIndex = (currentIndex - 1 + totalImages) % totalImages;
            setCurrentIndex(newIndex); // อัปเดต index
            return newRotation;
        });
    };

    const rotateRight = () => {
        setRotation((prev) => {
            const newRotation = (prev + angleStep) % 360;
            const newIndex = (currentIndex + 1) % totalImages;
            setCurrentIndex(newIndex); // อัปเดต index
            return newRotation;
        });
    };

    // เรียกใช้ AOS.init() เพื่อเริ่มใช้งาน AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // ความเร็วในการแอนิเมชัน
            easing: 'ease-in-out', // รูปแบบการเคลื่อนไหว
        });
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden relative">
            {/* bg section */}
            <div className="absolute z-[-10] flex flex-row w-full h-screen">
                <div className="bg-[#F28A38] w-1/2 h-screen"></div>
                <div className="bg-gradient-to-r from-[#24252b] to-[#10121a] w-1/2 h-screen"></div>
            </div>

            {/* Heading title and description */}
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <h1 className="font-gochi text-9xl w-1/2 p-20 text-end" data-aos="fade-right">
                        Food <br /> Slider !
                    </h1>

                    <div className="w-1/2 text-white p-20 space-y-10 " data-aos="fade-left">
                        <h1 className="text-5xl transition-all duration-500">{titles[currentIndex]}</h1>
                        <p className='transition-all duration-500'>{descriptions[currentIndex]}</p>
                        <button className="bg-[#F28A38] border-[1px] border-white border-b-4 shadow-lg/30 hover:scale-125 transition-all duration-400 shadow-[#F28A38] p-2 rounded-2xl text-[#10121a]">
                            check it!!
                        </button>
                    </div>
                </div>

                {/* ปุ่มหมุน */}
                <div className='absolute flex z-30 w-full top-1/2' data-aos="fade-up">
                    <div className='flex flex-row items-center w-full justify-center space-x-300'>
                        <LuCircleChevronLeft size={50} color='white' onClick={rotateLeft} className="cursor-pointer hover:scale-125 transition-all duration-300" />
                        <LuCircleChevronRight size={50} color='white' onClick={rotateRight} className="cursor-pointer hover:scale-125 transition-all duration-300" />
                    </div>
                </div>

                {/* วงกลม + รูป */}
                <div className="relative flex justify-center items-center mt-50" data-aos="fade-up">
                    <div className="w-1/2 h-screen rounded-full border-2 border-white border-dashed flex justify-center items-center relative">
                        {/* map รูป */}
                        {images.map((img, index) => {
                            const total = images.length;
                            const angle = (index * angleStep + rotation) % 360; // คำนวณมุมให้กลับไปที่ 0 เมื่อครบ 360 องศา
                            const radius = 500; // ปรับขนาดวงกลมเล็กลง
                            const x = radius * Math.cos((angle * Math.PI) / 180);
                            const y = radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`image-${index}`}
                                    className="absolute w-80 h-80 rounded-full object-cover border-2 border-white transition-all duration-1000"
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`,
                                    }}
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
