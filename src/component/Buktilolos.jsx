import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

const BuktiLolosPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        const fetchStatusData = async () => {
            const user = auth.currentUser; // Dapatkan pengguna yang sedang login
            if (user) {
                try {
                    // Ambil data pendaftaran berdasarkan UID pengguna
                    const response = await axios.get(
                        `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${user.uid}.json`
                    );

                    // Jika data ada, set userData
                    if (response.data) {
                        setUserData(response.data);
                    } else {
                        toast.error("Data pendaftaran tidak ditemukan.");
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    toast.error("Terjadi kesalahan saat memuat data.");
                }
            } else {
                toast.error("Silakan login terlebih dahulu.");
            }
            setLoading(false);
        };

        fetchStatusData();
    }, [auth]);

    if (loading) {
        return <p>Memuat data...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Pengumuman Seleksi</h1>
                {userData ? (
                    <div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <p className="font-medium">Nama Lengkap :</p>
                                <p>{userData.nama}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">NIK :</p>
                                <p>{userData.nik}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Alamat :</p>
                                <p>{userData.alamat}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium">Keterangan :</p>
                                <p className={`font-semibold ${userData.status === 'Lulus' ? 'text-green-500' : 'text-red-500'}`}>
                                    {userData.status}
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            {userData.status === 'di terima' ? (
                                <p className="text-green-600 font-bold text-xl">Selamat! Anda Lolos Seleksi 🎉</p>
                            ) : (
                                <p className="text-red-600 font-bold text-xl">Maaf, Anda tidak lulus.</p>
                            )}
                        </div>

                        <div className="flex justify-center gap-5 mt-8">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Bukti Lolos</button>
                            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400">Rincian Pembayaran</button>
                        </div>
                    </div>
                ) : (
                    <p>Data tidak ditemukan.</p>
                )}
            </div>
        </div>
    );
};

export default BuktiLolosPage;
