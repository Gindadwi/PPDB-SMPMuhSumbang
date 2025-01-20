import React from "react";
import LogoSMP from "../assets/LogoSMP.png";

const TentangKami = () => {
  //Membuat array Misi Sekolah
  const Misi = [
    "MENUMBUHKAN SEMANGAT BERPRESTASI SECARA INTENSIF KEPADA WARGA SEKOLAH",
    "MENUMBUHKAN PENGHAYATAN DAN PENGAMALAN TERHADAP AJARAN AGAMA ISLAM MELALUI PEMBELAJARAN TARTILI, TADARUS AL QURAN DAN SHOLAT JAMAAH DI SEKOLAH.",
    "MENUMBUHKAN SEMANGAT DISIPLIN DALAM SEGALA ASPEK.",
    "MENDORONG SISWA UNTUK MENINGKATKAN KETERAMPILAN BERBAHASA INGGRIS.",
    "MENDORONG SISWA UNTUK MENGENALI POTENSI DIRI DAN MENINGKATKAN KRETIFITAS DALAM SENI, OLAHRAGA, PRAMUKA DAN KESEHATAN (PMR). MENINGKATKAN PEMBELAJARAN EVEKTIF, TUNTAS MINIMAL TERCAPAI DENGAN KELULUSAN 100%",
  ];

  return (
    <div className="mt-28 flex justify-center items-center px-4 mb-5 2xl:mt-32">
      <div className="lg:max-w-[780px] 2xl:max-w-[1080px] flex flex-col items-center">
        <div className="flex  justify-between lg:max-w-[1440px] w-full space-b items-center ">
          <div className="flex flex-col gap-2">
            <h1 className="font-poppins font-semibold text-[24px] lg:text-[34px] 2xl:text-[44px]">
              Profil Sekolah
            </h1>
            <p className="text-[16px] lg:text-[26px] 2xl:text-[36px] font-poppins">
              SMP Muhammadiyah Sumbang
            </p>
          </div>
          <img src={LogoSMP} className="w-[120px] lg:w-[200px] 2xl:w-[300px]" />
        </div>
        <div>
          <p className="text-justify text-[12px] lg:text-[18px] 2xl:text-[28px] mt-5 font-poppins">
            SMP Muhammadiyah Sumbang merupakan salah satu sekolah jenjang SMP
            berstatus Swasta yang berada di wilayah Kec. Sumbang, Kab. Banyumas,
            Jawa Tengah. SMP Muhammadiyah Sumbang didirikan pada tanggal 3 Juni
            1998 dengan Nomor SK Pendirian 0302/103/1/1998 yang berada dalam
            naungan Kementerian Pendidikan dan Kebudayaan. Sekolah ini berada di
            bawah naungan Muhammadiyah, salah satu organisasi Islam terbesar di
            Indonesia, dan bertujuan untuk memberikan pendidikan dasar yang
            berkualitas dengan mengintegrasikan ilmu pengetahuan umum dan
            pendidikan agama Islam.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center font-poppins mt-9 px-2 text-[12px] lg:text-[18px]">
          <div className="w-full lg:max-w-[1080px]">
            <div className="grid grid-cols-2 py-2">
              <p className="text-left 2xl:text-[28px]">Nama Sekolah</p>
              <p className="font-semibold 2xl:text-[28px]">
                SMP Muhammadiyah Sumbang
              </p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left 2xl:text-[28px]">Alamat</p>
              <p className="font-semibold 2xl:text-[28px]">
                Dusun I, Karangcegak, Kec. Sumbang, Kabupaten Banyumas, Jawa
                Tengah 53183
              </p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left 2xl:text-[28px]">Akreditasi</p>
              <p className="font-semibold">A</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left 2xl:text-[28px]">Nomor SK Pendirian</p>
              <p className="font-semibold 2xl:text-[28px]">
                SK Pendirian 0302/103/I/1998
              </p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left 2xl:text-[28px]">Status</p>
              <p className="font-semibold 2xl:text-[28px]">Swasta</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left 2xl:text-[28px]">Tgl SK Pendirian</p>
              <p className="font-semibold 2xl:text-[28px]">3 Juni 1998</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full text-center">
          <h1 className="text-2xl font-poppins font-medium 2xl:text-[34px] 2xl:mt-5">
            Visi Misi
          </h1>
          <p className="text-sm lg:text-lg 2xl:text-2xl font-poppins">
            SMP Muhammadiyah Sumbang
          </p>
          <hr />
          <div className="text-left px-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-poppins font-medium mt-5 2xl:text-[34px] 2xl:mt-5">
                Visi
              </h3>
              <p className="text-justify 2xl:text-2xl">
                UNGGUL DALAM PRESTASI, LUHUR DALAM BUDI PEKERTI BERDASARKAN IMAN
                DAN TAQWA
              </p>
            </div>
          </div>

          <div className="text-left px-4">
            <h3 className="text-xl font-poppins font-medium mt-5 2xl:text-[34px] 2xl:mt-5">
              Misi
            </h3>

            <ul className="list-decimal text-justify list-inside flex flex-col gap-2 2xl:text-2xl">
              {Misi.map((misi, index) => (
                <li key={index}>{misi}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TentangKami;
