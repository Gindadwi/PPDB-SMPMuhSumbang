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
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
        <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8">
          <h1 className="text-center font-semibold text-xl text-red-500">
            {error}
          </h1>
          <p className="text-center text-gray-600 mt-4">
            Silakan lakukan pendaftaran terlebih dahulu.
          </p>
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/form-pendaftaran")}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("helvetica");

    // Header
    doc.setFontSize(14);
    doc.setFont("Bold");
    doc.text("SMP MUHAMMADIYAH SUMBANG", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("KECAMATAN SUMBANG KABUPATEN BANYUMAS", 105, 22, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(
      "Dusun I, Karangcegak, Kec. Sumbang, Kabupaten Banyumas, Jawa Tengah 53183",
      105,
      28,
      { align: "center" }
    );
    doc.line(20, 32, 190, 32);

    // Judul
    doc.setFontSize(13);
    doc.setFont("helvetica", "semibold");
    doc.text("SURAT PERNYATAAN DITERIMA", 105, 40, { align: "center" });
    doc.setFontSize(12);
    doc.text("MENJADI SISWA KELAS VII TAHUN PELAJARAN 2024/2025", 105, 48, {
      align: "center",
    });

    // ISI SURAT
    let y = 63; // Posisi awal untuk isi surat
    const labelX = 30; // Posisi x untuk label
    const valueX = 70; // Posisi x untuk nilai (agar titik dua sejajar)

    doc.setFont("Poppins", "normal"); // Gunakan font monospasi
    doc.setFontSize(11);
    doc.text("Nama Lengkap", labelX, y);
    doc.text(`: ${userData.nama}`, valueX, y); // Nilai dimulai setelah titik dua
    y += 8;
    doc.text("NIK", labelX, y);
    doc.text(`: ${userData.nik}`, valueX, y);
    y += 8;
    doc.text("Alamat", labelX, y);
    doc.text(`: ${userData.alamat}`, valueX, y);
    y += 8;
    doc.text("Status", labelX, y);
    doc.text(`: ${userData.status}`, valueX, y);
    y += 20; // Jarak tambahan sebelum bagian "DITERIMA"

    // Tulisan DITERIMA menjadi Peserta Didik Kelas ...
    doc.setFont("times", "bold");
    doc.setFontSize("12");
    doc.text(
      "DITERIMA menjadi Peserta Didik Kelas VII pada tahun pelajaran " +
        userData.tahunPelajaran,
      doc.internal.pageSize.getWidth() / 2,
      y,
      { align: "center" }
    );
    y += 30; // Jarak lebih besar untuk elemen selanjutnya

    // Tanggal dan Tanda Tangan
    doc.setFont("times", "normal");
    doc.text(`Sumbang, ${userData.tanggal}`, 140, 124);
    doc.text("Kepala Sekolah", 140, 130);
    doc.text("(Abdul Ma'arif S.Pd)", 140, 150);
    doc.text(`NIP. 12345678`, 140, 157);

    // Catatan
    y = +200;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Catatan:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text(
      `- Daftar ulang dilaksanakan tanggal ${userData.daftarUlangStart} s.d. ${userData.daftarUlangEnd}`,
      20,
      y
    );
    y += 10;
    doc.text(
      "- Apabila pada tanggal tersebut tidak melakukan daftar ulang, maka dianggap mengundurkan diri.",
      20,
      y,
      { maxWidth: 170 }
    );
    y += 10;

    doc.save(`Surat_Keterangan_${userData.nama}.pdf`);
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
