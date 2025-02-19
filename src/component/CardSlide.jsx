import React, { useEffect, useRef, useState } from "react";
import Card from "../common/card";
import axios from "axios";
import Slider from "react-slick";
import arrow from "../assets/arrow.png";
import { Modal } from "flowbite-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlide = () => {
  // State untuk menyimpan data dari API
  const [data, setData] = useState([]);
  // State untuk menyimpan item yang dipilih
  const [selectedItem, setSelectedItem] = useState(null);
  // State untuk mengontrol tampilan modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Ref untuk mengontrol slider
  const sliderRef = useRef(null);

  // useEffect untuk mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/Prestasi.json"
        );

        // Mengubah object menjadi array
        const fetchedData = Object.values(response.data);
        setData(fetchedData);
      } catch (error) {
        console.log("error mengambil data json", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menampilkan modal
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  // Konfigurasi slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    // Responsive slider
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1080, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
      { breakpoint: 720, settings: { slidesToShow: 1.4, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1.3, slidesToScroll: 1 } },
      { breakpoint: 360, settings: { slidesToShow: 1.2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="relative px-4 lg:px-14 w-full max-w-[1180px] 2xl:max-w-[1444px] overflow-hidden">
      {/* Slider untuk menampilkan data */}
      <Slider ref={sliderRef} {...settings}>
        {data.map((item, index) => (
          <div className="p-2" key={index}>
            <Card
              image={item.image}
              title={item.title}
              paragraf={item.paragraf}
              onClick={() => handleOpenModal(item)}
            />
          </div>
        ))}
      </Slider>

      {/* Tombol panah */}
      <button
        className="absolute top-1/2 left-0 lg:left-[10px] transform -translate-y-1/2 hidden lg:block rotate-180"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <img src={arrow} alt="Previous" className="w-[25px] 2xl:w-[35px]" />
      </button>
      <button
        className="absolute top-1/2 right-0 lg:right-[10px] transform -translate-y-1/2 hidden lg:block"
        onClick={() => sliderRef.current.slickNext()}
      >
        <img src={arrow} alt="Next" className="w-[25px] 2xl:w-[35px]" />
      </button>

      {/* Modal */}
      {/* <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Detail Prestasi</Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div className="space-y-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold">{selectedItem.title}</h3>
              <p className="text-gray-600">{selectedItem.paragraf}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleCloseModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tutup
          </button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default CardSlide;
