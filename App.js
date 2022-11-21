import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import Route from './src/route'
import Store from './src/Store'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'

export default function App () {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <StatusBar style='auto' />
        <Route />
      </PaperProvider>
    </Provider>
  )
}
