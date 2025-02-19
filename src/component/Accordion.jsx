import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi"; // Ikon panah
import { useState } from "react";
import axios from "axios";

const Accordion = () => {
  const [activeIndex, setActiveIdex] = useState(null); // Menyimpan indeks pertanyaan yang aktif
  const [faqs, setFaqs] = useState([]); // Menyimpan data FAQ yang diambil dari API
  const [showAll, setShowAll] = useState(false); // Menentukan apakah semua pertanyaan ditampilkan atau tidak
  const itemShow = 4; // Jumlah pertanyaan yang ditampilkan secara default

  useEffect(() => {
    // Mengambil data FAQ dari API ketika komponen pertama kali dimuat
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/FAQ.json"
        );
        const data = response.data;
        const formattedFaqs = Object.keys(data).map((key) => data[key]); // Mengubah objek data menjadi array
        setFaqs(formattedFaqs);
      } catch (error) {
        console.log("error mengambil data", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk membuka dan menutup accordion
  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIdex(null); // Menutup accordion jika sudah terbuka
    } else {
      setActiveIdex(index); // Membuka accordion yang diklik
    }
  };

  // Fungsi untuk menampilkan semua pertanyaan
  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="max-w-[1080px] 2xl:max-w-[1440px] 2xl:px-10 w-full mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Menampilkan pertanyaan FAQ sesuai jumlah yang ditentukan */}
        {faqs.slice(0, showAll ? faqs.length : itemShow).map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 border-b-2 border-black cursor-pointer hover:shadow-lg transition-transform duration-300"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex flex-row gap-5 justify-between items-center">
              <p className="text-gray-800 font-normal font-outfit text-[16px] lg:text-[20px] 2xl:text-[30px]">
                {faq.question}
              </p>
              <div className="border-2 border-black rounded-md">
                <FiArrowRight
                  className={` w-8 m-1 transform transition-transform duration-300 2xl:w-14 2xl:h-7 ${
                    activeIndex === index ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>
            {/* Menampilkan jawaban FAQ jika accordion aktif */}
            {activeIndex === index && (
              <div
                className="mt-3 text-gray-600 font-poppins text-[12px] lg:text-[16px] 2xl:text-[24px] overflow-hidden transition-all duration-500"
                style={{ maxHeight: activeIndex === index ? "500px" : "0" }}
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tombol untuk menampilkan lebih banyak atau lebih sedikit pertanyaan */}
      <div className="text-center mt-6">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 2xl:text-2xl 2xl:py-4 border border-warnaUtama text-warnaUtama rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300"
        >
          {showAll ? "Tampilkan Lebih sedikit" : "Pertanyaan lainnya"}
        </button>
      </div>
    </div>
  );
};

export default Accordion;
