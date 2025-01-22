import React, { useState } from "react";

import Tabs from "../component/Tabs";

const InformasiPPDB = () => {
  return (
    <div className="bg-gray-100 mt-4">
      <div className="relative h-[290px] lg:h-[565px] pt-9 lg:pt-16 ">
        <div className="flex flex-col justify-center bg-cover bg-center  h-[252px] lg:h-[500px] w-full bg-imageInformasiM lg:bg-imageInformasiD">
          <div className="absolute inset-0 bg-black opacity-30 h-full w-full "></div>
          <div className="relative z-10 px-4 lg:px-0 text-white w-full max-w-[1080px] text-left mx-auto">
            <h1 className="text-base lg:text-4xl mt-28 font-poppins font-semibold">
              Informasi Pendaftaran Sekolah
            </h1>
            <div className="border border-b-2 border-white w-20 lg:w-44">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default InformasiPPDB;
