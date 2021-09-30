import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';

import { BASE_URL } from "@env"

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../Redux/userSlice';

const AuthenticationMain = () => {
    const [page, setPage] = useState('login')

    const dispatch = useDispatch();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}users/login`, { email, password })
            dispatch(setUserInfo(response.data.userInfo));

        } catch (err) {
            console.log('An error occurred while logging in. Please try again.');
        }
    }

    const handleRegister = async () => {

    }

    const switchPage = () => {
        if (page === 'login') {
            setPage('register')
        } else {
            setPage('login')
        }
    }

    return (
        <View style={styles.loginContainer}>
            {
                page === 'login' ?
                <LoginForm 
                    handleLogin={handleLogin}
                    switchPage={switchPage}
                /> :
                <RegisterForm
                    handleRegister={handleRegister}
                    switchPage={switchPage}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "white"
    }
})

  export default AuthenticationMain;