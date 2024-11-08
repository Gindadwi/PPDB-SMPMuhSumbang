import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import axios from 'axios';

const FormPendaftaran = () => {
    const [nama, setNama] = useState('');
    const [tempatLahir, setTempatLahir] = useState('');
    const [namaOrtu, setNamaOrtu] = useState('');
    const [alamat, setAlamat] = useState('')
    const [noHP, setNoHP] = useState('');
    const [nik, setNik] = useState('');
    const [asalSekolah, setAsalSekolah] = useState('');
    const [nilaiIpa, setNilaiIpa] = useState('');
    const [nilaiMTK, setNilaiMTK] = useState('');
    const [nilaiBindo, setNilaiBindo] = useState('');
    const [total, setTotal] = useState('');
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

    const prevStep = () => setStep(step - 1);


    const handleFileChange = (e) => {
        setUploadFiles({
            ...uploadedFiles({
                [e.target.name]: e.target.files[0]
            })
        })
    }


    //Membuat fungsi form pendaftaran sekolah
    const handleDaftar = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://be-smp-muh-sumbang.vercel.app/pendaftaran', {
                nama: nama,
                tempat_lahir: tempatLahir,
                tanggal_lahir: selectedDate,
                nama_ortu: namaOrtu,
                alamat: alamat,
                no_hp: noHP,
                nik: nik,
                asal_sekolah: asalSekolah,
            })
            console.log(response.sata);
            toast.success('Berhasil melakukkan Pendaftar');

            // Kirim data nilai ke endpoint /nilai
            const responseNilai = await axios.post('https://be-smp-muh-sumbang.vercel.app/nilai', {
                nilai_IPA: nilaiIpa,
                nilai_Matematika: nilaiMTK,
                nilai_Bhs_Indonesia: nilaiBindo,
                rata_rata_nilai: total,
            });
            console.log(responseNilai.data);
        } catch (error) {
            console.log("error mengirim data", error)
        }
    }

    return (
        <div className='mb-14 my-20 px-4 sm:px-6'>
            <div className='flex flex-col pt-10 gap-1 justify-center items-center'>
                <h1 className='text-[18px] lg:text-[24px] font-outfit font-semibold text-center'>
                    Form Pendaftaran Siswa Baru
                </h1>
                <h1 className='text-[12px] lg:text-[16px] font-poppins font-normal text-center'>
                    Isi semua form yang ada di bawah ini jangan sampai terlewat.
                    Kami membutuhkan data anda yang valid.
                </h1>
            </div>

            <form onSubmit={handleDaftar} className='relative max-w-[720px] mx-auto mt-8'>
                {step === 1 && (
                    <>
                        {/* Input Nama Lengkap */}
                        <div className='grid grid-cols-1 gap-4'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Nama Lengkap</label>
                                <input type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Masukkan nama lengkap' />
                            </div>
                        </div>

                        {/* Input Tempat Lahir dan Tanggal Lahir */}
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Tempat Lahir</label>
                                <input type="text"
                                    value={tempatLahir}
                                    onChange={(e) => setTempatLahir(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Tempat lahir' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Tanggal Lahir</label>
                                <DatePicker
                                    type="date"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)} // Handler untuk mengubah tanggal
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Tanggal lahir"
                                    className='w-full border border-black rounded-md p-2 lg:p-3 font-outfit'
                                />
                            </div>
                        </div>

                        {/* Alamat */}
                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Alamat</label>
                                <input type="text"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Masukkan alamat lengkap' />
                            </div>
                        </div>

                        {/* NIK */}
                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>NIK</label>
                                <input type="number"
                                    value={nik}
                                    onChange={(e) => setNik(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Masukan NIk' />
                            </div>
                        </div>

                        {/* No HP */}
                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Nomor HP/WA</label>
                                <input type="tel"
                                    value={noHP}
                                    onChange={(e) => setNoHP(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Masukan NIk' />
                            </div>
                        </div>

                        {/* Nama Ortu */}
                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Nama Orangtua</label>
                                <input type="text"
                                    value={namaOrtu}
                                    onChange={(e) => setNamaOrtu(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Masukan NIk' />
                            </div>
                        </div>


                        {/* Asal Sekolah */}
                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit'>Asal Sekolah</label>
                                <input type="text"
                                    value={asalSekolah}
                                    onChange={(e) => setAsalSekolah(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Masukan Asal Sekolah' />
                            </div>
                        </div>


                        {/* Nilai Ujian */}
                        <div className='mt-5'>
                            <label className='font-medium font-outfit' >Nilai Ujian Sekolah</label>
                            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 '>
                                <input type="number"
                                    value={nilaiIpa}
                                    onChange={(e) => setNilaiIpa(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='IPA' />
                                <input type="number"
                                    value={nilaiBindo}
                                    onChange={(e) => setNilaiBindo(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='B.Indo' />
                                <input type="number"
                                    value={nilaiMTK}
                                    onChange={(e) => setNilaiMTK(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='MTK' />
                                <input type="number"
                                    value={total}
                                    onChange={(e) => setTotal(e.target.value)}
                                    className='border border-black rounded-md p-2 lg:p-3 font-outfit'
                                    placeholder='Total Nilai' />
                            </div>
                        </div>

                        {/* Button Next */}
                        <div className='mt-8 grid grid-cols-3'>
                            <button
                                type="button"
                                onClick={nextStep}
                                className='bg-warnaUtama text-white px-4 py-2 lg:py-3 lg:text-[18px] font-outfit font-medium rounded-md lg:hover:scale-105 transform duration-150'>
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

                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit text-[14px]'>kartu Indonesia Pintar (KIP) </label>
                                <input type="file"
                                    name="KIP"
                                    onChange={handleFileChange}
                                    className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-4 mt-5'>
                            <div className='flex flex-col w-full'>
                                <label className='font-medium font-outfit text-[14px]'>Sertifikat</label>
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
                                className='bg-warnaUtama text-white lg:text-[18px] lg:py-3 font-outfit font-medium px-4 py-2 rounded-md lg:hover:scale-105 transform duration-150'>
                                Previous
                            </button>

                            <button
                                type="submit"
                                className='bg-warnaUtama text-white lg:text-[18px] lg:py-3 font-outfit font-medium px-4 py-2 rounded-md lg:hover:scale-105 transform duration-150'>
                                Daftar
                            </button>
                        </div>
                    </>
                )}


            </form>
        </div>
    );
}

export default FormPendaftaran;
