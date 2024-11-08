import React from 'react'
import LogoSMP from '../assets/LogoSMP.png';

const TentangKami = () => {

  //Membuat array Misi Sekolah
  const Misi = [
    'MENUMBUHKAN SEMANGAT BERPRESTASI SECARA INTENSIF KEPADA WARGA SEKOLAH',
    'MENUMBUHKAN PENGHAYATAN DAN PENGAMALAN TERHADAP AJARAN AGAMA ISLAM MELALUI PEMBELAJARAN TARTILI, TADARUS AL QURAN DAN SHOLAT JAMAAH DI SEKOLAH.',
    'MENUMBUHKAN SEMANGAT DISIPLIN DALAM SEGALA ASPEK.',
    'MENDORONG SISWA UNTUK MENINGKATKAN KETERAMPILAN BERBAHASA INGGRIS.',
    'MENDORONG SISWA UNTUK MENGENALI POTENSI DIRI DAN MENINGKATKAN KRETIFITAS DALAM SENI, OLAHRAGA, PRAMUKA DAN KESEHATAN (PMR). MENINGKATKAN PEMBELAJARAN EVEKTIF, TUNTAS MINIMAL TERCAPAI DENGAN KELULUSAN 100%',
  ];


  return (
    <div className='mt-28 flex justify-center items-center px-4 mb-5'>
      <div className='lg:max-w-[720px] flex flex-col items-center'>
        <h1 className='font-poppins font-semibold text-[24px]'>Profil Sekolah</h1>
        <p className='text-[20px] font-poppins'>SMP Muhammadiyah Sumbang</p>
        <img src={LogoSMP} className='w-[200px]' />
        <div>
          <p className='text-center text-[12px] lg:text-[18px] mt-5 font-poppins'>
            SMP Muhammadiyah Sumbang merupakan salah satu sekolah jenjang SMP berstatus Swasta yang berada di wilayah
            Kec. Sumbang, Kab. Banyumas, Jawa Tengah. SMP Muhammadiyah Sumbang didirikan pada tanggal 3 Juni 1998 dengan Nomor SK Pendirian
            0302/103/1/1998 yang berada dalam naungan Kementerian Pendidikan dan Kebudayaan.  Sekolah ini berada di bawah naungan Muhammadiyah, salah satu organisasi Islam  terbesar di Indonesia, dan bertujuan untuk memberikan pendidikan dasar yang berkualitas dengan mengintegrasikan ilmu pengetahuan umum  dan pendidikan agama Islam.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center font-poppins mt-9 px-2 text-[12px] lg:text-[18px]">
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-2 py-2">
              <p className="text-left">Nama Sekolah</p>
              <p>SMP Muhammadiyah Sumbang</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left">Alamat</p>
              <p>Dusun I, Karangcegak, Kec. Sumbang, Kabupaten Banyumas, Jawa Tengah 53183</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left">Akreditasi</p>
              <p>A</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left">Nomor SK Pendirian</p>
              <p>SK Pendirian 0302/103/I/1998</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left">Status</p>
              <p>Swasta</p>
            </div>
            <hr />

            <div className="grid grid-cols-2 py-2 mt-5">
              <p className="text-left">Tgl SK Pendirian</p>
              <p>3 Juni 1998</p>
            </div>
          </div>
        </div>

 
        <div className='mt-6 w-full text-center'>
          <h1 className='text-2xl font-poppins font-medium'>Visi Misi</h1>
          <p className='text-sm font-poppins'>SMP Muhammadiyah Sumbang</p>
          <hr />
          <div className='text-left px-4'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-poppins font-medium mt-5'>Visi</h3>
              <p>UNGGUL DALAM PRESTASI, LUHUR DALAM BUDI PEKERTI BERDASARKAN IMAN DAN TAQWA</p>
            </div>
          </div>

          <div className='text-left px-4'>
            <h3 className='text-xl font-poppins font-medium mt-5'>Misi</h3>
            
            <ul className='list-decimal list-inside flex flex-col gap-2'>
              {Misi.map ((misi, index) => (
                <li key={index}>{misi}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TentangKami
