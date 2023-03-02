import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function Date() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View>
      <Text>{currentDate}</Text>
    </View>
  );
}
