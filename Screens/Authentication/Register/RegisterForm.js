import React, { useState } from 'react';
import axios from 'axios';

import GetName from './GetName';
import GetEmail from './GetEmail';
import GetAddress from './GetAddress';
import GetPassword from './GetPassword';
import ConfirmRegistration from './ConfirmRegistration';

import { BASE_URL } from "@env"

import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, selectRegisterInfo, clearRegister } from '../../../Redux/registerSlice';
import { setUserInfo } from '../../../Redux/userSlice';

const RegisterForm = ({ navigation }) => {
    const [registrationStep, setRegistrationStep] = useState(1);

    const dispatch = useDispatch();
    const registerData = useSelector(selectRegisterInfo);

    const handleSetName = (data) => {
        dispatch(setName(data))
        setRegistrationStep(2);
    }

    const handleSetEmail = (data) => {
        dispatch(setEmail(data))
        setRegistrationStep(3);
    }

    const handleSetAddress = () => {
        setRegistrationStep(4)
    }

    const handleSetPassword = (data) => {
        dispatch(setPassword(data))
        setRegistrationStep(5);
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

    if (registrationStep === 1) {
        return (
            <GetName
                handleSetName={handleSetName}
            />
        )
    } else if (registrationStep === 2) {
        return (
            <GetEmail
                handleSetEmail={handleSetEmail}
            /> 
        )
    } else if (registrationStep === 3) {
        return (
            <GetAddress
                navigation={navigation}
                handleSetAddress={handleSetAddress}
            />          
        )
    } else if (registrationStep === 4) {
        return (
            <GetPassword
                handleSetPassword={handleSetPassword}
            />
        )
    } else {
        return (
            <ConfirmRegistration
                handleRegister={handleRegister}
            /> 
        )
    }
}

export default RegisterForm;