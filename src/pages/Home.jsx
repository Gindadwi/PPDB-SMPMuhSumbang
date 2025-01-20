import React from "react";
import Button from "../common/Button";
import Card from "../component/CardSlide";
import About from "../component/About";
import Accordion from "../component/Accordion";

const Home = () => {
  return (
    <div>
      <div>
        {/* Hero Menu */}
        <div className="relative h-[400px] lg:h-[565px]  pt-20 lg:pt-16 xl:pt-28">
          <div className="flex flex-col justify-center bg-cover bg-center  h-[260px] lg:h-[500px] w-full bg-imageMobile lg:bg-imageDekstop">
            <div className="absolute inset-0 bg-black opacity-80 h-full xl:h-full xl:mt-12 w-full "></div>
            <div className="relative z-10 px-4 lg:px-0 text-white w-full max-w-[1080px] text-left mx-auto">
              <h1 className="text-[24px] lg:text-[48px] font-bold mt-5 lg:mt-0">
                SMP Muhammadiyah Sumbang
              </h1>
              <p className="text-yellow-200 text-[12px] lg:text-[20px] lg:w-[800px] mt-2">
                SMP Muhammadiyah Sumbang berkomitmen untuk menciptakan generasi
                yang berakhlak mulia, cerdas, dan berdaya saing. Kami berusaha
                memberikan pendidikan yang berkualitas, mengedepankan
                nilai-nilai Islam, dan membentuk karakter siswa yang tangguh.
              </p>

              <div className="flex flex-col gap-3 mt-4 lg:flex-row lg:w-[400px]">
                <Button
                  className="w-full bg-warnaUtama text-white font-medium lg:text-[18px] lg:py-3"
                  name="Prestasi Kami"
                />
                <Button
                  className="w-full bg-white font-medium text-black lg:text-[18px] lg:py-3"
                  name="Contact Us"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Akhir Code Hero Menu */}
      </div>
      <div className="mt-10 items-center justify-center flex flex-col ">
        <div className="w-full text-left  max-w-[1080px] px-4 lg:px-0">
          <h1 className="font-outfit font-medium text-[24px] lg:text-[35px] text-black text-left">
            Prestasi Spemba
          </h1>
        </div>
        <Card />
      </div>

      <div>
        <About />
      </div>
      <div className="mt-5  items-center justify-center flex flex-col">
        <div className="w-full text-center justify-center flex  max-w-[1080px] px-4 lg:px-0">
          <h1 className="font-outfit font-medium text-[24px] lg:text-[35px] text-black text-center">
            Pertanyaan Umum
          </h1>
        </div>
        <Accordion />
      </div>

      <div></div>
    </div>
  );
};

export default Home;
