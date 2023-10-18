import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import Database from "../../Database";

const EditScreen = ({ route }) => {
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onDatePickerChange = (event, selectedDate) => {
    setShow(false);
    setNewDate(selectedDate);
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

  const [name, setName] = useState(route.params.hike.name);
  const [location, setLocation] = useState(route.params.hike.location);
  const [date, setDate] = useState(route.params.hike.date);
  const [newDate, setNewDate] = useState(null);
  const [selectedId, setSelectedId] = useState(route.params.hike.has_parking);
  const [length, setLength] = useState(route.params.hike.length.toString());
  const [level, setLevel] = useState(route.params.hike.level);
  const [description, setDescription] = useState(route.params.hike.description);

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
      `New hike will be added:\nName: ${name}\nLocation: ${location}\nDate of the hike: ${
        newDate ? newDate.toLocaleDateString() : date
      }\nParking available: ${
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
              id: route.params.hike.id,
              name,
              location,
              date: newDate ? newDate.toLocaleDateString() : date,
              has_parking: selectedId === 1 ? true : false,
              length: Number(length),
              level,
              description,
            };
            await Database.updateHike(hike);
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
          {newDate ? newDate.toLocaleDateString() : date}
        </Text>
      ) : (
        <Text style={styles.text}></Text>
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
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
        defaultButtonText={level}
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

      <Button onPress={onSubmit} title="Save" />
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

export default EditScreen;
