import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-date-picker";

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a date:</Text>
      <DatePicker
        date={selectedDate}
        onDateChange={handleDateChange}
        mode="date"
        style={styles.datePicker}
      />
      <Text style={styles.date}>{selectedDate.toDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  datePicker: {
    width: 200,
    height: 200,
  },
  date: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default MyDatePicker;
