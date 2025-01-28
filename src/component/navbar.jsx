// Navbar.js
import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/LogoSMP.png";
import btnNav from "../assets/BtnNav.png";
import Button from "../common/Button";
import Login from "../pages/Login";
import Register from "../pages/Register"; // Pastikan nama file sesuai dan huruf kapital
import "flowbite/dist/flowbite.css";
import { Modal } from "flowbite";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth"; // Tambahkan ini
import { auth } from "../firebase"; // Tambahkan ini

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [modalContent, setModalContent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  // Fungsi untuk mengganti konten modal ke Login
  const switchToLogin = () => {
    setModalContent(<Login onSwitchToRegister={switchToRegister} />);
  };

  // Fungsi untuk mengganti konten modal ke Register
  const switchToRegister = () => {
    setModalContent(<Register onRegisterSuccess={handleRegisterSuccess} />);
  };

  // Fungsi untuk membuka atau menutup dropdown saat tombol Register diklik
  const handleRegister = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Menambahkan event listener untuk mendeteksi klik di luar dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Membersihkan event listener saat komponen dilepas
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fungsi untuk menutup dropdown jika klik terjadi di luar elemen dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Fungsi untuk membuka modal dengan konten tertentu
  const handleClickModal = (content) => {
    setModalContent(content); // Mengatur konten modal
    const modal = new Modal(document.getElementById("skill-modal")); // Menginisialisasi modal dari Flowbite
    modal.show(); // Menampilkan modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModalContent(null); // Menghapus konten modal
    const modal = new Modal(document.getElementById("skill-modal")); // Menginisialisasi modal dari Flowbite
    modal.hide(); // Menyembunyikan modal
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true); // Pengguna sudah login, tampilkan menu logout
    }
  }, []);

  const handleLogginsuccess = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("userId", user.uid); // Asumsikan user.uid adalah ID pengguna dari Firebase
    toast.success("Login Berhasil");
    closeModal();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userId"); // Hapus userId dari localStorage
        setIsLoggedIn(false); // Ubah status login
        toast.success("Berhasil Logout");
        navigate("/"); // Arahkan ke halaman beranda setelah logout
      })
      .catch((error) => {
        console.error("Error saat logout:", error);
      });
  };

  const handleRegisterSuccess = () => {
    toast.success("Registrasi Berhasil");
    closeModal(); // Tutup modal setelah registrasi berhasil
  };

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       localStorage.removeItem("accessToken"); // Jika Anda menyimpan token lokal, hapus
  //       setIsLoggedIn(false); // Perbarui state
  //       toast.success("Logout berhasil");
  //     })
  //     .catch((error) => {
  //       console.error("Error saat logout:", error);
  //       toast.error("Logout gagal, coba lagi.");
  //     });
  // };

  return (
    <div className="relative">
      {/* Kontainer utama navbar */}
      <div className="flex w-full min-w-[360px] items-center px-5 lg:mx-auto lg:min-w-[460px] lg:max-w-[1080px] lg:justify-center lg:px-0">
        {/* Header yang tetap di bagian atas */}
        <header className="bg-warnaUtama dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          {/* Kontainer isi header */}
          <div className="px-4 lg:px-0 py-2 lg:py-4 flex items-center justify-between text-2xl font-semibold font-outfit mx-auto max-w-[1080px] 2xl:max-w-[1444px]">
            {/* Bagian kiri header: Logo dan nama sekolah */}
            <div className="flex flex-row items-center">
              <img src={Logo} alt="Logo" className="w-12 2xl:w-24" />{" "}
              {/* Logo sekolah */}
              <span className="hidden md:inline text-white text-base 2xl:text-2xl">
                SMP Muhammadiyah Sumbang{" "}
                {/* Nama sekolah, disembunyikan pada layar kecil */}
              </span>
            </div>
            {/* Bagian kanan header: Navigasi dan tombol Register */}
            <div className="flex flex-row gap-5 lg:gap-10 items-center">
              {/* Navigasi untuk desktop, disembunyikan pada layar kecil */}
              <nav className="hidden md:flex flex-row gap-5">
                <Link
                  to="/"
                  className="text-white font-outfit text-sm 2xl:text-xl"
                >
                  Beranda
                </Link>
                <Link
                  to="/tentangkami"
                  className="text-white font-outfit text-sm 2xl:text-xl"
                >
                  Tentang Kami
                </Link>
                <Link
                  to="/esktrakulikuler"
                  className="text-white font-outfit text-sm 2xl:text-xl"
                >
                  Ekstrakulikuler
                </Link>
                <Link
                  to="/informasippdb"
                  className="text-white font-outfit text-sm 2xl:text-xl"
                >
                  Informasi PPDB
                </Link>
              </nav>

              <div>
                {/* Tombol Register yang membuka dropdown */}
                <Button
                  id="dropdownDefaultButton"
                  name={isLoggedIn ? "Logout" : "Register"} // Nama tombol
                  className={"bg-white 2xl:text-2xl 2xl:py-2"} // Kelas CSS tambahan
                  onClick={isLoggedIn ? handleLogout : handleRegister} // Handler saat tombol diklik
                />
                {/* Dropdown muncul jika dropdownOpen true */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef} // Ref untuk mendeteksi klik di luar
                    className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg border border-gray-200 w-[135px] top-14 right-14 dark:bg-gray-700 mt-3 lg:w-[150px] lg:right-[190px] 2xl:w-[300px] 2xl:right-[150px] 2xl:mt-12"
                  >
                    <ul className="py-2 px-3 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        {/* Tombol Login dalam dropdown */}
                        <button
                          onClick={() =>
                            handleClickModal(
                              <Login
                                onLoginSuccess={handleLogginsuccess}
                                onSwitchToRegister={switchToRegister}
                              />
                            )
                          } // Membuka modal Login
                          className="block bg-warnaUtama text-white font-poppins font-normal w-full px-4 py-2 rounded-lg lg:hover:scale-105 transform ease-in-out duration-200 2xl:text-2xl 2xl:py-3"
                        >
                          Login
                        </button>
                      </li>
                      <li>
                        {/* Tombol Register dalam dropdown */}
                        <button
                          onClick={() =>
                            handleClickModal(
                              <Register
                                onRegisterSuccess={handleRegisterSuccess}
                                closeModal={closeModal} // Pastikan ini diteruskan
                              />
                            )
                          } // Membuka modal Register
                          className="block font-poppins font-normal text-warnaUtama border border-1 border-warnaUtama rounded-lg mt-2 w-full px-4 py-2 lg:hover:bg-white lg:hover:scale-105 transform ease-in-out duration-200 2xl:text-2xl 2xl:py-3"
                        >
                          Register
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {/* Modal muncul jika modalContent tidak null */}
                {modalContent && (
                  <div
                    id="skill-modal" // ID untuk menginisialisasi modal
                    data-modal-backdrop="static" // Properti backdrop modal
                    tabIndex="-1" // Untuk aksesibilitas
                    inert // Menyembunyikan modal dari screen readers saat tidak aktif
                    className="fixed bg-black h-screen bg-opacity-50 items-center justify-center flex top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:h-full"
                  >
                    {/* Kontainer modal */}
                    <div className="relative w-full h-full max-w-2xl md:h-auto lg:w-[500px]">
                      {/* Konten modal */}
                      <div className="relative bg-white rounded-lg shadow">
                        {/* Header modal dengan tombol close */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                          <button
                            onClick={closeModal} // Handler saat tombol close diklik
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="skill-modal" // Data attribute untuk Flowbite
                          >
                            {/* Ikon silang untuk tombol close */}
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        {/* Body modal yang menampilkan konten */}
                        <div className="p-6">
                          <p className="text-base mt-[-20px] leading-relaxed text-back font-poppins text-left dark:text-gray-400">
                            {modalContent} {/* Konten modal yang dinamis */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Tombol navigasi mobile (hamburger menu) */}
              <img
                src={btnNav} // Sumber gambar tombol navigasi
                className="w-10 cursor-pointer block md:hidden" // Kelas CSS: tampilkan hanya di layar kecil
                alt="Button Nav" // Alt text untuk aksesibilitas
                onClick={() => setOpen(!open)} // Handler saat tombol diklik
              />
            </div>
          </div>
        </header>

        {/* Menu navigasi untuk mobile, muncul saat open true */}
        <div
          className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg transform ${
            open ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
        >
          {/* Tombol close menu mobile */}
          <div className="flex justify-end m-5">
            <button
              onClick={() => setOpen(false)} // Handler saat tombol close diklik
              type="button"
              className="text-black bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              {/* Ikon silang untuk tombol close */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {/* Navigasi mobile */}
          <nav className="flex flex-col gap-5 ps-5 pt-6">
            <Link
              to="/"
              className="text-warnaUtama font-outfit font-medium text-sm"
            >
              Beranda
            </Link>
            <Link
              to="/tentangKami"
              className="text-warnaUtama font-outfit font-medium text-sm"
            >
              Tentang Kami
            </Link>
            <Link
              to="/esktrakulikuler"
              className="text-warnaUtama font-outfit font-medium text-sm"
            >
              Ekstrakulikurer
            </Link>
            <Link
              to="/informasippdb"
              className="text-warnaUtama font-outfit font-medium text-sm"
            >
              Informasi PPDB
            </Link>
          </nav>
        </div>

        {/* Overlay latar belakang saat menu mobile terbuka */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition duration-300 ease-in-out z-30"
            onClick={() => setOpen(false)} // Handler saat overlay diklik untuk menutup menu
          ></div>
        )}
      </div>
    </div>
  );
}
