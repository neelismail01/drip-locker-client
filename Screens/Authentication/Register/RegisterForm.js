import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GetName from './GetName';
import GetEmail from './GetEmail';
import GetPassword from './GetPassword';
import ConfirmRegistration from './ConfirmRegistration';

import { AWS_BASE_URL } from "../../../util/common";

import { useDispatch } from 'react-redux';
import { setAccessToken, setUserInfo } from "../../../Redux/userSlice";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSetName = (data) => {
        setName(data);
    }

    const handleSetEmail = (data) => {
        setEmail(data);
    }

    const handleSetPassword = (data) => {
        setPassword(data);
    }

    const handleRegister = async () => {
        try {
            setLoading(true);
            const registerData = { name, email, password }
            const response = await axios.post(`${AWS_BASE_URL}users/register`, registerData);
            if (response.status === 200) {
                await AsyncStorage.setItem('access_token', response.data.body.accessToken);
                setLoading(false);
                dispatch(setAccessToken(response.data.body.accessToken));
                dispatch(setUserInfo(response.data.body.userInfo));
            } else {
                setLoading(false);
                setError(response.data.body);
            }
        } catch (err) {
            setLoading(false);
            setError('An error occurred while creating your account. Please try again.');
            console.log(err);
            console.log('An error occurred while creating your account. Please try again.');
        }
    }

    if (name === '') {
        return (
            <GetName
                handleSetName={handleSetName}
            />
        )
    } else if (email === '') {
        return (
            <GetEmail
                handleSetEmail={handleSetEmail}
            /> 
        )
    } else if (password === '') {
        return (
            <GetPassword
                handleSetPassword={handleSetPassword}
            /> 
        )
    } else {
        return (
            loading ?
            <SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="small" />
            </SafeAreaView> :
            <ConfirmRegistration
                handleRegister={handleRegister}
                error={error}
            /> 
        )
    }
}

export default RegisterForm;