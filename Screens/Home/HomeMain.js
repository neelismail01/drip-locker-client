import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../Redux/userSlice';

const HomeMain = () => {
    const userInfo = useSelector(selectUserInfo);

    return (
        <View style={styles.container}>
            <Text>{userInfo.id}</Text>
            <Text>{userInfo.name}</Text>
            <Text>{userInfo.email}</Text>
            <Text>{userInfo.phone}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default HomeMain;