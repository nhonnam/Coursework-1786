import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Database from "../../Database";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [hikes, setHikes] = useState([]);

  const onSubmit = async () => {
    const data = await Database.searchHikes(search);
    setHikes(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <Button onPress={onSubmit} title="Search" />
      {hikes.length > 0 && (
        <FlatList
          data={hikes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate("Edit", { hike: item })}
              >
                <Text style={styles.itemText}>{item.name}</Text>
                <View style={styles.buttonContainer}>
                  <Button title="more" />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
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
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default SearchScreen;
