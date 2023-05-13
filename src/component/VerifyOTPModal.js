import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { Modal } from "react-native";
import { View, StyleSheet } from "react-native";

import { Pressable } from "react-native";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const VerifyOTPModal = ({ visible, setVisible, phone, setResult }) => {
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [time, setTime] = useState(60);
  const [messageErr, setMessageErr] = useState("");

  //   useEffect(() => {
  //     if (visible) {
  //       sendVerification();
  //       // setVerificationId("a"); // test
  //       setTime(60);
  //     }
  //   }, [visible]);

  //   useEffect(() => {
  //     if (code && code.length == 6) {
  //       confirmCode();
  //     }
  //     return () => {};
  //   }, [code]);

  //   const sendVerification = async () => {
  //     let phoneInput = "+84" + phone.slice(1, phone.length).trim();

  //     const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //     try {
  //       const id = await phoneProvider.verifyPhoneNumber(
  //         phoneInput,
  //         recaptchaVerifier.current
  //       );
  //       if (id) {
  //         setVerificationId(id);
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //       closeModal();
  //     }
  //   };

  //   function closeModal() {
  //     setVerificationId("");
  //     setCode("");
  //     setMessageErr("");
  //     setVisible(false);
  //   }

  //   const confirmCode = async () => {
  //     const credential = firebase.auth.PhoneAuthProvider.credential(
  //       verificationId,
  //       code
  //     );

  //     try {
  //       const result = await firebase.auth().signInWithCredential(credential);

  //       setResult({
  //         isSuccess: true,
  //       });
  //       closeModal();
  //     } catch (err) {
  //       console.log("error");
  //       setMessageErr("Mã OTP không hợp lệ, vui lòng thử lại");
  //     }
  //   };

  return (
    <Modal style={styles.modal} visible={visible} transparent>
      {verificationId && (
        <View style={styles.fillLayer}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Để lấy thông tin trước đó vui lòng nhập mã xác thực
            </Text>

            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              maxLength={6}
            />
            <Text style={styles.messageErr}>{messageErr}</Text>
            <View style={styles.bottom}>
              <Text style={styles.subText}>6 số mã được gửi vào số </Text>
              <Text style={styles.phone}>{phone}</Text>
              <Text style={styles.subText}> còn hiệu lực trong </Text>
              <Text style={styles.time}>{time}s</Text>
            </View>
            <Pressable
              style={styles.closeIconContainer}
              onPress={() => {
                closeModal();
              }}
            >
              {/* <Icon
                name="close-outline"
                fill={colors.gray}
                style={styles.closeIcon}
              /> */}
            </Pressable>
          </View>
        </View>
      )}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  fillLayer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    backgroundColor: "white",
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "grayLighter",
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "100%",
    textAlign: "center",
    fontSize: 32,
    letterSpacing: 8,
  },
  messageErr: {
    paddingTop: 8,
    color: "red",
  },
  bottom: {
    paddingVertical: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  subText: {
    color: " gray",
  },
  phone: {
    fontWeight: "bold",
    fontSize: 10,
    paddingLeft: 8,
  },
  time: {
    fontSize: 10,
    paddingLeft: 8,
    color: "green",
  },
  closeIconContainer: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 32,
    height: 32,
  },
});

export default VerifyOTPModal;
