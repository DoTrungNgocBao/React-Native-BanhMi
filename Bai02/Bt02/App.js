
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

import Home from './components/Home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#123B78"
      />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FD',
  },
});
