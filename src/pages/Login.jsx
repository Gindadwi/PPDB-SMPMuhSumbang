import React, { useState } from 'react'
import Button from '../common/Button'
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const Login = ({onSwitchToRegister}) => {
    const [showPassword, setShowPassword] = useState();

    const handleCreate = (e) => {
        e.preventDefault();
        if (onSwitchToRegister) {
            onSwitchToRegister();
        }
    }

    return (
        <div className='bg-white'>
            <h1 className='text-black text-[20px] font-outfit font-medium'>Masuk ke akun anda.</h1>
            <form action="" className='mt-5'>

                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="" className='text-black font-outfit text-[16px] font-medium'>Username</label>
                        <input type="text" className='w-full rounded-md text-[12px] font-normal border-gray-300 shadow-md' placeholder='masukan username kamu' />
                    </div>
                    <div className='flex flex-col relative'>
                        <label htmlFor="" className='text-black font-outfit text-[16px] font-medium'>Password</label>
                        <input type={showPassword ? "text" : "password"} className={`w-full rounded-md text-[12px] font-normal border-gray-300 shadow-md`} placeholder='••••••••••••••' />

                        <button type="button" className="absolute right-4 top-12 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Icon icon="mdi:eye-off-outline" width={20} /> : <Icon icon="mdi:eye-outline" width={20} />}
                        </button>

                    </div>

                </div>

                <div className='w-full items-center justify-center flex mt-5'>
                    <Button
                        name={'Masuk'}
                        className={` w-60 bg-warnaUtama text-white font-normal`}
                    />
                </div>
            </form>

            <div className=' w-full items-center justify-center flex flex-row gap-2 mt-6 lg:mt-10 lg:gap-40'>
                <p className='text-[14px] lg:text-[16px] font-outfit font-normal'>Belum Memiliki Akun?</p>
                <a href='#' 
                onClick={handleCreate}
                className='text-[14px] lg:text-[16px] font-outfit font-semibold text-warnaUtama'>Create Account</a>
            </div>
        </div>
    )
};

Login.propTypes = {
    onSwitchToRegister: PropTypes.func.isRequired,
};

export default Login
