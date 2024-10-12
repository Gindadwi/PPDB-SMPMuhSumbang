import React from 'react'
import AboutSMp from '../assets/AboutSMp.png'


const About = () => {
    return (
        <div>

            <div className='flex bg-AboutFooter items-center justify-center py-5 lg:py-10 w-full '>

                <div className='flex flex-col lg:flex lg:flex-row-reverse items-center justify-center lg:px-0 text-white w-full max-w-[1080px] text-left mx-auto'>

                    <img src={AboutSMp} alt="" className='w-80 lg:w-[550px]' />
                    <div className='text-left px-4 flex flex-col items-left justify-center mt-3'>
                        <h1 className='text-white text-[24px] lg:text-[32px] font-poppins font-semibold'>SMP Muhammadiyah Sumbang</h1>
                        <p className='font-poppins text-white font-normal lg:font-light text-[12px] lg:text-[16px] mt-3'>SMP Muhammadiyah Sumbang merupakan salah satu sekolah jenjang SMP berstatus Swasta yang berada di wilayah Kec. Sumbang, Kab. Banyumas, Jawa Tengah. SMP Muhammadiyah Sumbang didirikan pada tanggal 3 Juni 1998 dengan Nomor SK Pendirian  0302/103/1/1998 yang berada dalam naungan Kementerian Pendidikan dan Kebudayaan.  Sekolah ini berada di bawah naungan Muhammadiyah, salah satu organisasi Islam  terbesar di Indonesia, dan bertujuan untuk memberikan
                            pendidikan dasar yang berkualitas dengan mengintegrasikan ilmu pengetahuan umum  dan pendidikan agama Islam.</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default About
