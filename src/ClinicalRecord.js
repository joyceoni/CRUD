import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,SafeAreaView ,KeyboardAvoidingView, ScrollView} from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';


const ClinicalRecord = () => {
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
      const updatedRecords = Records.map((record) => {
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
    <ScrollView style={styles.container}>
      
      <View>

        <Text style={styles.pat}>
Clinical Records
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="clinic date"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nature..."
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="medicine"
          value={date}
          onChangeText={setDate}
          
        />
        <TouchableOpacity style={styles.addButton} onPress={addRecord}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <DataTable>
        <DataTable.Header  >
          <DataTable.Title >Clinic Date </DataTable.Title>
          <DataTable.Title>Nature Of Sickness</DataTable.Title>
          <DataTable.Title>Medicine</DataTable.Title>
       
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
            placeholder="Clinic Date"
            value={editRecord.firstName}
            onChangeText={(text) => setEditRecord({ ...editRecord, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nature Of Sickness"
            value={editRecord.lastName}
            onChangeText={(text) => setEditRecord({ ...editRecord, lastName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="medicine"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:100,
  },
  
  pat:{
    marginBottom:20,
    fontSize:20,
    textAlign:"center",
    color:"white"
    },

    title:{
       
        
      color:"white"

      
        },

  inputContainer: {
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
    paddingTop:30,
    flexDirection: 'row',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor:'#3c998b',
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
    backgroundColor: 'blue',
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

export default  ClinicalRecord;
