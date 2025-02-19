import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import { format } from "date-fns";
import { FaSpinner } from "react-icons/fa";

const FormPendaftaran = ({ userId: propUserId }) => {
  const [formData, setFormData] = useState({
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    jenisKelamin: "",
    nik: "",
    noHP: "",
    namaOrtu: "",
    asalSekolah: "",
    IPA: "",
    BIndo: "",
    MTK: "",
    total: 0,
    pasFoto: null,
    kk: null,
    kip: null,
    skhun: null,
    sertifikat: null,
    aktaKelahiran: null,
    status: "Pending",
    tanggalDaftar: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    const requiredFields = [
      "nama",
      "tempatLahir",
      "tanggalLahir",
      "alamat",
      "jenisKelamin",
      "nik",
      "noHP",
      "namaOrtu",
      "asalSekolah",
      "IPA",
      "BIndo",
      "MTK",
    ];

    // Validasi form
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(` harap di isi kolom ${field}`);
        return;
      }
    }

    // Validasi panjang NIK
    if (formData.nik.length !== 16) {
      toast.error("NIK harus 16 digit");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // Ambil userId dari localStorage jika tidak ada dari props
  const userId = propUserId || localStorage.getItem("userId");
  const [lahirDiJawa, setLahirDiJawa] = useState(true);

  const kabupatenJawa = [
    "Kabupaten Banyumas",
    "Kabupaten Cilacap",
    "Kabupaten Purbalingga",
    "Kabupaten Banjarnegara",
    "Kabupaten Kebumen",
    "Kabupaten Purworejo",
    "Kabupaten Wonosobo",
    "Kabupaten Magelang",
    "Kabupaten Temanggung",
    "Kabupaten Semarang",
    "Kabupaten Kendal",
    "Kabupaten Batang",
    "Kabupaten Pekalongan",
    "Kabupaten Pemalang",
    "Kabupaten Tegal",
    "Kabupaten Brebes",
    "Kabupaten Blora",
    "Kabupaten Grobogan",
    "Kabupaten Rembang",
    "Kabupaten Pati",
    "Kabupaten Jepara",
    "Kabupaten Kudus",
    "Kabupaten Demak",
    "Kabupaten Boyolali",
    "Kabupaten Klaten",
    "Kabupaten Sukoharjo",
    "Kabupaten Wonogiri",
    "Kabupaten Karanganyar",
    "Kabupaten Sragen",
    "Kabupaten Ngawi",
    "Kabupaten Magetan",
    "Kabupaten Ponorogo",
    "Kabupaten Madiun",
    "Kabupaten Nganjuk",
    "Kabupaten Kediri",
    "Kabupaten Tulungagung",
    "Kabupaten Blitar",
    "Kabupaten Malang",
    "Kabupaten Pasuruan",
    "Kabupaten Probolinggo",
    "Kabupaten Lumajang",
    "Kabupaten Jember",
    "Kabupaten Banyuwangi",
    "Kabupaten Bondowoso",
    "Kabupaten Situbondo",
    "Kabupaten Sidoarjo",
    "Kabupaten Gresik",
    "Kabupaten Lamongan",
    "Kabupaten Bojonegoro",
    "Kabupaten Tuban",
    "Kabupaten Mojokerto",
    "Kabupaten Jombang",
    "Kabupaten Bangkalan",
    "Kabupaten Sampang",
    "Kabupaten Pamekasan",
    "Kabupaten Sumenep",
  ];

  // Handle perubahan tempat lahir
  const handleTempatLahirChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, tempatLahir: value });
  };

  // Cek apakah user sudah login
  useEffect(() => {
    if (!userId) {
      alert("Anda harus login untuk mengakses form ini.");
    }
  }, [userId]);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Jika input adalah file, gunakan files[0] sebagai value
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      // Jika input bukan file, gunakan value biasa
      setFormData((prevData) => {
        // Update data dengan value baru
        let updatedData = { ...prevData, [name]: value };

        // Validasi panjang NIK
        if (name === "nik") {
          if (value.length > 16) {
            toast.error("NIK tidak boleh lebih 16 digit!");
            return prevData;
          }
        }

        // Validasi nilai maksimal 100 untuk IPA, BIndo, dan MTK
        if (["IPA", "BIndo", "MTK"].includes(name)) {
          const nilai = parseFloat(value) || 0;
          if (nilai > 100) {
            toast.error("Nilai tidak boleh lebih dari 100!");
            return prevData;
          }
        }

        // Validasi panjang NIK
        if (name === "nik") {
          if (value.length > 16) {
            toast.error("NIK harus 16 digit!");
            return prevData;
          }
        }

        // Validasi nilai maksimal 100 untuk IPA, BIndo, dan MTK
        if (["IPA", "BIndo", "MTK"].includes(name)) {
          const nilai = parseFloat(value) || 0;
          if (nilai > 100) {
            toast.error("Nilai tidak boleh lebih dari 100!");
            return prevData;
          }
        }

        // Jika ada perubahan di nilai IPA, B. Indo, atau MTK, hitung total
        if (["IPA", "BIndo", "MTK"].includes(name)) {
          const ipa = parseFloat(updatedData.IPA) || 0;
          const bindo = parseFloat(updatedData.BIndo) || 0;
          const mtk = parseFloat(updatedData.MTK) || 0;

          updatedData.total = (ipa + bindo + mtk) / 3;
        }

        // Hanya angka diperbolehkan untuk NIK dan noHP
        if (name === "nik" || name === "noHP") {
          updatedData[name] = value.replace(/[^0-9]/g, "");
        }

        return updatedData;
      });
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek apakah user sudah login
    if (!userId) {
      alert("User ID tidak ditemukan. Silakan login kembali.");
      return;
    }

    setIsLoading(true); // 🔥 Tampilkan loading

    // Simpan data ke Database
    try {
      const storage = getStorage();
      const fileFields = [
        "pasFoto",
        "kk",
        "kip",
        "skhun",
        "sertifikat",
        "aktaKelahiran",
      ];

      // URL file yang sudah diupload
      const fileUrls = {};
      // Format tanggal lahir ke format dd/MM/yyyy
      const formattedTanggalLahir = format(
        new Date(formData.tanggalLahir),
        "dd/MM/yyyy"
      );

      // membuat validari kalau file tidak di isi
      const requiredFile = ["pasFoto", "kk", "skhun", "aktaKelahiran"];
      for (const file of requiredFile) {
        // Jika file tidak diunggah, tampilkan pesan error
        if (!formData[file]) {
          toast.error(`File ${file.toUpperCase()} wajib diunggah!`);
          return;
        }
      }

      // Tanggal daftar
      const tanggalDaftar = format(new Date(), "dd/MM/yyy");

      // Upload file ke Firebase Storage
      const uploadPromises = fileFields.map(async (field) => {
        // Jika file diisi, upload file ke Firebase Storage
        if (formData[field]) {
          const storageRef = ref(
            storage,
            `files/${userId}/${field}-${formData[field].name}`
          );
          await uploadBytes(storageRef, formData[field]);
          return { [field]: await getDownloadURL(storageRef) };
        }
        return { [field]: "" };
      });

      // Tunggu semua file selesai diupload
      const fileUploadResults = await Promise.all(uploadPromises);
      fileUploadResults.forEach((result) => Object.assign(fileUrls, result));

      // Data yang akan disimpan ke Database
      const dataToSave = {
        tanggalDaftar: tanggalDaftar,
        nama: formData.nama,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formattedTanggalLahir,
        alamat: formData.alamat,
        jenisKelamin: formData.jenisKelamin,
        nik: formData.nik,
        noHP: formData.noHP,
        namaOrtu: formData.namaOrtu,
        asalSekolah: formData.asalSekolah,
        IPA: formData.IPA,
        BIndo: formData.BIndo,
        MTK: formData.MTK,
        total: formData.total,
        status: formData.status,
        pasFotoUrl: fileUrls.pasFoto || "",
        kkUrl: fileUrls.kk || "",
        kipUrl: fileUrls.kip || "",
        skhunUrl: fileUrls.skhun || "",
        sertifikatUrl: fileUrls.sertifikat || "",
        aktaKelahiranUrl: fileUrls.aktaKelahiran || "",
      };

      // URL berdasarkan userId, ini memastikan data disimpan berdasarkan userId
      const url = `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${userId}.json`;

      // Cek apakah data sudah ada berdasarkan userId
      const response = await axios.get(url);
      if (response.data) {
        // Jika data sudah ada, beri peringatan
        toast.error("Data sudah ada, tidak bisa ditambahkan lagi.");
        return;
      }

      // Jika data belum ada, simpan data baru dengan `set`
      await axios.put(url, dataToSave);

      // Membuat notifikasi Whatsap jika ada pendaftar baru
      await sendWhatsAppNotification(
        formData.nama,
        formData.alamat,
        formData.nik,
        formData.noHP
      );
      toast.success("Pendaftaran berhasil ");
      navigate("/informasippdb");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast.error("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false); // 🔥 Matikan loading setelah selesai
    }
  };

  const sendWhatsAppNotification = async (nama, alamat, nik, NoHP) => {
    const adminPhone = "6281228900185"; // Nomor WhatsApp admin
    const apiKey = "3038884"; // API Key dari CallMeBot
    const message = `📢 Ada Pendaftar Baru !📢 \nDengan:\nNama: ${nama}\nAlamat: ${alamat} \nNik: ${nik} \nNomor Hp: ${NoHP} \n\nSilahkan cek admin untuk mengetahui lebih lanjut💻💻`;

    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodeURIComponent(
        message
      )}&apikey=${apiKey}`;

      const response = await fetch(url);
      if (response.ok) {
        console.log("Notifikasi berhasil dikirim ke WhatsApp admin.");
      } else {
        console.error("Gagal mengirim notifikasi.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mb-14 my-20 px-4 sm:px-6">
      <div className="flex flex-col pt-10 gap-1 justify-center items-center">
        <h1 className="text-[18px] lg:text-[24px] font-outfit font-semibold text-center">
          Form Pendaftaran Siswa Baru
        </h1>
        <h1 className="text-[12px] lg:text-[16px] font-poppins font-normal text-center">
          Isi semua form yang ada di bawah ini jangan sampai terlewat. Kami
          membutuhkan data anda yang valid.
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative max-w-[720px] mx-auto mt-8"
      >
        {step === 1 && (
          <>
            {/* Input Nama Lengkap */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  onChange={handleInputChange}
                  value={formData.nama}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Input Tempat Lahir dan Tanggal Lahir */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Tempat Lahir</label>
                <select
                  onChange={(e) => setLahirDiJawa(e.target.value === "Jawa")}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                >
                  <option value="Jawa">Jawa Tengah</option>
                  <option value="Luar Jawa">Di Luar Jawa</option>
                </select>

                {lahirDiJawa ? (
                  <select
                    name="tempatLahir"
                    onChange={handleTempatLahirChange}
                    value={formData.tempatLahir}
                    className="border border-black rounded-md p-2 lg:p-3 font-outfit mt-2"
                  >
                    <option value="" disabled selected>
                      Pilih Kabupaten
                    </option>
                    {kabupatenJawa.map((kabupaten, index) => (
                      <option key={index} value={kabupaten}>
                        {kabupaten}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="tempatLahir"
                    onChange={handleTempatLahirChange}
                    className="border border-black rounded-md p-2 lg:p-3 font-outfit mt-2"
                    placeholder="Masukkan tempat lahir"
                  />
                )}
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Tanggal Lahir</label>
                <input
                  type="date"
                  onChange={handleInputChange}
                  value={formData.tanggalLahir}
                  name="tanggalLahir"
                  dateFormat="Masukan Tanggal lahir"
                  className="w-full border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="dd/MM/yyyy"
                />
              </div>
            </div>

            {/* Alamat */}
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  onChange={handleInputChange}
                  value={formData.alamat}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
            </div>

            {/* NIK */}
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">NIK</label>
                <input
                  type="number"
                  name="nik"
                  onChange={handleInputChange}
                  value={formData.nik}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Masukan NIk"
                />
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Jenis Kelamin</label>
                <select
                  name="jenisKelamin"
                  onChange={handleInputChange}
                  value={formData.jenisKelamin}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                >
                  <option value="" disabled selected>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {/* No HP */}
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Nomor HP/WA</label>
                <input
                  type="tel"
                  name="noHP"
                  onChange={handleInputChange}
                  value={formData.noHP}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Masukan Nomor whatshaap"
                />
              </div>
            </div>

            {/* Nama Ortu */}
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Nama Orangtua</label>
                <input
                  type="text"
                  name="namaOrtu"
                  onChange={handleInputChange}
                  value={formData.namaOrtu}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Nama Orangtua/Wali"
                />
              </div>
            </div>

            {/* Asal Sekolah */}
            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Asal Sekolah</label>
                <input
                  type="text"
                  name="asalSekolah"
                  onChange={handleInputChange}
                  value={formData.asalSekolah}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Masukan Asal Sekolah"
                />
              </div>
            </div>

            {/* Nilai Ujian */}
            <div className="mt-5">
              <label className="font-medium font-outfit">
                Nilai Ujian Sekolah
              </label>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 ">
                <input
                  type="number"
                  name="IPA"
                  onChange={handleInputChange}
                  value={formData.IPA}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="IPA"
                />
                <input
                  type="number"
                  name="BIndo"
                  onChange={handleInputChange}
                  value={formData.BIndo}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="B.Indo"
                />
                <input
                  type="number"
                  name="MTK"
                  onChange={handleInputChange}
                  value={formData.MTK}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="MTK"
                />
                <input
                  type="number"
                  name="total"
                  onChange={handleInputChange}
                  value={formData.total.toFixed(2)}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Total Nilai"
                />
              </div>
            </div>

            {/* Button Next */}
            <div className="mt-8 grid grid-cols-3">
              <button
                type="button"
                onClick={nextStep}
                className="bg-warnaUtama text-white px-4 py-2 lg:py-3 lg:text-[18px] font-outfit font-medium rounded-md lg:hover:scale-105 transform duration-150"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Step 2: Upload Berkas */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1">
                  <label className="font-medium font-outfit text-[14px]">
                    Foto 3X4
                  </label>
                  <p className="text-red-600 text-[18px] lg:text-[26px]">*</p>
                </div>
                <input
                  type="file"
                  name="pasFoto"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4  mt-5">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1">
                  <label className="font-medium font-outfit text-[14px]">
                    Upload Kartu Keluarga (KK)
                  </label>
                  <p className="text-red-600 text-[18px] lg:text-[26px]">*</p>
                </div>
                <input
                  type="file"
                  name="kk"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1">
                  <label className="font-medium font-outfit text-[14px]">
                    Upload SKHUN
                  </label>
                  <p className="text-red-600 text-[18px] lg:text-[26px]">*</p>
                </div>
                <input
                  type="file"
                  name="skhun"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1">
                  <label className="font-medium font-outfit text-[14px]">
                    Upload Akta Kelahiran
                  </label>
                  <p className="text-red-600 text-[18px] lg:text-[26px]">*</p>
                </div>
                <input
                  type="file"
                  name="aktaKelahiran"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit text-[14px]">
                  kartu Indonesia Pintar (KIP){" "}
                </label>
                <input
                  type="file"
                  name="kip"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit text-[14px]">
                  Sertifikat
                </label>
                <input
                  type="file"
                  name="sertifikat"
                  onChange={handleInputChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Buttons Prev and Submit */}
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-warnaUtama text-white lg:text-[18px] lg:py-3 font-outfit font-medium px-4 py-2 rounded-md lg:hover:scale-105 transform duration-150"
              >
                Previous
              </button>

              <button
                type="submit"
                className="bg-warnaUtama text-white lg:text-[18px] lg:py-3 font-outfit font-medium px-4 py-2 rounded-md lg:hover:scale-105 transform duration-150"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex gap-2 items-center justify-center">
                    Memproses <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  "Daftar"
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default FormPendaftaran;
