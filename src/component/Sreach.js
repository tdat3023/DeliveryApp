import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  // Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import { BarCodeScanner } from "expo-barcode-scanner";

const SearchBar = ({ term, setTerm, setOpenQr }) => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    onTermSubmit(term);
    inputRef.current.blur();
  };

  return (
    <View style={styles.backgroundStyle}>
      <TouchableOpacity
        onPress={() => {
          setOpenQr(true);
        }}
      >
        <AntDesign
          style={styles.iconStyle}
          name="scan1"
          size={20}
          color="black"
        />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search"
        value={term}
        onChangeText={(term) => setTerm(term)}
      />
      {term ? (
        <TouchableOpacity
          onPress={() => {
            setTerm("");
          }}
        >
          <AntDesign
            style={styles.iconStyle}
            name="close"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleSubmit}>
          <AntDesign
            style={styles.iconStyle}
            name="search1"
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    fontSize: 18,
    flex: 1,
    paddingLeft: 10,
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    marginRight: "5%",
  },
});

export default SearchBar;
