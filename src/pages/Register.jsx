// Register.jsx
import React, { useState } from "react";
import Button from "../common/Button"; // Pastikan path ini benar
import { Icon } from "@iconify/react";
import PropTypes from "prop-types"; // Untuk validasi prop
import axios from "axios";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

const Register = ({ onSwitchToLogin, closeModal, onRegisterSuccess }) => {
  // Menerima prop dengan nama yang benar
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  // Fungsi untuk memvalidasi password
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  //Membuat fungsi register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      toast.error("Password tidak cocok!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password harus minimal 8 karakter dan mengandung huruf serta angka."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      closeModal(); // Tutup modal setelah registrasi berhasil
      onRegisterSuccess(); // Callback untuk memberitahu komponen induk

      // Update nama pengguna
      await updateProfile(user, { displayName: name });

      toast.success(
        "Registrasi berhasil! Periksa email anda untuk verifikasi sebelum login"
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Terjadi kesalahan saat registrasi");
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();

  //   if (password !== confPassword) {
  //     toast.error("Password tidak cocok!");
  //     return;
  //   }

  //   if (!validatePassword(password)) {
  //     toast.error(
  //       "Password harus minimal 8 karakter dan mengandung huruf serta angka."
  //     );
  //     return;
  //   }

  //   try {
  //     // Registrasi user ke Firebase Authentication
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     // Kirim email verifikasi
  //     await sendEmailVerification(user);
  //     await updateProfile(user, { displayName: name }); // Set nama pengguna di Firebase Authentication

  //     // 🔥 Simpan nama ke Realtime Database berdasarkan userId
  //     const userId = user.uid;
  //     const url = `https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftaran/${userId}.json`;

  //     await axios.put(url, { nama: name });

  //     // Notifikasi sukses
  //     toast.success(
  //       "Registrasi berhasil! Periksa email anda untuk verifikasi sebelum login"
  //     );

  //     // Tutup modal dan beri tahu induk bahwa registrasi berhasil
  //     closeModal();
  //     onRegisterSuccess();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message || "Terjadi kesalahan saat registrasi");
  //   }
  // };

  return (
    <div className="">
      <h1 className="text-black text-[20px] font-outfit font-medium">
        Daftar ke akun anda.
      </h1>
      <form action="" onSubmit={handleRegister} className="mt-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="fullname"
              className="text-black font-outfit text-[16px] font-medium"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md"
              placeholder="Masukan Nama Lengkap kamu"
            />
          </div>
          {/* <div className='flex flex-col'>
            <label htmlFor="phone" className='text-black font-outfit text-[16px] font-medium'>Nomor Hp</label>
            <input
              type="text"
              id="phone"
              className='w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md'
              placeholder='Nomor Hp atau WhatsApp'
            />
          </div> */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-black font-outfit text-[16px] font-medium "
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md"
              placeholder="Masukkan Email"
            />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="text-black font-outfit text-[16px] font-medium"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md"
              placeholder="Minimal 8 karakter, huruf & angka"
            />

            <label
              htmlFor="password"
              className="text-black font-outfit text-[16px] font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md"
              placeholder="••••••••••••••"
            />

            <button
              type="button"
              className="absolute right-4 top-12 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Icon icon="mdi:eye-off-outline" width={20} />
              ) : (
                <Icon icon="mdi:eye-outline" width={20} />
              )}
            </button>
          </div>
        </div>
        <div className="w-full items-center justify-center flex mt-5">
          <Button
            name={"Register"}
            className={`w-full bg-warnaUtama text-white font-normal`}
            type="submit" // Spesifikasikan type submit
          />
        </div>
      </form>
    </div>
  );
};

// Validasi prop menggunakan PropTypes
// Register.propTypes = {
//   onSwitchToLogin: PropTypes.func.isRequired, // Pastikan fungsi dikirimkan
// };

export default Register;
