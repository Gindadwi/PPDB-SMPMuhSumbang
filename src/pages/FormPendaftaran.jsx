import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import { format } from "date-fns";

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
    kk: null,
    kip: null,
    skhun: null,
    sertifikat: null,
    aktaKelahiran: null,
    status: "Pending",
  });

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // Ambil userId dari localStorage jika tidak ada dari props
  const userId = propUserId || localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("Anda harus login untuk mengakses form ini.");
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };

        // Jika ada perubahan di nilai IPA, B. Indo, atau MTK, hitung total
        if (name === "IPA" || name === "BIndo" || name === "MTK") {
          const ipa = parseFloat(updatedData.IPA) || 0;
          const bindo = parseFloat(updatedData.BIndo) || 0;
          const mtk = parseFloat(updatedData.MTK) || 0;

          updatedData.total = (ipa + bindo + mtk) / 3;
        }
        return updatedData;
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!userId) {
  //     alert("User ID tidak ditemukan. Silakan login kembali.");
  //     return;
  //   }

  //   try {
  //     const storage = getStorage();

  //     // Mengupload file dan mendapatkan URL
  //     const fileFields = ["kk", "kip", "skhun", "sertifikat", "aktaKelahiran"];
  //     const fileUrls = {};

  //     // Format tanggal lahir
  //     const formattedTanggalLahir = format(
  //       new Date(formData.tanggalLahir),
  //       "dd/MM/yyyy"
  //     );

  //     for (const field of fileFields) {
  //       if (formData[field]) {
  //         const storageRef = ref(
  //           storage,
  //           `files/${userId}/${field}-${formData[field].name}`
  //         );
  //         await uploadBytes(storageRef, formData[field]);
  //         const downloadURL = await getDownloadURL(storageRef);
  //         fileUrls[field] = downloadURL;
  //       }
  //     }

  //     // Struktur data yang lebih sederhana
  //     const dataToSave = {
  //       nama: formData.nama,
  //       tempatLahir: formData.tempatLahir,
  //       tanggalLahir: formData.tanggalLahir,
  //       alamat: formData.alamat,
  //       jenisKelamin: formData.jenisKelamin,
  //       nik: formData.nik,
  //       noHP: formData.noHP,
  //       namaOrtu: formData.namaOrtu,
  //       asalSekolah: formData.asalSekolah,
  //       IPA: formData.IPA,
  //       BIndo: formData.BIndo,
  //       MTK: formData.MTK,
  //       total: formData.total,
  //       status: formData.status,
  //       // Menambahkan file URL yang sudah diupload
  //       kkUrl: fileUrls.kk || "",
  //       kipUrl: fileUrls.kip || "",
  //       skhunUrl: fileUrls.skhun || "",
  //       sertifikatUrl: fileUrls.sertifikat || "",
  //       aktaKelahiranUrl: fileUrls.aktaKelahiran || "",
  //     };

  //     // Menyimpan data di Realtime Database menggunakan axios
  //     const url = `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${userId}.json`;
  //     await axios.post(url, dataToSave);

  //     toast.success("Pendaftaran berhasil ");
  //     navigate("/informasippdb");
  //   } catch (error) {
  //     console.error("Terjadi kesalahan:", error);
  //     alert("Terjadi kesalahan saat menyimpan data.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID tidak ditemukan. Silakan login kembali.");
      return;
    }

    try {
      const storage = getStorage();
      const fileFields = ["kk", "kip", "skhun", "sertifikat", "aktaKelahiran"];
      const fileUrls = {};
      const formattedTanggalLahir = format(
        new Date(formData.tanggalLahir),
        "dd/MM/yyyy"
      );

      for (const field of fileFields) {
        if (formData[field]) {
          const storageRef = ref(
            storage,
            `files/${userId}/${field}-${formData[field].name}`
          );
          await uploadBytes(storageRef, formData[field]);
          const downloadURL = await getDownloadURL(storageRef);
          fileUrls[field] = downloadURL;
        }
      }

      const dataToSave = {
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
        alert("Data sudah ada, tidak bisa ditambahkan lagi.");
        return;
      }

      // Jika data belum ada, simpan data baru dengan `set`
      await axios.put(url, dataToSave);

      toast.success("Pendaftaran berhasil ");
      navigate("/informasippdb");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
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
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Input Tempat Lahir dan Tanggal Lahir */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempatLahir"
                  onChange={handleInputChange}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="Tempat lahir"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="font-medium font-outfit">Tanggal Lahir</label>
                <input
                  type="date"
                  onChange={handleInputChange}
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
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="IPA"
                />
                <input
                  type="number"
                  name="BIndo"
                  onChange={handleInputChange}
                  className="border border-black rounded-md p-2 lg:p-3 font-outfit"
                  placeholder="B.Indo"
                />
                <input
                  type="number"
                  name="MTK"
                  onChange={handleInputChange}
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
                <label className="font-medium font-outfit text-[14px]">
                  Upload Kartu Keluarga (KK)
                </label>
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
                <label className="font-medium font-outfit text-[14px]">
                  Upload SKHUN
                </label>
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
                <label className="font-medium font-outfit text-[14px]">
                  Upload Akta Kelahiran
                </label>
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
              >
                Daftar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default FormPendaftaran;
