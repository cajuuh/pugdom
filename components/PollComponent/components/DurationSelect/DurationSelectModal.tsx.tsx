import React from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../../hooks/useTheme";
import { PugText } from "../../../Text/Text";
import { DurationSelectModalProps } from "../../../interfaces";

const DurationSelectModal: React.FC<DurationSelectModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const theme = useTheme();

  const durations = [
    { label: "5 Minutes", value: 5 },
    { label: "30 Minutes", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "6 Hours", value: 360 },
    { label: "12 Hours", value: 720 },
    { label: "1 Day", value: 1440 },
    { label: "3 Days", value: 4320 },
    { label: "7 Days", value: 10080 },
  ];

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.modalBackground },
          ]}
        >
          <ScrollView>
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration.value}
                style={styles.option}
                onPress={() => {
                  onSelect(duration);
                  onClose();
                }}
              >
                <PugText
                  style={[styles.optionText, { color: theme.textColor }]}
                >
                  {duration.label}
                </PugText>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.option} onPress={onClose}>
            <PugText style={[styles.optionText, { color: theme.textColor }]}>
              Close
            </PugText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    alignSelf: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
});

export default DurationSelectModal;
