import React from "react";
import LogoSMP from "../assets/LogoSMP.png";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini
  return (
    <div className="bg-warnaUtama w-full py-6">
      <div className="px-4 w-full max-w-[1024px] 2xl:max-w-[1440px] mx-auto pb-5 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-10 lg:items-center lg:justify-center">
        <div>
          <img src={LogoSMP} alt="" className="w-28 lg:w-36 2xl:42px" />
          <div>
            <h1 className="text-white font-outfit font-semibold text-base lg:text-xl 2xl:text-[30px]">
              SMP Muhammadiyah Sumbang
            </h1>
            <p className="text-white font-poppins text-[15px] font-light lg:text-[18px] 2xl:text-[22px]">
              Dusun I, Karangcegak, Kec. Sumbang, Kabupaten Banyumas, Jawa
              Tengah 53183
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 lg:gap-20 xl:gap-32 lg:text-left lg:justify-center lg:flex">
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-poppins text-[20px] lg:text-[22px] 2xl:text-[30px] font-semibold">
              Navigasi
            </h1>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Beranda
            </a>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              FAQ
            </a>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Ekstrakulikuler
            </a>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Daftar
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-white font-poppins text-[20px] lg:text-[22px] 2xl:text-[30px] font-semibold">
              Sosial Media
            </h1>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Instagram
            </a>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Facebook
            </a>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Twiter
            </a>
            <a
              className="text-white font-poppins text-[14px] lg:text-[18px] 2xl:text-[22px] font-extralight"
              href=""
            >
              Tik Tok
            </a>
          </div>
        </div>
      </div>

      <div>
        {/* Garis horizontal putih */}
        <div className="border-t-2 border-white w-full mb-2"></div>
        {/* Teks copyright dengan tahun dinamis */}
        <p className="text-sm 2xl:text-2xl font-medium font-poppins text-white text-center">
          &copy; {currentYear} SMP Muhammadiyah Sumbang
        </p>
      </div>
    </div>
  );
};

export default Footer;
