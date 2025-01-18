import axios from 'axios';

// Fungsi untuk mendapatkan access token baru menggunakan refresh token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');  // Ambil refresh token dari localStorage

    if (!refreshToken) {
        return null;  // Jika refresh token tidak ada, berarti harus login ulang
    }

    try {
        // Kirim refresh token ke server untuk mendapatkan access token baru
        const response = await axios.post('https://be-smp-muh-sumbang.vercel.app/users/token', { refreshToken });
        const { accessToken } = response.data;

        // Simpan access token baru di localStorage
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return null;  // Jika refresh token gagal, kembalikan null
    }
};

export default refreshAccessToken;
