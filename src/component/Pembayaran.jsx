import React from "react";
import Button from "../common/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FeeTable = () => {
  const downloadPDF = async () => {
    const element = document.getElementById("fee-table");

    // Render tabel ke dalam canvas
    const canvas = await html2canvas(element, { scale: 2 });

    // Hitung ukuran tabel dan PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", [210, 330]); // Custom F4 size in mm
    const pdfWidth = pdf.internal.pageSize.width - 20; // Width with margin
    const pdfHeight = pdf.internal.pageSize.height - 20; // Height with margin

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Hitung skala untuk menyesuaikan ke satu halaman PDF
    const scaleX = pdfWidth / imgWidth;
    const scaleY = pdfHeight / imgHeight;
    const scale = Math.min(scaleX, scaleY);

    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    // Tambahkan gambar ke PDF dengan skala
    pdf.addImage(imgData, "PNG", 50, 10, scaledWidth, scaledHeight);

    // Simpan PDF
    pdf.save("FeeTable.pdf");
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-center text-xl font-bold mb-2">DAFTAR ULANG</h1>
      <h2 className="text-center text-lg mb-4">
        KELAS 7 SMP MUHAMMADIYAH SUMBANG
      </h2>

      <div id="fee-table">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200 text-[12px] font-poppins">
              <th className="border border-gray-500 px-2 py-2">no</th>
              <th className="border border-gray-500 px-2 py-2">Registrasi</th>
              <th className="border border-gray-500 px-2 py-2">
                Pembayaran Putra (PA)
              </th>
              <th className="border border-gray-500 px-2 py-2">
                Pembayaran Putri (PI)
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "1",
                "SPP Bulan Juli 2024 - Juni 2025 (150.000 x 12 Bulan)",
                "1.800.000",
                "1.800.000",
              ],
              ["2", "Kegiatan OSIS/IPM/HW", "100.000", "100.000"],
              ["3", "Kegiatan Ekstrakurikuler", "100.000", "100.000"],
              ["4", "Kegiatan Asesmen", "175.000", "175.000"],
              ["5", "Kegiatan MPLS dan FORTASI", "150.000", "150.000"],
              [
                "6",
                "Kartu anggota OSIS, Perpustakaan, IPM, dan Foto raport",
                "40.000",
                "40.000",
              ],
              ["7", "Sampul Raport", "50.000", "50.000"],
              [
                "8",
                "Perawatan Praktek Komputer dan Rehab",
                "1.100.000",
                "1.100.000",
              ],
              ["9", "Dansos", "50.000", "50.000"],
              ["10", "Buku Pegangan Siswa", "600.000", "600.000"],
              ["11", "Infak Jum’atan", "120.000", "120.000"],
              ["12", "Iuran PMI", "20.000", "20.000"],
              [
                "13",
                "Seragam (5 Macam) dan Atribut Putra (PA)",
                "1.150.000",
                "-",
              ],
              [
                "14",
                "Seragam (5 Macam) dan Atribut DAN 3 Jilbab Putri (PI)",
                "-",
                "1.200.000",
              ],
              ["15", "Buku Kegiatan Ramadhan", "20.000", "20.000"],
            ].map((item, index) => (
              <tr key={index} className="text-center text-[12px]">
                <td className="border border-gray-500 px-2 py-1">{item[0]}</td>
                <td className="border border-gray-500 px-2 py-1 text-left">
                  {item[1]}
                </td>
                <td className="border border-gray-500 px-2 py-1 text-left">
                  {item[2]}
                </td>
                <td className="border border-gray-500 px-2 py-1 text-left">
                  {item[3]}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-[12px]">
              <td
                colSpan="2"
                className="border border-gray-500 px-2 py-2 text-right"
              >
                Jumlah
              </td>
              <td className="border border-gray-500 px-4 py-2">5.465.000</td>
              <td className="border border-gray-500 px-4 py-2">5.515.000</td>
            </tr>
            <tr className="text-[12px]">
              <td
                colSpan="3"
                className="border border-gray-500 px-4 py-2 text-right"
              >
                Daftar Ulang Dibayar 50% Putra
              </td>
              <td className="border border-gray-500 px-4 py-2 text-center">
                2.732.500
              </td>
            </tr>
            <tr className="text-[12px]">
              <td
                colSpan="3"
                className="border border-gray-500 px-4 py-2 text-right"
              >
                Daftar Ulang Dibayar 50% Putri
              </td>
              <td className="border border-gray-500 px-4 py-2 text-center">
                2.757.500
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex items-end justify-end mt-3">
        <Button
          name="Cetak Pembayaran"
          onClick={downloadPDF}
          className={`bg-warnaUtama text-white font-poppins`}
        />
      </div>
    </div>
  );
};

export default FeeTable;
