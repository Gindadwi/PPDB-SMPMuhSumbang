import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Tabs = () => {
  // Membuat state untuk Tabs
  const [activeTabs, setActiveTabs] = useState("alur");
  const [informasiData, setInformasiData] = useState([]);
  const [isDataExists, setIsDataExists] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  // Cek apakah userId ada di localStorage
  const isLoggedIn = !!localStorage.getItem("userId");

  const syaratDokumen = [
    { label: "Pas Foto 3 X 4" },
    { label: "Foto Akta Kelahiran" },
    { label: "Foto SKHUN" },
    { label: "Foto Kartu Keluarga" },
    { label: "Foto KIP (jika ada)" },
    { label: "Foto Sertifikat (jika ada)" },
  ];

  // Pendaftaran
  const tahapPendaftaran = [
    {
      value: "1",
      judul: "Tahap Pertama",
      label: "cari informasi",
      listItems: [
        { list: "Masuk Ke website SMP Muhammadiyah Sumbang" },
        { list: "Check Persyaratan apa saja yang di butuhkan" },
      ],
    },
    {
      value: "2",
      judul: "Tahap Kedua",
      label: "Buat Akun Pendaftaran",
      listItems: [
        { list: "Lengkapi Form Pendaftaran" },
        { list: "Login dengan akun yang sudah dibuat" },
      ],
    },
    {
      value: "3",
      judul: "Tahap Ketiga",
      label: "Klik Tabs Pendaftaran & Pengumuman",
      listItems: [
        { list: "Klik Tombol Daftar" },
        { list: "Lengkapi Formulir pendaftaran" },
        { list: "Upload dokumen yang diperlukan" },
      ],
    },
    {
      value: "4",
      judul: "Tahap Keempat",
      label: "Cek Status Diterima/tidak",
      listItems: [
        { list: "Klik tabs pendaftaran & pengumuman" },
        { list: "Cek status" },
        { list: "Download rincian pembayaran" },
      ],
    },
  ];

  useEffect(() => {
    // Periksa status login pengguna
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe(); // Membersihkan listener
  }, [auth]);

  const fetchInformasiData = async () => {
    try {
      const response = await axios.get(
        "https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/InformasiPPDB.json"
      );
      const data = response.data;
      console.log("Data fetched from Firebase:", data); // Log data dari Firebase
      const InformasiPPDB = Object.keys(data).map((key) => data[key]);
      setInformasiData(InformasiPPDB);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInformasiData();
  }, []);

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-"); // Pisahkan string berdasarkan "-"
    return `${day}/${month}/${year}`; // Gabungkan kembali dalam format DD/MM/YYYY
  };

  const currentStatus = informasiData.length > 0 ? informasiData[0].status : "";
  // Fungsi untuk menangani klik tombol Daftar
  const handleDaftarClick = () => {
    if (isLoggedIn) {
      if (currentStatus === "Pendaftaran Di Buka") {
        navigate("/formpendaftaran"); // Arahkan ke halaman form pendaftaran
      } else {
        toast.error("Pendaftaran Belum dibuka.");
      }
    } else {
      toast.error("Silakan login terlebih dahulu.");
    }
  };

  const handleStatus = () => {
    if (isLoggedIn) {
      navigate("/status");
    } else {
      toast.error("Silakan login terlebih dahulu.");
    }
  };

  //untuk mengecek apakah data pendaftar dari user sudah ada
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser; // Mendapatkan user yang sedang terautentikasi
      if (user && user.uid) {
        // Memeriksa apakah user ada dan memiliki userId
        const userId = user.uid; // Mendapatkan userId dari objek user Firebase
        const url = `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${userId}.json`;

        try {
          const response = await axios.get(url); // Mengambil data dari Firebase
          if (response.data) {
            // Jika data ditemukan, setIsDataExists menjadi true
            setIsDataExists(true);
          }
        } catch (error) {
          console.error("Error fetching data: ", error); // Menangani error jika terjadi kesalahan saat mengambil data
        }
      }
    };

    fetchData(); // Memanggil fungsi fetchData
  }, [auth]); // Menambahkan auth sebagai dependensi agar effect dijalankan ketika status user berubah

  // kode berpindah ke halaman detail
  const handleDetail = () => {
    const user = auth.currentUser; // Mendapatkan user yang sedang terautentikasi

    // Cek apakah status pendaftaran sudah dibuka
    if (currentStatus === "Pendaftaran Di Buka") {
      if (user && user.uid) {
        navigate(`/detail/${user.uid}`); // Arahkan ke halaman detail berdasarkan userId
      }
    } else {
      toast.error("Pendaftaran belum dibuka."); // Tampilkan pesan error jika pendaftaran belum dibuka
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-5 w-full p-4 mt-2">
      <div className="container lg:max-w-[1080px] lg:w-full">
        {/* Membuat Tabs Header */}
        <div className="flex w-full items-center justify-center lg:gap-56">
          <button
            onClick={() => setActiveTabs("alur")}
            className={`py-2 text-sm lg:text-[18px] px-4 font-poppins font-medium ${
              activeTabs === "alur"
                ? "border-b-4 border-warnaUtama text-warnaUtama"
                : "text-black"
            }`}
          >
            Persyaratan & Alur Pendaftaran
          </button>
          <button
            onClick={() => setActiveTabs("informasi")}
            className={`py-2 px-4 text-sm lg:text-[18px] font-poppins font-medium ${
              activeTabs === "informasi"
                ? "border-b-4 border-warnaUtama text-warnaUtama"
                : "text-black"
            }`}
          >
            Pendaftaran & Pengumuman
          </button>
        </div>

        {/* Membuat Tabs Content */}
        <div>
          {activeTabs === "alur" && (
            <div className="space-y-4 text-left lg:px-20 mt-5">
              <h2 className="text-left lg:text-2xl font-medium">
                Persyaratan Pendaftaran
              </h2>
              <ul className="list-disc pl-5 text-black text-left text-sm lg:text-base font-poppins font-medium">
                {syaratDokumen.map((item, index) => (
                  <li key={index}>{item.label}</li>
                ))}
              </ul>

              <div className="py-2 px-4 bg-warnaUtama rounded-md shadow-sm border-r-2 border-black">
                <h1 className="text-center font-outfit font-semibold lg:text-xl text-white">
                  Tata Cara Pendaftaran
                </h1>
              </div>

              <div className="mt-4">
                {tahapPendaftaran.map((step) => (
                  <div
                    key={step.value}
                    className="bg-white shadow-lg p-3 border-b-2 mt-3 rounded-lg border-r-2 border-black flex gap-3"
                  >
                    <div className="bg-warnaUtama rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                      <h2 className="text-white">{step.value}</h2>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-poppins text-base font-semibold">
                        {step.judul}
                      </h2>
                      <div className="flex flex-col pr-5 text-sm mt-2 font-poppins">
                        <h3 className="font-medium lg:text-base">
                          {step.label}
                        </h3>
                        <ul className="list-disc pl-4 text-[13px] lg:text-base mt-2">
                          {step.listItems.map((list, index) => (
                            <li key={index}>{list.list}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          {activeTabs === "informasi" && (
            <div className="space-y-4 text-left lg:px-20 mt-5 bg-white max-w-4xl w-full p-5 rounded-lg shadow-lg">
              {/* Display data fetched from Firebase */}
              {informasiData.map((item, index) => (
                <div key={index} className="mt-3">
                  <h3 className="font-poppins lg:lg:text-xl text-[15px] font-semibold lg:font-semibold">
                    PPDB SMP Muhammadiyah Sumbang akan dibuka pada:
                  </h3>
                  <ul className="list-disc font-poppins font-medium mt-5 pl-5 space-y-4 text-sm lg:text-base">
                    <li>
                      Tanggal Dibuka PPDB: {formatDate(item.tanggal_buka)}
                    </li>
                    <li>
                      Tanggal Selesai PPDB: {formatDate(item.tanggal_tutup)}
                    </li>
                    {item.details && (
                      <div className="mt-4 p-4 -ml-4 bg-gray-100 rounded-md border-l-4 border-red-500">
                        <h3 className="text-red-700 font-outfit font-semibold">
                          📢 Informasi Penting 📢:
                        </h3>
                        <p
                          className="text-gray-700 text-sm mt-2"
                          dangerouslySetInnerHTML={{ __html: item.details }}
                        />
                      </div>
                    )}
                  </ul>

                  <div className="mt-7">
                    <h1 className="font-poppins text-base">
                      Status PPDB:
                      <span className="font-semibold font-poppins p-2 ml-3  bg-warnaUtama text-white rounded-lg text-sm lg:text-lg">
                        {item.status}
                      </span>
                    </h1>
                  </div>
                </div>
              ))}

              <div className="flex w-full gap-5 lg:gap-4">
                <Button
                  name={isDataExists ? "Detail" : "Daftar"}
                  onClick={isDataExists ? handleDetail : handleDaftarClick}
                  className={`${
                    currentStatus === "Pendaftaran Di Buka"
                      ? "bg-warnaUtama"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white font-poppins font-medium lg:text-base w-full lg:h-11`}
                />

                <Button
                  name="Check Status"
                  onClick={handleStatus}
                  className="bg-white text-warnaUtama lg:text-base font-poppins font-medium border-2 border-warnaUtama rounded-md w-full lg:h-11"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
