import { useEffect, useState } from 'react';

import image1 from '../assets/img1.png'
import image2 from '../assets/img2.png'
import image3 from '../assets/img3.png'


export const Carousel = () => {
    const images = [image1, image2, image3];  
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="w-full h-[350px] relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="flex-shrink-0 w-full h-full" key={index}>
                        <img src={image} className="block w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};
