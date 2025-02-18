import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Dikdasmen from "../assets/dikdasmen.png";

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
    doc.setFont("times", "normal");

    // Tambahkan logo pada kop surat
    const logo = new Image();
    logo.src = Dikdasmen; // Ganti dengan path ke file logo Anda
    doc.addImage(logo, "PNG", 18, 10, 33, 33); // Atur posisi dan ukuran logo

    // Header
    doc.setFontSize(10);
    doc.text("MUHAMMADIYAH MAJELIS DIKDASMEN DAN PNF", 120, 15, {
      align: "center",
    });
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("SMP MUHAMMADIYAH SUMBANG", 120, 22, { align: "center" });
    doc.setFontSize(12);
    doc.text('TERAKREDITASI "A"', 120, 28, { align: "center" });
    doc.setFontSize(10);
    doc.text(
      "NPSN: 20301870, Alamat: Jl. Raya Karangcegak Kec. Sumbang, Kab. Banyumas",
      120,
      34,
      { align: "center" }
    );
    doc.text(
      "Kode Pos 53183, Telp: (0281) 6455684, Email: smpmuhammadiyahsumbang@gmail.com",
      120,
      40,
      { align: "center" }
    );
    doc.line(20, 44, 190, 44);

    // Judul Surat
    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("SURAT KETERANGAN", 105, 52, { align: "center" });
    doc.setFontSize(11);
    doc.text("No. 420/__/VI/2024", 105, 58, { align: "center" });

    // Isi Surat
    let y = 70; // Posisi awal untuk isi surat
    const labelX = 30; // Posisi x untuk label
    const valueX = 80; // Posisi x untuk nilai (agar titik dua sejajar)

    doc.setFont("times", "normal");
    doc.setFontSize(11);
    doc.text("Yang bertanda tangan di bawah ini adalah:", 30, y);
    y += 10;
    doc.text("Nama Lengkap", labelX, y);
    doc.text(`: Abdul Ma'arif, S.Pd`, valueX, y);
    y += 8;
    doc.text("Nomor Induk Karyawan", labelX, y);
    doc.text(": 830267 071 01 1.40", valueX, y);
    y += 8;
    doc.text("Jabatan Dinas", labelX, y);
    doc.text(": Kepala SMP Muhammadiyah Sumbang", valueX, y);
    y += 15;

    doc.text("Menerangkan bahwa:", 30, y);
    y += 10;
    doc.text("Nama Siswa", labelX, y);
    doc.text(`: ${userData.nama}`, valueX, y);
    y += 8;
    doc.text("Tempat, Tanggal Lahir", labelX, y);
    doc.text(`: ${userData.tempatLahir}, ${userData.tanggalLahir}`, valueX, y);
    y += 8;
    doc.text("NIK", labelX, y);
    doc.text(`: ${userData.nik}`, valueX, y);
    y += 8;
    doc.text("Sekolah Asal", labelX, y);
    doc.text(`: ${userData.asalSekolah}`, valueX, y);
    y += 15;

    const isiSurat =
      "Siswa atas nama tersebut di atas telah mendaftar sebagai calon Peserta didik baru SMP Muhammadiyah Sumbang, dan telah melakukan verifikasi administrasi dan tes akademik sesuai ketentuan yang berlaku. Dengan demikian dinyatakan Diterima Sebagai Peserta Didik Baru Kelas VII (Tujuh) SMP Muhammadiyah Sumbang Tahun Pelajaran 2024/2025.";

    doc.setFont("times", "normal");
    doc.text(isiSurat, 30, y, { maxWidth: 150, align: "justify" });
    y += 35;

    doc.text(
      "Demikian Surat Keterangan ini kami sampaikan, untuk bisa digunakan oleh yang bersangkutan sesuai mestinya dengan penuh tanggung jawab.",
      30,
      y,
      {
        maxWidth: 150,
        align: "justify",
      }
    );
    y += 20;

    // Tanggal dan Tanda Tangan

    const tanggalSurat = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Ganti bagian ini:
    doc.text(`Sumbang, ${tanggalSurat}`, 140, y);
    y += 6;
    doc.text("Kepala SMP Muhammadiyah Sumbang", 140, y);
    y += 30;
    doc.text("(Abdul Ma'arif, S.Pd)", 140, y);
    y += 6;
    doc.text("NIK: 830267 071 01 1.40", 140, y);

    // Simpan PDF
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
                  <p className="font-semibold font-poppins text-base lg:text-lg 2xl:text-4xl">
                    Nama Lengkap:
                  </p>
                  <p className="font-poppins text-base lg:text-lg 2xl:text-3xl">
                    {userData.nama}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 font-poppins">
                <div>
                  <p className="font-semibold font-poppins text-base lg:text-lg 2xl:text-4xl">
                    NIK:
                  </p>
                  <p className="font-poppins text-base lg:text-lg 2xl:text-3xl">
                    {userData.nik}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 font-poppins">
                <div>
                  <p className="font-semibold font-poppins text-base lg:text-lg 2xl:text-4xl">
                    Alamat:
                  </p>
                  <p className="font-poppins text-base lg:text-lg 2xl:text-3xl">
                    {userData.alamat}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 font-poppins">
                <div>
                  <p className="font-semibold font-poppins text-base lg:text-lg 2xl:text-4xl">
                    Status:
                  </p>
                  <p
                    className={`font-semibold text-base lg:text-lg 2xl:text-3xl ${
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
