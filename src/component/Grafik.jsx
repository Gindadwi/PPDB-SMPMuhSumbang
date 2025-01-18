import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GrafikPendaftaran = () => {
    const [pendaftaranPerHari, setPendaftaranPerHari] = useState([]);

    useEffect(() => {
        // Fungsi untuk mengambil data dari API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/pendaftar.json');
                const data = response.data;

                // Filter data untuk 7 hari terakhir
                const today = new Date();
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
                });

                const pendaftaranCounts = last7Days.map(date => {
                    return Object.values(data).filter(item =>
                        item.tanggal_daftar.startsWith(date)
                    ).length;
                });

                setPendaftaranPerHari(pendaftaranCounts.reverse()); // Urutkan dari hari paling awal
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Label hari dari 7 hari terakhir
    const labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toLocaleDateString('id-ID', { weekday: 'short' }); // Format: sen, sel, rab, dll.
    });

    // Data untuk Chart.js
    const data = {
        labels,
        datasets: [
            {
                label: 'Jumlah Pendaftaran',
                data: pendaftaranPerHari,
                backgroundColor: '#0D3B66',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grafik Pendaftaran',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default GrafikPendaftaran;
