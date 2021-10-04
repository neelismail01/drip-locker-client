import React, { useState } from 'react';
import axios from 'axios';

import GetName from './GetName';
import GetEmail from './GetEmail';
import GetAddress from './GetAddress';
import GetPassword from './GetPassword';
import ConfirmRegistration from './ConfirmRegistration';

import { BASE_URL } from "@env";

import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, selectRegisterInfo, clearRegister } from '../../../Redux/registerSlice';
import { setUserInfo } from '../../../Redux/userSlice';

const RegisterForm = ({ navigation }) => {

    const dispatch = useDispatch();
    const registerData = useSelector(selectRegisterInfo);

    const handleSetName = (data) => {
        dispatch(setName(data))
    }

    const handleSetEmail = (data) => {
        dispatch(setEmail(data))
    }

    const handleSetPassword = (data) => {
        dispatch(setPassword(data))
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${BASE_URL}users/register`, registerData)
            dispatch(setUserInfo(response.data.userInfo));
            dispatch(clearRegister())
        } catch (err) {
            console.log(err);
            console.log('An error occurred while creating your account. Please try again.');
        }
    }

    if (registerData.password !== undefined) {
        return (
            <ConfirmRegistration
                handleRegister={handleRegister}
            /> 
        )
    } else if (registerData.fullAddress !== undefined) {
        return (
            <GetPassword
                handleSetPassword={handleSetPassword}
            />
        ) 
    } else if (registerData.email !== undefined) {
        return (
            <GetAddress
                navigation={navigation}
            />          
        )
    } else if (registerData.name !== undefined) {
        return (
            <GetEmail
                handleSetEmail={handleSetEmail}
            /> 
        )
    } else {
        return (
            <GetName
                handleSetName={handleSetName}
            />
        )
    }
}

export default RegisterForm;