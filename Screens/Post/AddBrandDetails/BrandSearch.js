import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { setBrandDetails, selectPostInfo } from '../../../Redux/postSlice';

const { height } = Dimensions.get('window');

const BrandSearch = ({ navigation }) => {
  const postInfo = useSelector(selectPostInfo);
  const [brandQuery, setBrandQuery] = useState('');
  const [brandName, setBrandName] = useState(postInfo.brandName)
  const [brandLogo, setBrandLogo] = useState(postInfo.brandLogo);
  const [brandWebsite, setBrandWebsite] = useState(postInfo.brandWebsite);
  const dispatch = useDispatch();

  const searchBrand = async () => {
    try {
      const CLEARBIT_URL = "https://autocomplete.clearbit.com/v1/companies/suggest?query=";
      const editedBrand = brandQuery.split(' ').join('');
      const response = await axios.get(`${CLEARBIT_URL}${editedBrand}`);
      if (response.data.length > 0) {
        setBrandName(response.data[0].name);
        setBrandLogo(response.data[0].logo);
        setBrandWebsite(response.data[0].domain);
      } else {
        setBrandName(brandQuery);
        setBrandLogo('');
        setBrandWebsite('');
      }
    } catch (err) {
      console.log(err);
      console.log("An error occurred while searching for the provided brand.")
    }
  }

  const handleIncorrectBrandSearch = () => {
    setBrandName(brandQuery)
    setBrandLogo('');
    setBrandWebsite('');
  }

  const handleAddBrand = () => {
    const brandDetails = {
      brandName: brandName,
      brandLogo: brandLogo,
      brandWebsite: brandWebsite
    }
    dispatch(setBrandDetails(brandDetails));
    navigation.navigate('Purchase Details');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.editorBody}>
            <Text style={styles.brandHeader}>Brand Details</Text>
            <Text style={styles.brandHeaderSubtext}>Help your friends learn more about this brand</Text>
                <TextInput
                    placeholder="Search for the brand..."
                    style={styles.textInput}
                    name="brand"
                    value={brandQuery}
                    onChangeText={text => setBrandQuery(text)}
                    onSubmitEditing={searchBrand}
                    returnKeyType="search"
                />
                <View style={styles.brandInfo}>
                  {
                    brandName !== '' &&
                    (
                      brandLogo !== '' ?
                      <View style={styles.brandRowContainer}>
                        <View style={styles.brandRow}>
                          <View>
                            <Text style={styles.brandName}>{brandName}</Text>
                            <Text style={styles.websiteText}>{brandWebsite}</Text>
                          </View>
                          <Image
                            style={styles.logo}
                            source={{
                              uri: brandLogo
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={handleIncorrectBrandSearch}
                        >
                          <Text style={styles.brandRowSubtext}>
                            Is this not the correct brand? Let's fix it.
                          </Text>
                        </TouchableOpacity>
                      </View> :
                      <View style={styles.brandRowContainer}>
                        <View style={styles.brandRow}>
                          <Text style={styles.brandName}>{brandName}</Text>
                          <TextInput
                            style={styles.unknownBrandWebsiteInput}
                            placeholder="Brand website"
                            name="correctedBrandWebsite"
                            value={brandWebsite}
                            onChangeText={text => setBrandWebsite(text)}
                          />
                        </View>
                      </View>
                    )
                  }
                </View>
                <View style={{ alignItems: "center", width: "100%" }}>
                  <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={handleAddBrand}
                  >
                      <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  editorBody: {
    backgroundColor: "white",
    height: 0.4 * (height - 80),
    justifyContent: "flex-start",
    padding: 20
  },
  brandHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  brandHeaderSubtext: {
    fontSize: 13,
    color: "grey",
    marginBottom: 20
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 16
  },
  textInput: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 7.5,
    borderColor: "grey",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    fontSize: 14
  },
  brandSearchText: {
    color: "white",
  },
  brandInfo: {
    width: "100%",
    height: 100,
    marginVertical: 15
  },
  brandRowContainer: {
    justifyContent: "space-evenly",
    height: "100%"
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: "center"
  },
  websiteText: {
    marginTop: 5,
    color: "grey",
    fontSize: 12
  },
  unknownBrandWebsiteInput: {
    height: 40,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "grey",
    width: "50%",
    fontSize: 12,
  },
  brandRowSubtext: {
    fontSize: 11,
  },
  buttonContainer: {
    height: 45,
    marginTop: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.5,
    backgroundColor: "black",
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 7
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
});

export default BrandSearch;