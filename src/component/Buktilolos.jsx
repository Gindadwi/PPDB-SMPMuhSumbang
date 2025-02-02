import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const BuktiLolosPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Data ID tidak bisa ditemukan");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${userId}.json`
        );

        if (response.data) {
          setUserData(response.data);
        } else {
          setError("Data tidak ditemukan.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const renderStatusMessage = () => {
    if (userData.status === "Pending") {
      return (
        <p className="text-blue-600 font-bold text-xl 2xl:text-3xl">
          Anda masih dalam tahap seleksi.
        </p>
      );
    } else if (userData.status === "Di Terima") {
      return (
        <p className="text-green-600 font-bold text-xl 2xl:text-3xl">
          Selamat! Anda Lolos Seleksi 🎉
        </p>
      );
    } else if (userData.status === "Di Tolak") {
      return (
        <p className="text-red-600 font-bold text-xl 2xl:text-3xl">
          Maaf, Anda tidak lulus.
        </p>
      );
    }
    return <p>Status belum diperbarui.</p>;
  };

  const handlePembayaran = () => {
    navigate("/pembayaran");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SURAT KETERANGAN DITERIMA", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(
      `Yang bertanda tangan di bawah ini, Kepala Sekolah SMP Muhammadiyah Sumbang,`,
      20,
      40
    );
    doc.text("dengan ini menyatakan bahwa:", 20, 50);

    doc.setFontSize(12);
    doc.text(`Nama        : ${userData.nama}`, 20, 70);
    doc.text(`NIK         : ${userData.nik}`, 20, 80);
    doc.text(`Alamat      : ${userData.alamat}`, 20, 90);

    doc.text(
      `Telah diterima sebagai siswa baru di SMP Muhammadiyah Sumbang`,
      20,
      110
    );
    doc.text("untuk Tahun Ajaran 2024/2025 pada kelas VII (Tujuh).", 20, 120);

    doc.text(
      "Demikian surat keterangan ini dibuat untuk dapat digunakan sebagaimana mestinya.",
      20,
      140
    );

    doc.text("Sumbang, [Tanggal Surat]", 20, 160);
    doc.text("Kepala Sekolah,", 20, 180);
    doc.text("Abdul Ma'arif S.Pd", 20, 200);

    doc.save("Surat_Keterangan_Diterima.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg max-w-xl  w-full p-8  2xl:max-w-4xl 2xl:p-12">
        <div class="text-center mb-8 font-poppins">
          <h1 class="font-semibold text-xl 2xl:text-4xl">
            Pengumuman Kelulusan
          </h1>
          <div class="border-b-4 border-black w-44 xl:w-72 2xl:border-b-8 mx-auto mt-2"></div>
        </div>

        {userData ? (
          <div>
            <div className="space-y-3 2xl:space-y-9">
              <div className="flex gap-6 font-poppins ">
                <div>
                  <p className="font-semibold font-poppins text-lg 2xl:text-4xl">
                    Nama Lengkap:
                  </p>
                  <p className="font-poppins text-lg 2xl:text-3xl">
                    {userData.nama}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 font-poppins">
                <div>
                  <p className="font-semibold font-poppins text-lg 2xl:text-4xl">
                    NIK:
                  </p>
                  <p className="font-poppins text-lg 2xl:text-3xl">
                    {userData.nik}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 font-poppins">
                <div>
                  <p className="font-semibold font-poppins text-lg 2xl:text-4xl">
                    Alamat:
                  </p>
                  <p className="font-poppins text-lg 2xl:text-3xl">
                    {userData.alamat}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 font-poppins">
                <div>
                  <p className="font-semibold font-poppins text-lg 2xl:text-4xl">
                    Status:
                  </p>
                  <p
                    className={`font-semibold text-lg 2xl:text-3xl ${
                      userData.status === "Di Terima"
                        ? "text-green-500"
                        : userData.status === "Pending"
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {userData.status || "Status belum diperbarui"}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 xl:text-3xl">
              {renderStatusMessage()}
            </div>

            {userData.status === "Di Terima" ? (
              <div className="flex flex-col lg:flex lg:flex-row justify-center gap-5 mt-8">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-warnaUtama text-white px-16 py-2 rounded-md hover:bg-blue-600 font-outfit text-base 2xl:text-3xl 2xl:py-4"
                >
                  Bukti Lolos
                </button>
                <button
                  onClick={handlePembayaran}
                  className="bg-green-600 px-6 py-2 rounded-md hover:bg-gray-400 font-outfit text-base text-white 2xl:text-3xl 2xl:py-4"
                >
                  Rincian Pembayaran
                </button>
              </div>
            ) : (
              <p className="text-red-500 text-center font-semibold mt-6"></p>
            )}
          </div>
        ) : (
          <p>Data tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default BuktiLolosPage;
