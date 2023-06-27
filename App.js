import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import PatientRecord from './src/RecordScreen';

const App = () => {
  return (
    <PaperProvider>
      <View style={{ flex: 1 ,
      backgroundColor:"pink"}}>
        <PatientRecord />
      </View>
    </PaperProvider>
  );
};

export default App;
