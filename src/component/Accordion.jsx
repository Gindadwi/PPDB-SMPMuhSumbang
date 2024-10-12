import React, { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'; // Ikon panah
import { useState } from 'react'
import axios from 'axios';

const Accordion = () => {

    const [activeIndex, setActiveIdex] = useState(null)
    const [faqs, setFaqs] = useState([]) //State Untuk menyimpn data FAQ
    const [showAll, setShowAll] = useState (false); //state untuk membuat fungsi button pertanyaan lainya
    const itemShow = 4; //jumlah faq yang di tampilkan pertanya 


    useEffect (() => {
      const fetchData = async() => {
       try {
         const response = await axios.get('https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/FAQ.json');
         const data = response.data;
         const formattedFaqs = Object.keys(data).map(key => data[key]); //membuat data menjadi array
         setFaqs(formattedFaqs);
       } catch (error) {
        console.log('error mengambil data', error)
       }
      };

      fetchData();
    }, []);


    // membuat fungsi toogle accordion
  const toggleAccordion = (index) => {
    if(activeIndex === index){
      setActiveIdex(null); //fungsi jika metutup acordion jika di klik lagi
    }else{
      setActiveIdex(index) // buka acordion yang baru di klik
    }
  }

  //Membuat fungsi button untuk menampilkan semua question
  const handleShowMore = () => {
    setShowAll(!showAll)
  }

  return (
    <div className='max-w-[1080px] w-full mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
          {faqs.slice(0, showAll ? faqs.length : itemShow).map((faq, index) => (
            <div
            key={index}
            className='bg-white shadow-md rounded-md p-4 border-b-2 border-black cursor-pointer hover:shadow-lg transition-transform duration-300'
            onClick={() => toggleAccordion(index)}
            >
            <div className='flex flex-row gap-5 justify-between items-center'>
              <p className='text-gray-800 font-normal font-outfit text-[16px] lg:text-[20px]'>{faq.question}</p>
              <div className='border-2 border-black rounded-md'>
                  <FiArrowRight className={` w-8 m-1 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-90' : ''}`} />
              </div>
            </div>
            {/* Menampilkan jawaban FAQ */}
            {activeIndex === index && (
                <div className='mt-3 text-gray-600 font-poppins text-[12px] lg:text-[16px] overflow-hidden transition-all duration-500'
                  style={{ maxHeight: activeIndex === index ? '500px' : '0' }}
                  >
                  <p>{faq.answer}</p>
              </div>
            )}
            </div>
          ))}
        </div>

      <div className="text-center mt-6">
        <button 
        onClick={handleShowMore}
        className="px-4 py-2 border border-warnaUtama text-warnaUtama rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300">
          {showAll ? 'Tampilkan Lebih sedikit' : 'Pertanyaan lainya'}
        </button>
      </div>
    </div>
  )
}

export default Accordion;
