import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";

const FormPendaftaran = ({ userId: propUserId }) => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jenisKelamin: "",
    asalSekolah: "",
    kk: null,
    kip: null,
    skhun: null,
    sertifikat: null,
    aktaKelahiran: null,
  });

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
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID tidak ditemukan. Silakan login kembali.");
      return;
    }

    try {
      const storage = getStorage();
      const database = getDatabase();

      // Upload files to Firebase Storage
      const fileFields = ["kk", "kip", "skhun", "sertifikat", "aktaKelahiran"];
      const fileUrls = {};

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

      // Save form data and file URLs to Realtime Database
      const dataToSave = {
        nama: formData.nama,
        alamat: formData.alamat,
        jenisKelamin: formData.jenisKelamin,
        asalSekolah: formData.asalSekolah,
        files: fileUrls,
        createdAt: new Date().toISOString(),
      };

      const pendaftaranRef = dbRef(database, `pendaftaran/${userId}`);
      await push(pendaftaranRef, dataToSave);

      alert("Pendaftaran berhasil disimpan!");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-24">
      <div>
        <label>Nama:</label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Alamat:</label>
        <input
          type="text"
          name="alamat"
          value={formData.alamat}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Jenis Kelamin:</label>
        <select
          name="jenisKelamin"
          value={formData.jenisKelamin}
          onChange={handleInputChange}
          required
        >
          <option value="">Pilih</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>
      <div>
        <label>Asal Sekolah:</label>
        <input
          type="text"
          name="asalSekolah"
          value={formData.asalSekolah}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Upload KK:</label>
        <input type="file" name="kk" onChange={handleInputChange} required />
      </div>
      <div>
        <label>Upload KIP:</label>
        <input type="file" name="kip" onChange={handleInputChange} required />
      </div>
      <div>
        <label>Upload SKHUN:</label>
        <input type="file" name="skhun" onChange={handleInputChange} required />
      </div>
      <div>
        <label>Upload Sertifikat:</label>
        <input
          type="file"
          name="sertifikat"
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Upload Akta Kelahiran:</label>
        <input
          type="file"
          name="aktaKelahiran"
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Daftar</button>
    </form>
  );
};

export default FormPendaftaran;
