import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAppContext } from "../../context/AppContext";
import { PollDrawerProps } from "../interfaces";
import { PugText, PugTextInput } from "../Text/Text";
import { useTheme } from "../../hooks/useTheme";
import DurationSelectModal from "./components/DurationSelect/DurationSelectModal.tsx";
import CustomIcon from "../../utils/Icons";

interface DurationObject {
  label: string;
  value: number;
}

const PollComponent = forwardRef<any, PollDrawerProps>(
  ({ onSavePoll }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
    const [duration, setDuration] = useState<DurationObject>();
    const { instanceInfo } = useAppContext();
    const [isDurationModalVisible, setDurationModalVisible] = useState(false);

    const theme = useTheme();

    const maxOptions = instanceInfo?.polls?.max_options || 4;
    const maxCharactersPerOption =
      instanceInfo?.polls?.max_characters_per_option || 255;

    const toggleDurationModal = () => {
      setDurationModalVisible(!isDurationModalVisible);
    };

    useImperativeHandle(ref, () => ({
      openSheet() {
        sheetRef.current?.expand();
      },
      closeSheet() {
        sheetRef.current?.close();
      },
    }));

    const handleOptionChange = (text: string, index: number) => {
      const updatedOptions = [...pollOptions];
      updatedOptions[index] = text;
      setPollOptions(updatedOptions);
    };

    const addPollOption = () => {
      if (pollOptions.length < maxOptions) {
        setPollOptions([...pollOptions, ""]);
      }
    };

    const removePollOption = (index: number) => {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    };

    const handleSavePoll = () => {
      onSavePoll({ options: pollOptions, duration });
      sheetRef.current?.close();
    };

    return (
      <View style={styles.container}>
        {pollOptions.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <PugTextInput
              style={[
                styles.input,
                {
                  color: theme.textColor,
                  borderColor: theme.drawerHandleColor,
                },
              ]}
              value={option}
              maxLength={maxCharactersPerOption}
              placeholderTextColor={theme.placeholderTextColor}
              placeholder={`Option ${index + 1}`}
              onChangeText={(text) => handleOptionChange(text, index)}
            />
            {pollOptions.length > 2 && (
              <TouchableOpacity onPress={() => removePollOption(index)}>
                <View style={styles.deleteButton}>
                  <CustomIcon
                    name="TrashIcon"
                    size={20}
                    color={theme.textColor}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
        {pollOptions.length < maxOptions && (
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.primaryColor }]}
            onPress={addPollOption}
          >
            <PugText style={{ color: theme.textColor }}>Add Option</PugText>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{ height: 45 }} onPress={toggleDurationModal}>
          <View
            style={{
              borderColor: theme.drawerHandleColor,
              borderWidth: 1,
              borderRadius: 8,
              height: 50,
            }}
          >
            <View style={styles.durationContainer}>
              <PugText style={{ color: theme.textColor }}>Duration:</PugText>
              <PugText style={{ color: theme.textColor }}>
                {duration?.label ? duration.label : "Select Duration"}
              </PugText>
            </View>
          </View>
        </TouchableOpacity>
        <DurationSelectModal
          visible={isDurationModalVisible}
          onClose={toggleDurationModal}
          onSelect={(durationValue) => setDuration(durationValue)}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  removeText: {
    marginLeft: 10,
    color: "red",
  },
  addButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  duration: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  durationContainer: {
    paddingHorizontal: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  deleteButton: {
    marginHorizontal: 10,
  },
});

export default PollComponent;
