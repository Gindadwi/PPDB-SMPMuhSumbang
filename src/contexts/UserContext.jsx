// UserContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);  // Hook untuk mengakses UserContext
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loginUser = async (usernameOrEmail) => {
        try {
            const response = await axios.get('https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/RegisterLogin.json');
            const users = response.data;
            const user = Object.values(users).find(
                (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
            );
            if (user) {
                setCurrentUser(user); // Simpan data pengguna yang berhasil login
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <UserContext.Provider value={{ currentUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};
