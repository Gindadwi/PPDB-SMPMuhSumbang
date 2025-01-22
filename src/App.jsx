import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import FormPendaftaran from "./pages/FormPendaftaran";
import TentangKami from "./pages/TentangKami";
import InformasiPPDB from "./pages/InformasiPPDB";
import { Toaster } from "react-hot-toast";
import Pembayaran from "./component/Pembayaran";

import "./App.css";
import Status from "./pages/Status";
import EkstrakurikulerPage from "./pages/Ekstrakulikuler";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Navbar />
        <div className="mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formpendaftaran" element={<FormPendaftaran />} />
            <Route path="/informasippdb" element={<InformasiPPDB />} />
            <Route path="/tentangkami" element={<TentangKami />} />
            <Route path="/status" element={<Status />} />
            <Route path="/esktrakulikuler" element={<EkstrakurikulerPage />} />
            <Route path="/pembayaran" element={<Pembayaran />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
