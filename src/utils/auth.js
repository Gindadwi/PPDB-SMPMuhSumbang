import axios from 'axios';

// Fungsi untuk login
// Fungsi untuk login
export const login = async (email, password) => {
    try {
        const response = await axios.post(
            'https://be-smp-muh-sumbang.vercel.app/users/login', 
            { email, password },
            { withCredentials: true }  // Tambahkan ini
        );
        const { accessToken, refreshToken } = response.data;

        // Simpan token di localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return true; // Login berhasil
    } catch (error) {
        console.error('Login failed:', error);
        return false; // Login gagal
    }
};

// Fungsi untuk register
export const register = async (name, email, password) => {
    try {
        const response = await axios.post(
            'https://be-smp-muh-sumbang.vercel.app/users/register',
            { name, email, password },
            { withCredentials: true }  // Tambahkan ini
        );
        return true; // Register berhasil
    } catch (error) {
        console.error('Register failed:', error);
        return false; // Register gagal
    }
};


// Fungsi untuk logout
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};
