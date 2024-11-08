import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Icon } from '@iconify/react';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        if (onSwitchToRegister) {
            onSwitchToRegister();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://be-smp-muh-sumbang.vercel.app/users/login', {
                username: username.trim(),  // Menghilangkan spasi yang tidak perlu
                password: password.trim(),    // Menghilangkan spasi yang tidak perlu
            });
            console.log(response.data);
            toast.success('Login Berhasil');
            onLoginSuccess(); // Call this function when login succeeds
            // Tambahkan logika untuk mengarahkan pengguna atau menyimpan data pengguna di sini
        } catch (error) {
            console.error('error login', error.response ? error.response.data : error.message);
            toast.error('Login gagal! Pastikan username dan password benar.');
        }
    };

    return (
        <div className='bg-white'>
            <h1 className='text-black text-[20px] font-outfit font-medium'>Masuk ke akun anda.</h1>
            <form onSubmit={handleLogin} className='mt-5'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label className='text-black font-outfit text-[16px] font-medium'>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full rounded-md text-[12px] font-normal border-gray-300 shadow-md'
                            placeholder='masukan username kamu'
                            required
                        />
                    </div>
                    <div className='flex flex-col relative'>
                        <label className='text-black font-outfit text-[16px] font-medium'>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full rounded-md text-[12px] font-normal border-gray-300 shadow-md'
                            placeholder='••••••••••••••'
                            required
                        />
                        <button type="button" className="absolute right-4 top-12 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Icon icon="mdi:eye-off-outline" width={20} /> : <Icon icon="mdi:eye-outline" width={20} />}
                        </button>
                    </div>
                </div>
                <div className='w-full items-center justify-center flex mt-5'>
                    <Button
                        name={'Masuk'}
                        type={'submit'}
                        className={`w-60 bg-warnaUtama text-white font-normal`}
                    />
                </div>
            </form>
            <div className='w-full items-center justify-center flex flex-row gap-2 mt-6 lg:mt-10 lg:gap-40'>
                <p className='text-[14px] lg:text-[16px] font-outfit font-normal'>Belum Memiliki Akun?</p>
                <a href='#'
                    onClick={handleCreate}
                    className='text-[14px] lg:text-[16px] font-outfit font-semibold text-warnaUtama'>
                    Create Account
                </a>
            </div>
        </div>
    );
};

Login.propTypes = {
    onSwitchToRegister: PropTypes.func.isRequired,
};

export default Login;
