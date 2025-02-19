import React, { useEffect, useState } from "react"; // Import React dan hooks useEffect, useState
import { Bar } from "react-chartjs-2"; // Import komponen Bar dari Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios"; // Import axios untuk melakukan request ke API

// Registrasi komponen yang diperlukan untuk Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GrafikPendaftaran = () => {
  const [pendaftaranPerHari, setPendaftaranPerHari] = useState([]); // State untuk menyimpan jumlah pendaftaran per hari

  useEffect(() => {
    // Fungsi untuk mengambil data dari API Firebase
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftar.json"
        );
        const data = response.data;

        // Ambil tanggal hari ini
        const today = new Date();

        // Buat array yang berisi tanggal 7 hari terakhir dalam format YYYY-MM-DD
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        });

        // Hitung jumlah pendaftar untuk setiap hari dalam 7 hari terakhir
        const pendaftaranCounts = last7Days.map((date) => {
          return Object.values(data).filter(
            (item) => item.tanggal_daftar.startsWith(date) // Filter data yang sesuai dengan tanggal tertentu
          ).length;
        });

        setPendaftaranPerHari(pendaftaranCounts.reverse()); // Urutkan dari hari paling awal ke hari terbaru
      } catch (error) {
        console.error("Error fetching data:", error); // Tangani error jika request gagal
      }
    };

    fetchData(); // Panggil fungsi untuk mengambil data
  }, []); // useEffect dijalankan sekali saat komponen pertama kali dimuat

  // Buat label untuk 7 hari terakhir (sen, sel, rab, dll.)
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString("id-ID", { weekday: "short" }); // Format hari singkat dalam bahasa Indonesia
  });

  // Data yang akan ditampilkan dalam grafik
  const data = {
    labels, // Label sumbu X (hari)
    datasets: [
      {
        label: "Jumlah Pendaftaran", // Nama dataset
        data: pendaftaranPerHari, // Data jumlah pendaftaran per hari
        backgroundColor: "#0D3B66", // Warna batang grafik
      },
    ],
  };

  // Konfigurasi opsi untuk Chart.js
  const options = {
    responsive: true, // Grafik menyesuaikan ukuran layar
    plugins: {
      legend: {
        position: "top", // Posisi legenda di atas grafik
      },
      title: {
        display: true,
        text: "Grafik Pendaftaran", // Judul grafik
      },
    },
  };

  return <Bar data={data} options={options} />; // Render grafik batang menggunakan Chart.js
};

export default GrafikPendaftaran; // Ekspor komponen agar bisa digunakan di tempat lain
