import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom"; // Ubah import ini
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ onSwitchToRegister, onLoginSuccess, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Gunakan useNavigate di sini
  const [error, setError] = useState("");

  // Fungsi untuk berpindah ke halaman register
  const handleCreate = (e) => {
    e.preventDefault();
    if (onSwitchToRegister) {
      onSwitchToRegister();
    }
  };

  // Fungsi untuk melakukan proses login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Simpan user ID di localStorage untuk digunakan di FormPendaftaran
      localStorage.setItem("userId", user.uid);

      toast.success("Login berhasil!");
      onLoginSuccess(user);

      // Tutup modal setelah login sukses
      if (closeModal) {
        closeModal();
      }

      // Arahkan pengguna ke halaman utama
      navigate("/");
    } catch (error) {
      console.log("Error during login:", error);
      if (error.code === "auth/wrong-password") {
        setError("Password yang Anda masukkan salah.");
      } else if (error.code === "auth/user-not-found") {
        setError("Pengguna dengan email tersebut tidak ditemukan.");
      } else {
        setError("Terjadi kesalahan, silakan coba lagi.");
      }
    }
  };

  return (
    <div className="bg-white">
      <h1 className="text-black text-[20px] font-outfit font-medium">
        Masuk ke akun anda.
      </h1>
      <form onSubmit={handleLogin} className="mt-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-black font-outfit text-[16px] font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md text-[12px] font-normal border-gray-300 shadow-md"
              placeholder="masukan email kamu"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-black font-outfit text-[16px] font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md text-[12px] font-normal border-gray-300 shadow-md"
              placeholder="••••••••••••••"
              required
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
            name={"Masuk"}
            type={"submit"}
            className={`w-60 bg-warnaUtama text-white font-normal`}
          />
        </div>
      </form>
      <div className="w-full items-center justify-center flex flex-row gap-2 mt-6 lg:mt-10 lg:gap-40">
        <p className="text-[14px] lg:text-[16px] font-outfit font-normal">
          Belum Memiliki Akun?
        </p>
        <a
          href="#"
          onClick={handleCreate}
          className="text-[14px] lg:text-[16px] font-outfit font-semibold text-warnaUtama"
        >
          Create Account
        </a>
      </div>
    </div>
  );
};

Login.propTypes = {
  onSwitchToRegister: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
