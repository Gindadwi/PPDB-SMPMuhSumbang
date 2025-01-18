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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login pengguna
  const navigate = useNavigate();

  const auth = getAuth();

  const syaratDokumen = [
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
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentStatus = informasiData.length > 0 ? informasiData[0].status : "";
  // Fungsi untuk menangani klik tombol Daftar
  const handleDaftarClick = () => {
    if (isLoggedIn) {
      if (currentStatus === "Pendaftaran Di Buka") {
        navigate("/formpendaftaran"); // Arahkan ke halaman form pendaftaran
      } else {
        toast.error("Pendaftaran belum dibuka.");
      }
    } else {
      toast.error("Silakan login terlebih dahulu.");
    }
  };

  const handleStatus = () => {
    if (isLoggedIn) {
      navigate("/status"); // Arahkan ke halaman status pendaftaran
    } else {
      toast.error("Silakan login terlebih dahulu.");
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
                    Informasi PPDB SMP Muhammadiyah Sumbang akan dibuka pada:
                  </h3>
                  <ul className="list-disc font-poppins font-medium mt-5 pl-5 space-y-4 text-sm lg:text-base">
                    <li>
                      Tanggal Dibuka PPDB: {formatDate(item.tanggal_buka)}
                    </li>
                    <li>
                      Tanggal Selesai PPDB: {formatDate(item.tanggal_tutup)}
                    </li>
                    {item.detail && (
                      <li style={{ whiteSpace: "pre-line" }}>{item.detail}</li>
                    )}
                  </ul>

                  <div className="mt-7">
                    <h1 className="font-poppins text-base">
                      Status PPDB:
                      <span className="font-semibold font-poppins p-2 ml-3 bg-warnaUtama text-white rounded-lg">
                        {item.status}
                      </span>
                    </h1>
                  </div>
                </div>
              ))}

              <div className="flex w-full gap-5 lg:gap-4">
                <Button
                  name="Daftar"
                  onClick={handleDaftarClick}
                  className={`${
                    currentStatus === "Pendaftaran Di Buka"
                      ? "bg-warnaUtama"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white font-poppins font-medium lg:text-base w-full lg:h-11`}
                />
                <Button
                  name="Check Status"
                  onClick={handleStatus}
                  className={`bg-white text-warnaUtama lg:text-base font-poppins font-medium border-2 border-warnaUtama rounded-md w-full lg:h-11`}
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
