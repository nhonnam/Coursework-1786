import React, { useMemo, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioGroup from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
import Database from "../../Database";

const AddScreen = () => {
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onDatePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const radioButtons = useMemo(
    () => [
      {
        id: 1,
        label: "Yes",
        value: true,
      },
      {
        id: 0,
        label: "No",
        value: false,
      },
    ],
    []
  );

  const levels = ["Medium", "Low", "High"];

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedId, setSelectedId] = useState(null);
  const [length, setLength] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    if (
      name === "" ||
      location === "" ||
      selectedId == null ||
      length === "" ||
      level === "" ||
      description === ""
    ) {
      console.log(name, location, date, selectedId, length, level, description);
      Alert.alert("Error", "All required fields must be filled.", [
        { text: "OK" },
      ]);
      return;
    }
    Alert.alert(
      "Confirmation",
      `New hike will be added:\nName: ${name}\nLocation: ${location}\nDate of the hike: ${date.toLocaleDateString()}\nParking available: ${
        selectedId === 1 ? "Yes" : "No"
      }\nLength of the hike: ${length}\nDifficulty level: ${level}\n\nAre you sure?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const hike = {
              name,
              location,
              date: date.toLocaleDateString(),
              has_parking: selectedId === 1 ? true : false,
              length: Number(length),
              level,
              description,
            };
            await Database.addHike(hike);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Name */}
      <Text style={styles.text}>
        Name of the hike<Text style={styles.redStar}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
      />

      {/* Location */}
      <Text style={styles.text}>
        Location<Text style={styles.redStar}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setLocation(text)}
        value={location}
      />

      {/* Date */}
      <Text style={styles.text}>
        Date of the hike<Text style={styles.redStar}>*</Text>
      </Text>

      {!show ? (
        <Text onPress={showDatepicker} style={styles.text}>
          {date.toLocaleDateString()}
        </Text>
      ) : (
        <Text style={styles.text}></Text>
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onDatePickerChange}
          style={{
            width: 150,
          }}
        />
      )}

      {/* Parking */}
      <Text style={styles.text}>
        Parking available<Text style={styles.redStar}>*</Text>
      </Text>

      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
      />

      {/* Length */}
      <Text style={styles.text}>
        Length of the hike<Text style={styles.redStar}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setLength(text)}
        value={length}
      />

      {/* Level */}
      <Text style={styles.text}>
        Difficulty level<Text style={styles.redStar}>*</Text>
      </Text>
      <SelectDropdown
        data={levels}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setLevel(selectedItem);
        }}
      />

      {/* Description */}
      <Text style={styles.text}>
        Description<Text style={styles.redStar}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <Button onPress={onSubmit} title="Add" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  redStar: {
    color: "red",
  },
});

export default AddScreen;
