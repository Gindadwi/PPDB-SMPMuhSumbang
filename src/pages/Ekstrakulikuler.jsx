import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Ekstrakulikuler = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgCard, setImgCard] = useState([]);

    const images = [
        "/src/assets/bg-InformasiD.jpg",
        "/src/assets/bg-dekstop.png",
        "/src/assets/bg-InformasiD.jpg",
        "/src/assets/bg-dekstop.png",
        "/docs/images/carousel/carousel-5.svg",
    ];

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };


    useEffect (() => {
        const fectData = async() => {
            try {
                const response = await axios.get('https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/eksul.json');
                const data = response.data;
                const imagecard = Object.keys(data).map(key => data[key]);
                setImgCard(imagecard);
            
            } catch (error) {
                console.log('error fect data', error)
            }
        }

        fectData();
    }, []);

    return (
        <div className='flex justify-center'>
            <div className='p-6 max-w-[1080px]'>
                <div className='flex justify-center rounded-lg'>
                    <div id="controls-carousel" className="relative max-w-[1080px] mt-12 w-full rounded-lg">
                        {/* Carousel wrapper */}
                        <div className="overflow-hidden relative h-48 lg:h-auto md:h-96">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {images.map((image, index) => (
                                    <div key={index} className="min-w-full rounded-lg">
                                        <img
                                            src={image}
                                            alt={`Carousel item ${index + 1}`}
                                            className="w-full h-48 lg:h-auto object-cover  rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slider controls */}
                        <button
                            type="button"
                            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onClick={goToPrev}
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button
                            type="button"
                            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onClick={goToNext}
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>

                        {/* Slider indicators */}
                        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-white'}`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='font-poppins mt-8 lg:text-center'>
                    <h1 className='font-semibold text-[24px] lg:text-[32px]'>Ekstrakulikuler</h1>
                    <p className='font-normal text-[18px] lg:text-[24px]'>SMP Muhammadiyah Sumbang</p>
                </div>

                <div className="lg:flex-row flex flex-col gap-2 max-w-[1080px] mt-2">
                    {imgCard.map((card, index) => (
                        <div key={index} className=' bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
                            <a href="#">
                                <img className="rounded-t-lg" src={card.Image} alt="Blog" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {card.Title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal  text-gray-700 dark:text-gray-400">
                                    {card.deskripsi}
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Read more
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                   
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Ekstrakulikuler;
