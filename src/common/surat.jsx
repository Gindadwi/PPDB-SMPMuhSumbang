import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const DownloadSurat = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
  }, [userId]);

  const handleDownloadPDF = () => {
    if (!userData) return;

    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("helvetica");

    // Header
    doc.setFontSize(14);
    doc.setFont("Bold", "times");
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

    doc.setFont("courier", "normal"); // Gunakan font monospasi
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
    doc.text(
      "DITERIMA menjadi Peserta Didik Kelas ... pada tahun pelajaran " +
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

    // Simpan PDF
    doc.save("Surat_Pernyataan.pdf");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center gap-4 mt-36">
      <button
        onClick={handleDownloadPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadSurat;
