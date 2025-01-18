// Register.jsx
import React, { useState } from 'react';
import Button from '../common/Button'; // Pastikan path ini benar
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types'; // Untuk validasi prop
import axios from 'axios';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Register = ({ onSwitchToLogin }) => { // Menerima prop dengan nama yang benar
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');


  //Membuat fungsi register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      toast.error("Password tidak cocok!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update nama pengguna
      await updateProfile(user, { displayName: name });

      toast.success("Registrasi berhasil!");
      onSwitchToLogin(); // Alihkan ke halaman login setelah registrasi berhasil
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Terjadi kesalahan saat registrasi");
    }
  };
  

  // Handler untuk link 'Login'
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah perilaku default link
    if (onSwitchToLogin) { // Memeriksa apakah prop diberikan
      onSwitchToLogin(); // Memanggil fungsi untuk beralih ke Login modal
    }
  };

  return (
    <div className=''>
      <h1 className='text-black text-[20px] font-outfit font-medium'>Daftar ke akun anda.</h1>
      <form action="" onSubmit={handleRegister} className='mt-7'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col'>
            <label htmlFor="fullname" className='text-black font-outfit text-[16px] font-medium'>Nama Lengkap</label>
            <input
              type="text"
              id="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md'
              placeholder='Masukan Nama Lengkap kamu'
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
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-black font-outfit text-[16px] font-medium '>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className='w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md'
              placeholder='Masukkan Email'
            />
          </div>
          <div className='flex flex-col relative'>
            <label htmlFor="password" className='text-black font-outfit text-[16px] font-medium'>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md'
              placeholder='••••••••••••••'
            />

            <label htmlFor="password" className='text-black font-outfit text-[16px] font-medium'>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className='w-full rounded-md text-[12px] font-normal p-2 border border-gray-300 shadow-md'
              placeholder='••••••••••••••'
            />

            <button
              type="button"
              className="absolute right-4 top-12 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Icon icon="mdi:eye-off-outline" width={20} /> : <Icon icon="mdi:eye-outline" width={20} />}
            </button>
          </div>
        </div>
        <div className='w-full items-center justify-center flex mt-5'>
          <Button
            name={'Register'}
            className={`w-full bg-warnaUtama text-white font-normal`}
            type="submit" // Spesifikasikan type submit
          />
        </div>
      </form>

      <div className='w-full items-center justify-center flex flex-row gap-3 mt-6 lg:mt-10 lg:gap-3'>
        <p className='text-[14px] lg:text-[16px] font-outfit font-normal'>Sudah Punya Akun?</p>
        {/* Tambahkan onClick handler untuk memanggil fungsi beralih */}
        <a
          href="#"
          onClick={handleLogin}
          className='text-[14px] lg:text-[16px] font-outfit font-semibold text-warnaUtama'
        >
          Login
        </a>
      </div>
    </div>
  )
}

// Validasi prop menggunakan PropTypes
Register.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired, // Pastikan fungsi dikirimkan
};

export default Register;
