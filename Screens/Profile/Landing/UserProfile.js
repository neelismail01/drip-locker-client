import React from "react";

import ProfileMain from '../../../components/Profile/ProfileMain';

const UserProfile = ({ navigation, route }) => {

    return (
        <ProfileMain
            navigation={navigation}
            route={route}
        />
    )
};

export default UserProfile;