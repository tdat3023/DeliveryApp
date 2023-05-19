import React from "react";
import { Text } from "react-native";

const HighlightedText = ({ text, highlightText }) => {
  if (!highlightText) return <Text>Tên đơn hàng:{text}</Text>;
  if (!text) return <Text>Tên đơn hàng:{text}</Text>;
  function getHighlightedText(text, higlight) {
    // Split text on higlight term, include term itself into parts, ignore case
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <Text style={{ backgroundColor: "#e8bb49" }}>{part}</Text>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }
  return <Text>Tên đơn hàng:{getHighlightedText(text, highlightText)}</Text>;
};

export default HighlightedText;
