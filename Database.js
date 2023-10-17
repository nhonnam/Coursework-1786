import * as SQLite from "expo-sqlite";

const database_name = "HikeApp.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Hike (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             location TEXT,
             date TEXT,
             has_parking BOOLEAN,
             length REAL,
             level TEXT,
             description TEXT
          );`,
      [],
      () => console.log("Hike table created successfully."),
      (error) => console.log("Error occurred while creating Hike table.", error)
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Observation (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             created_date TEXT,
             note TEXT,
             hike_id INTEGER,
             FOREIGN KEY (hike_id) REFERENCES Hike (id)
          );`,
      [],
      () => console.log("Observation table created successfully."),
      (error) =>
        console.log("Error occurred while creating Observation table.", error)
    );
  });
};

const addHike = (hike) => {
  const { name, location, date, has_parking, length, level, description } =
    hike;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Hike (name, location, date, has_parking, length, level, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, has_parking, length, level, description],
        (_, { insertId }) => {
          console.log(insertId);
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Hike",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Hike WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteAllHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Hike",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const Database = {
  initDatabase,
  addHike,
  getHikes,
  deleteHike,
  deleteAllHikes,
};

export default Database;
