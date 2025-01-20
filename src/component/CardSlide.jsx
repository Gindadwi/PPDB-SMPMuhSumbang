import React, { useEffect, useRef, useState } from "react";
import Card from "../common/card";
import axios from "axios";
import Slider from "react-slick";
import arrow from "../assets/arrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlide = () => {
  const [data, setData] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/Prestasi.json"
        );
        const fetchedData = Object.values(response.data); // Ubah objek menjadi array
        setData(fetchedData);
        console.log(fetchedData); // Memeriksa data
      } catch (error) {
        console.log("error mengambil data json", error);
      }
    };

    fetchData();
  }, []);

  // Setting responsive card slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440, // large desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1080, // desktop
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 720, // tablet
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480, // small mobile
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 360, // extra small mobile
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="relative px-4 lg:px-14 w-full max-w-[1180px] 2xl:max-w-[1444px]  overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {data &&
          data.map((item, index) => (
            <div className="p-2" key={index}>
              <Card
                image={item.image}
                title={item.title}
                paragraf={item.paragraf}
              />
            </div>
          ))}
      </Slider>

      {/* Tombol panah sebelumnya */}
      <button
        className="absolute top-1/2 left-0 lg:left-[10px] transform -translate-y-1/2 hidden lg:block rotate-180"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <img src={arrow} alt="Previous" className="w-[25px] 2xl:w-[35px]" />
      </button>

      {/* Tombol panah berikutnya */}
      <button
        className="absolute top-1/2 right-0 lg:right-[10px] transform -translate-y-1/2 hidden lg:block"
        onClick={() => sliderRef.current.slickNext()}
      >
        <img src={arrow} alt="Next" className="w-[25px] 2xl:w-[35px]" />
      </button>
    </div>
  );
};

export default CardSlide;
