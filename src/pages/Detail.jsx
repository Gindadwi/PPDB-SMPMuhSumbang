import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../firebase"; // Import your Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export const Details = () => {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Untuk animasi
  const [formData, setFormData] = useState({
    nama: "",
    tempatLahir: "",
    tanggalLahir: "",
    namaOrtu: "",
    alamat: "",
    noHP: "",
    nik: "",
    asalSekolah: "",
    nilaiIPA: "",
    nilaiIndo: "",
    nilaiMtk: "",
    status: "",
    total: "",
    pasFotoUrl: "",
    aktaKelahiranUrl: "",
    kkUrl: "",
    kipUrl: "",
    skhunUrl: "",
    sertifikatUrl: "",
  });

  const [files, setFiles] = useState({
    pasFoto: null,
    aktaKelahiran: null,
    kk: null,
    kip: null,
    skhun: null,
    sertifikat: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const formFields = [
    { label: "Nama Lengkap", name: "nama", type: "text" },
    { label: "Tempat Lahir", name: "tempatLahir", type: "text" },
    { label: "Tanggal Lahir", name: "tanggalLahir", type: "date" },
    { label: "Nama Orang Tua", name: "namaOrtu", type: "text" },
    { label: "Alamat", name: "alamat", type: "text" },
    { label: "Nomor HP", name: "noHP", type: "text" },
    { label: "NIK", name: "nik", type: "text" },
    { label: "Asal Sekolah", name: "asalSekolah", type: "text" },
    { label: "Nilai IPA", name: "IPA", type: "number" },
    { label: "Nilai Bahasa Indonesia", name: "BIndo", type: "number" },
    { label: "Nilai Matematika", name: "MTK", type: "number" },
    { label: "Total Rata-Rata", name: "total", type: "number" },
  ];

  const documentFields = [
    {
      label: "Pas Foto 3X4",
      name: "pasFotoUrl",
      field: "pasFoto",
    },
    {
      label: "Akta Kelahiran",
      name: "aktaKelahiranUrl",
      field: "aktaKelahiran",
    },
    { label: "Kartu Keluarga", name: "kkUrl", field: "kk" },
    { label: "Kartu Indonesia Pintar", name: "kipUrl", field: "kip" },
    { label: "SKHUN", name: "skhunUrl", field: "skhun" },
    { label: "Sertifikat", name: "sertifikatUrl", field: "sertifikat" },
  ];

  // Menggunakan hook useEffect untuk menjalankan fungsi `fetchData` saat komponen pertama kali di-render
  // atau ketika nilai `id` berubah.
  useEffect(() => {
    // Fungsi async untuk mengambil data dari API
    const fetchData = async () => {
      try {
        // Melakukan permintaan GET ke Firebase Realtime Database
        const response = await axios.get(
          `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${id}.json`
        );

        // Mengecek apakah data berhasil diterima dari API
        if (response.data) {
          // Mengonversi format tanggal lahir dari dd/MM/yyyy menjadi yyyy-MM-dd
          const formattedDate = response.data.tanggalLahir
            ? response.data.tanggalLahir.split("/").reverse().join("-") // Memisahkan string tanggal, membalik urutan, lalu menyatukan kembali
            : "";

          // Mengisi state formData dengan data yang diterima dari API,
          // dan mengganti tanggalLahir dengan format baru
          setFormData({ ...response.data, tanggalLahir: formattedDate });
        }
      } catch (error) {
        // Menangkap dan mencetak error jika terjadi kesalahan saat pengambilan data
        console.error("Error fetching data:", error);
      }
    };

    // Memanggil fungsi `fetchData` untuk mengambil data dari API
    fetchData();
  }, [id]); // Menambahkan `id` ke dalam dependency array, sehingga useEffect akan dijalankan ulang setiap kali `id` berubah.

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
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
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({ ...prevFiles, [field]: file }));
    }
  };

  const uploadFile = async (file, fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on("state_changed", null, reject, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      });
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsLoading(true); // 🔥 Tampilkan loading
    try {
      // Upload files if any
      const updatedData = { ...formData };
      for (const [field, file] of Object.entries(files)) {
        if (file) {
          const url = await uploadFile(file, `${id}_${field}`);
          updatedData[`${field}Url`] = url;
        }
      }

      if (formData.nik.length !== 16) {
        toast.error("Nik kurang dari 16 digit");
        return;
      }

      // Update data in Realtime Database
      await axios.put(
        `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${id}.json`,
        updatedData
      );

      toast.success("Data berhasil diperbarui!");
      navigate("/informasippdb");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Gagal memperbarui data.");
    }
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setModalImage(null), 300);
  };

  return (
    <div className="max-w-4xl mx-auto my-28 p-6 bg-white lg:rounded-lg lg:border lg:border-1 lg:border-gray-200 lg:shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Detail Pendaftar</h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Form Fields */}
        {formFields.map((field, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:px-10">
            <label className="text-lg font-medium">{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Document Fields */}
        <h3 className="text-xl font-semibold text-center my-6">
          Dokumen Pendukung
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {documentFields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-5 rounded-md border border-1 border-gray-200 shadow-md p-2"
            >
              <label className="font-medium">{field.label}:</label>
              {formData[field.name] ? (
                <img
                  src={formData[field.name]}
                  alt={field.label}
                  onClick={() => openModal(formData[field.name])}
                  className="w-full h-48 object-cover border rounded-md cursor-pointer"
                />
              ) : (
                <p className="text-gray-500">Gambar tidak tersedia</p>
              )}
              <input
                type="file"
                onChange={(e) => handleFileChange(e, field.field)}
                className="mt-2 text-sm text-gray-700 rounded-md border border-1 border-gray-300"
              />
            </div>
          ))}
        </div>

        {/* Update Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-warnaUtama font-semibold font-outfit text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex gap-2 items-center justify-center">
                Memproses <FaSpinner className="animate-spin" />
              </div>
            ) : (
              "Update Data"
            )}
          </button>
        </div>
      </form>
      {modalImage && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal} // Gunakan fungsi closeModal untuk transisi animasi
        >
          <img
            src={modalImage}
            alt="Gambar besar"
            className={`max-w-full max-h-full border rounded-lg transform transition-transform duration-300 ${
              isModalVisible ? "scale-100" : "scale-90"
            }`}
          />
        </div>
      )}
    </div>
  );
};
