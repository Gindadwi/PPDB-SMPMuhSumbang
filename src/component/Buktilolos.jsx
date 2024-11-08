import React from 'react';
import { jsPDF } from 'jspdf';
import Button from '../common/Button'

const AnnouncementPage = ({ }) => {

    const student = {
        name: "Ginda Dwi Pamungkas",
        nik: "1234567890123456",
        address: "Jl. Contoh Alamat, Yogyakarta",
        status: "Lulus" // atau "Tidak Lulus"
    };


    const downloadSuratLolos = () => {
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text('SMP Muhammadiyah Sumbang', 35, 20);
        doc.text('DINAS PENDIDIKAN DAN KEBUDAYAAN', 45, 28);
        doc.text('DEMO E-UJIAN', 85, 36);
        doc.text('Alamat:', 15, 46);

        doc.setFontSize(16);
        doc.text('SURAT KETERANGAN LULUS', 80, 60);
        doc.setFontSize(12);
        doc.text('No Surat : 421/200/SDN1/2023', 85, 68);

        // Detail Peserta
        doc.text('Yang bertandatangan di bawah ini, Kepala Demo E-Ujian, menerangkan dengan sesungguhnya bahwa:', 15, 80);
        doc.text(`Nama Peserta Didik      : ${student.name}`, 15, 90);
        doc.text(`Tempat, Tanggal Lahir  : ${student.birthPlace}, ${student.birthDate}`, 15, 100);
        doc.text(`Nomor Induk Siswa Nasional : ${student.nisn}`, 15, 110);
        doc.text(`Jurusan                     : ${student.major}`, 15, 120);

        // Pernyataan Kelulusan
        doc.text('Berdasarkan hasil keputusan Rapat Pleno Kelulusan Dewan Guru, Demo E-Ujian pada tanggal 15 Mei 2023,', 15, 130);
        doc.text('maka siswa yang bersangkutan dinyatakan', 15, 140);
        doc.setFontSize(16);
        doc.text('LULUS', 95, 150);

        // Penutup
        doc.setFontSize(12);
        doc.text('Demikian surat keterangan ini dibuat dengan sebenarnya untuk digunakan sebagaimana mestinya', 15, 160);
        doc.text('Bantul, 29 Mei 2023', 15, 180);
        doc.text('Kepala Demo E-Ujian', 15, 190);

        // Tanda Tangan
        doc.text(student.headName, 15, 210);
        doc.text(student.headNIP, 15, 220);

        // Unduh PDF
        doc.save("Surat_Keterangan_Lulus.pdf");
    };

    const downloadTagihanPembayaran = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('SMP Muhammadiyah Sumbang', 35, 20);
        doc.text('Tagihan Pembayaran Pendaftaran', 50, 30);

        // Detail Tagihan
        doc.setFontSize(12);
        doc.text(`Nama Peserta Didik : ${student.name}`, 15, 50);
        doc.text(`NIK                : ${student.nik}`, 15, 60);
        doc.text(`Jurusan            : ${student.major}`, 15, 70);

        doc.setFontSize(14);
        doc.text('Rincian Pembayaran:', 15, 90);
        doc.setFontSize(12);
        doc.text('1. Biaya Pendaftaran: Rp500,000', 15, 100);
        doc.text('2. Biaya Seragam    : Rp300,000', 15, 110);
        doc.text('3. Biaya Buku       : Rp200,000', 15, 120);
        doc.text('-----------------------------------', 15, 130);
        doc.text('Total: Rp1,000,000', 15, 140);

        // Penutup
        doc.text('Silakan melakukan pembayaran sesuai dengan rincian di atas.', 15, 160);
        doc.text('Terima kasih.', 15, 170);

        // Unduh PDF
        doc.save("Tagihan_Pembayaran.pdf");
    };

    return (
        <div className="min-h-screen  flex items-center lg:justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4 lg:max-w-xl w-full">
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <h1 className="text-xl lg:text-[24px] font-poppins font-medium text-center">Pengumuman Kelulusan</h1>
                    <div className='bg-black w-64 lg:w-72 h-1 text-center flex justify-center items-center border-1 border-black'></div>
                </div>

                <div className="mt-8">
                    <p className="text-lg font-poppins font-medium">Nama Lengkap:</p>
                    <p className="text-gray-700 font-poppins font-normal">{student.name}</p>
                </div>

                <div className="mt-4">
                    <p className="text-lg font-poppins font-medium">NIK:</p>
                    <p className="text-gray-700 font-poppins font-normal">{student.nik}</p>
                </div>

                <div className="mt-4">
                    <p className="text-lg font-poppins font-medium">Alamat:</p>
                    <p className="text-gray-700 font-poppins font-normal">{student.address}</p>
                </div>

                <div className="mt-4">
                    <p className="text-lg font-semibold">Status:</p>
                    <p className={`font-bold font-poppins text-xl ${student.status === 'Lulus' ? 'text-green-600' : 'text-red-600'}`}>
                        {student.status}
                    </p>
                </div>

                <div className="mt-8 text-center">
                    {student.status === 'Lulus' ? (
                        <>
                            <p className="text-green-600 font-semibold text-lg">Selamat! Anda Lolos Seleksi 🎉</p>
                            <div className="mt-6 flex flex-col lg:flex-row gap-2 w-full items-center justify-center">
                                <Button
                                 name='Bukti Lolos'
                                 className={`bg-blue-500 p-2 w-full h-11 rounded-md text-white font-poppins font-medium`}
                                />
                                <Button
                                 name='Rincian Pembayaran'
                                 className={`bg-green-500 p-2 w-full h-11 rounded-md text-white font-poppins font-medium`}
                                />
                            </div>
                        </>
                    ) : (
                        <p className="text-red-600 font-semibold text-lg">Maaf, Anda Tidak Lolos Seleksi.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPage;
