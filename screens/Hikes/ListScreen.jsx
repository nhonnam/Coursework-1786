import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import Database from "../../Database";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "react-native";

const ListScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
        console.log(hikes);
      } catch (error) {
        console.log("Error fetching hike", error);
      }
    };
    fetchData();
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert("Confirmation", "Are you sure to delete this hike?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await Database.deleteHike(id);
          const data = await Database.getHikes();
          setHikes(data);
        },
      },
    ]);
  };

  const handleDeleteAll = () => {
    Alert.alert("Confirmation", "Are you sure to delete all the hikes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await Database.deleteAllHikes();
          setHikes([]);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Delete All" onPress={handleDeleteAll} />
      <Text></Text>
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
                <Button title="delete" onPress={() => handleDelete(item.id)} />
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ListScreen;
