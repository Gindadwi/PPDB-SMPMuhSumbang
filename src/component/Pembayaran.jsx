import React from "react";
import Button from "../common/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const FeeTable = () => {
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Header
    doc.setFontSize(14);
    doc.text("DAFTAR ULANG", doc.internal.pageSize.getWidth() / 2, 10, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(
      "KELAS 7 SMP MUHAMMADIYAH SUMBANG",
      doc.internal.pageSize.getWidth() / 2,
      17,
      { align: "center" }
    );

    // Data tabel
    const tableColumn = [
      "No",
      "Registrasi",
      "Pembayaran Putra (PA)",
      "Pembayaran Putri (PI)",
    ];
    const tableRows = [
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
      ["8", "Perawatan Praktek Komputer dan Rehab", "1.100.000", "1.100.000"],
      ["9", "Dansos", "50.000", "50.000"],
      ["10", "Buku Pegangan Siswa", "600.000", "600.000"],
      ["11", "Infak Jum’atan", "120.000", "120.000"],
      ["12", "Iuran PMI", "20.000", "20.000"],
      ["13", "Seragam (5 Macam) dan Atribut Putra (PA)", "1.150.000", "-"],
      [
        "14",
        "Seragam (5 Macam) dan Atribut DAN 3 Jilbab Putri (PI)",
        "-",
        "1.200.000",
      ],
      ["15", "Buku Kegiatan Ramadhan", "20.000", "20.000"],
    ];

    const footerRows = [
      [
        {
          content: "Jumlah",
          colSpan: 2,
          styles: { halign: "right", fontStyle: "bold" }, // Atur alignment dan gaya font
        },
        "5.465.000",
        "5.515.000",
      ], // Tetap seperti biasa
      [
        {
          content: "Daftar Ulang Dibayar 50% Putra", // Teks
          colSpan: 3, // Menggabungkan 3 kolom pertama
          styles: { halign: "right" }, // Atur alignment dan gaya font
        },
        "2.732.500", // Kolom terakhir tetap untuk nilai
      ],
      [
        {
          content: "Daftar Ulang Dibayar 50% Putri", // Teks
          colSpan: 3, // Menggabungkan 3 kolom pertama
          styles: { halign: "right" }, // Atur alignment dan gaya font
        },
        "2.757.500", // Kolom terakhir tetap untuk nilai
      ],
    ];

    // Generate table
    // Generate table
    doc.autoTable({
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      foot: footerRows,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        text: "Poppins",
        lineColor: [0, 0, 0], // Garis hitam
        lineWidth: 0.5, // Ketebalan garis
      },
      headStyles: {
        fillColor: [211, 211, 211], // Abu-abu muda
        textColor: [0, 0, 0], // Teks hitam
        fontStyle: "bold",
        halign: "center",
      },
      footStyles: {
        textColor: [0, 0, 0],
        fillColor: [255, 255, 255],
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0], // Garis hitam
        lineWidth: 0.5, // Ketebalan garis
      },
    });

    // Ambil posisi terakhir tabel agar tanda tangan tidak tertutup
    const finalY = doc.lastAutoTable.finalY || 25;

    // Tanggal dan Tanda Tangan (Diletakkan setelah tabel)
    doc.setFont("times", "normal");
    doc.text(`Sumbang`, 140, finalY + 10); // Tambah 10 agar ada jarak
    doc.text("Bendahara Sekolah", 140, finalY + 16);
    doc.text("PRAMESIA OKTA VIANI, S.Pd", 140, finalY + 36);
    doc.text(`NIP. 12345678`, 140, finalY + 43);

    // Simpan PDF
    doc.save("Rincian-Pembayaran.pdf");
  };

  return (
    <div className="container mx-auto p-4 mt-20  lg:max-w-[1080px]">
      <h1 className="text-center text-xl font-bold mb-2 ">DAFTAR ULANG</h1>
      <h2 className="text-center text-lg mb-4">
        KELAS 7 SMP MUHAMMADIYAH SUMBANG
      </h2>

      <div id="fee-table" className="w-full flex justify-center items-center ">
        <table className="table-auto w-full border-collapse border border-gray-500 lg:max-w-[1080px]">
          <thead>
            <tr className="bg-gray-200 text-[12px] lg:text-[14px] font-poppins">
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
              <tr
                key={index}
                className="text-center text-[12px] lg:text-[14px]"
              >
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
            <tr className="font-bold text-[12px] lg:text-[14px] ">
              <td
                colSpan="2"
                className="border border-gray-500 px-2 py-2 text-right lg:text-[14px]"
              >
                Jumlah
              </td>
              <td className="border border-gray-500 px-4 py-2">5.465.000</td>
              <td className="border border-gray-500 px-4 py-2">5.515.000</td>
            </tr>
            <tr className="text-[12px] lg:text-[14px]">
              <td
                colSpan="3"
                className="border border-gray-500 px-4 py-2 text-right  lg:text-[14px]"
              >
                Daftar Ulang Dibayar 50% Putra
              </td>
              <td className="border border-gray-500 px-4 py-2 text-center lg:text-[14px]">
                2.732.500
              </td>
            </tr>
            <tr className="text-[12px] lg:text-[14px]">
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
      <div className="w-full flex items-end justify-end mt-10">
        <div className="mt-4 text-left">
          <p className="lg:text-[18px] font-poppins">Sumbang, 19 Juni 2024</p>
          <p className="lg:text-[18px] font-poppins">Bendahara Sekolah</p>
          <p className="mt-8 lg:mt-16 font-bold lg:text-[18px] font-poppins">
            PRAMESIA OKTA VIANI, S.Pd
          </p>
        </div>
      </div>
      <div className="flex items-end justify-end mt-10">
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
