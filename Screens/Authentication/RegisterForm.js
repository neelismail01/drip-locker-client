import React, { useState } from 'react';

import RegisterFormPart1 from './RegisterFormPart1';
import RegisterFormPart2 from './RegisterFormPart2';
import RegisterFormPart3 from './RegisterFormPart3';

const RegisterForm = ({ handleRegister, switchPage }) => {
    const [registrationStage, setRegistrationStage] = useState(1);
    const [userInfo, setUserInfo] = useState();
    const [userAddress, setUserAddress] = useState();

    const handleSubmitUserInfo = (name, email, password) => {
        setUserInfo({
            name,
            email,
            password
        })
        setRegistrationStage(2)
    }

    const handleSubmitAddress = ({ fullAddress, addressPrimaryText, addressSecondaryText, addressPlaceId }) => {
        setUserAddress({
            fullAddress,
            addressPrimaryText,
            addressSecondaryText,
            addressPlaceId
        })
        setRegistrationStage(3)
    }

    const handleConfirmRegister = () => {
        handleRegister({
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            fullAddress: userAddress.fullAddress,
            addressPrimaryText: userAddress.addressPrimaryText,
            addressSecondaryText: userAddress.addressSecondaryText,
            addressPlaceId: userAddress.addressPlaceId
        })
    }

    if (registrationStage === 1) {
        return (
            <RegisterFormPart1
                handleSubmitUserInfo={handleSubmitUserInfo}
                switchPage={switchPage}
            />
        )
    } else if (registrationStage === 2) {
        return (
            <RegisterFormPart2
                handleSubmitAddress={handleSubmitAddress}
            />
        )
    } else {
        return (
            <RegisterFormPart3
                handleConfirmRegister={handleConfirmRegister}
            />
        )
    }
}

export default RegisterForm;