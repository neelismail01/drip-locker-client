import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const OrdersMain = () => {
    return (
        <View style={styles.container}>
            <Text>Orders Screen</Text>
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

  export default OrdersMain;