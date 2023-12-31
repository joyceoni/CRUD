import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
import ClinicalRecord from './ClinicalRecord';

const PatientRecord = () => {
  const [records, setRecords] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [editRecord, setEditRecord] = useState(null);

  const addRecord = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '' && date.trim() !== '') {
      const newRecords = {
        id: Date.now().toString(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        date: date.trim(),
      };

      setRecords([...records, newRecords]);
      setFirstName('');
      setLastName('');
      setDate('');
    }
  };



  const startEditRecord = (id) => {
    const record = records.find((item) => item.id === id);
    setEditRecord(record);
  };

  const cancelEditRecord= () => {
    setEditRecord(null);
  };

  const updateRecord = () => {
    if (editRecord && editRecord.firstName.trim() !== '' && editRecord.lastName.trim() !== '' && editRecord.date.trim() !== '') {
      const updatedRecords = records.map((record) => {
        if (record.id === editRecord.id) {
          return { ...editRecord };
        }
        return record;
      });
      setRecords(updatedRecords);
      setEditRecord(null);
    }
  };

  const deleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <ScrollView style={styles.container}
    contentContainerStyle={{
        flexGrow: 1,
        padding: 20
      }}>

        
        <View style={styles.pink}>

        </View>
      <View>
      <Text style={styles.welcm}>
Welcome To Tooth Fixer
        </Text>
        <Text style={styles.pat}>
Patients
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity style={styles.addButton} onPress={addRecord}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <DataTable>
        <DataTable.Header >
          <DataTable.Title>First Name</DataTable.Title>
          <DataTable.Title>Last Name</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {records.map((record) => (
          <DataTable.Row key={record.id}>
            <DataTable.Cell>{record.firstName}</DataTable.Cell>
            <DataTable.Cell>{record.lastName}</DataTable.Cell>
            <DataTable.Cell>{record.date}</DataTable.Cell>
            <DataTable.Cell>
            <IconButton
                icon="pencil"
                size={20}
                onPress={() => startEditRecord(record.id)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => deleteRecord(record.id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      {editRecord && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="FName"
            value={editRecord.firstName}
            onChangeText={(text) => setEditRecord({ ...editRecord, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="LName"
            value={editRecord.lastName}
            onChangeText={(text) => setEditRecord({ ...editRecord, lastName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={editRecord.date}
            onChangeText={(text) => setEditRecord({ ...editRecord, date: text })}
          />
          <TouchableOpacity style={styles.updateButton} onPress={updateRecord}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEditRecord}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}


      <ClinicalRecord/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:80,
  },
  welcm:{
    marginBottom:30,
  fontSize:30,
  color:"#3c998b"

  },
  pat:{
    marginBottom:20,
    fontSize:20,
    textAlign:"center",
    color:"white"
    },

    pink:{
        marginTop:10,
        backgroundColor:"pink",
        width:100,
        height:70,
       right:40,
        position:"absolute"
      

      
        },

  inputContainer: {
    color:"white",
    flexDirection: 'row',
    marginBottom: 16,
 
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    padding: 8,
  },
  editContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#3c998b',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#3c998b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  updateButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
  },
});

export default PatientRecord;
