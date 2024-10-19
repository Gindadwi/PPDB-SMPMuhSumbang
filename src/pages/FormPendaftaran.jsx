import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const FormPendaftaran = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [step, setStep] = useState(1);
    const [uploadedFiles, setUploadFiles] = useState({
        kk: null,
        skhun: null,
        akta: null,
        KIP: null,
        sertifikat: null,
    });

    const nextStep = () => setStep(step + 1);

    const prevStep = () => setStep (step - 1);


    const handleFileChange = (e) => {
        setUploadFiles({
            ...uploadedFiles ({
                [e.target.name]: e.target.files[0]
            })
        })
    }

    return (
        <div className='mb-14 my-20 px-4 sm:px-6'>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <h1 className='text-[18px] font-outfit font-semibold text-center'>
                    Form Pendaftaran Siswa Baru
                </h1>
                <h1 className='text-[12px] font-poppins font-normal text-center'>
                    Isi semua form yang ada di bawah ini jangan sampai terlewat.
                    Kami membutuhkan data anda yang valid.
                </h1>
            </div>

            <form className='relative max-w-[1080px] mx-auto mt-8'>
              {step === 1 && (
              <>
                {/* Input Nama Lengkap */}
                <div className='grid grid-cols-1 gap-4'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium font-outfit'>Nama Lengkap</label>
                        <input type="text"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='Masukkan nama lengkap' />
                    </div>
                </div>

                {/* Input Tempat Lahir dan Tanggal Lahir */}
                <div className='grid grid-cols-1 gap-4 mt-5'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium font-outfit'>Tempat Lahir</label>
                        <input type="text"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='Tempat lahir' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium font-outfit'>Tanggal Lahir</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)} // Handler untuk mengubah tanggal
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Tanggal lahir"
                            className='w-full border border-black rounded-md p-2 font-outfit'
                        />
                    </div>
                </div>

                {/* Alamat */}
                <div className='grid grid-cols-1 gap-4 mt-5'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium font-outfit'>Alamat</label>
                        <input type="text"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='Masukkan alamat lengkap' />
                    </div>
                </div>

                {/* NIK */}
                <div className='grid grid-cols-1 gap-4 mt-5'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium font-outfit'>NIK</label>
                        <input type="text"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='Masukan NIk' />
                    </div>
                </div>


                {/* Asal Sekolah */}
                <div className='grid grid-cols-1 gap-4 mt-5'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium font-outfit'>Asal Sekolah</label>
                        <input type="text"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='Masukan Asal Sekolah' />
                    </div>
                </div>


                {/* Nilai Ujian */}
                <div className='mt-5'>
                    <label className='font-medium font-outfit' >Nilai Ujian Sekolah</label>
                    <div className='grid grid-cols-3 gap-2 '>
                        <input type="Number"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='IPA' />

                        <input type="Number"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='B.Indo' />
                        <input type="Number"
                            className='border border-black rounded-md p-2 font-outfit'
                            placeholder='MTK' />
                    </div>
                </div>

                        {/* Button Next */}
                        <div className='mt-8 grid grid-cols-3'>
                            <button
                                type="button"
                                onClick={nextStep}
                                className='bg-warnaUtama text-white px-4 py-2 font-outfit font-medium rounded-md'>
                                Next
                            </button>
                        </div>
              </>
              )}

            {step === 2 && (
                <>
                        {/* Step 2: Upload Berkas */}
                        <div className='grid grid-cols-1 gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit text-[14px]'>Upload Kartu Keluarga (KK)</label>
                                <input type="file"
                                    name="kk"
                                    onChange={handleFileChange}
                                    className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit text-[14px]'>Upload SKHUN</label>
                                <input type="file"
                                    name="skhun"
                                    onChange={handleFileChange}
                                    className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit text-[14px]'>Upload Akta Kelahiran</label>
                                <input type="file"
                                    name="akta"
                                    onChange={handleFileChange}
                                    className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' />
                            </div>
                        </div>

                        {/* Buttons Prev and Submit */}
                        <div className='mt-8 flex justify-between'>
                            <button
                                type="button"
                                onClick={prevStep}
                                className='bg-warnaUtama text-white font-outfit font-medium px-4 py-2 rounded-md'>
                                Previous
                            </button>

                            <button
                                type="submit"
                                className='bg-green-700 text-white font-outfit font-medium px-4 py-2 rounded-md'>
                                Submit
                            </button>
                        </div>                
                </>
            )}





            </form>
        </div>
    );
}

export default FormPendaftaran;
