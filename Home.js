import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'

import { useSelector } from 'react-redux'

export default function Home ({ navigation }) {
  const { user, loading } = useSelector(state => state.Authentication)
  useEffect(() => {
    if (user) {
      if (user?.role === 'Admin') {
        ToastAndroid.show('Hello Admin', ToastAndroid.SHORT)
        navigation.navigate('DashBoard')
      }
      if (user?.role === 'User') {
        ToastAndroid.show(
          'You Are Not Admin So you cannot access it',
          ToastAndroid.SHORT
        )
      }
    }
  }, [])

  const register = async () => {
    const url = 'https://www.theforeverfashion.com/Register'
    await Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 300 }}
        source={require('./assets/splash.png')}
      />
      <Text
        style={{
          color: '#5E17EB',
          fontSize: 20,
          marginTop: 10,
          marginBottom: 100
        }}
      >
        Admin Panel For Forever Fashion
      </Text>
      <StatusBar style='auto' />
      {loading === true ? (
        <ActivityIndicator size={80} color='#5E17EB' />
      ) : (
        <>
          <TouchableOpacity
            onPress={register}
            style={{
              backgroundColor: '#5E17EB',
              height: 50,
              width: 300,
              elevation: 10,
              marginLeft: 10,
              padding: 10,
              marginTop: 0
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: '#5E17EB',
              marginBottom: 50,
              height: 50,
              width: 300,
              elevation: 10,
              marginLeft: 10,
              padding: 10,
              marginTop: 20
            }}
          >
            {/* top: 40, */}
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFC4D4',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto'
  },
  btn: {
    width: 200,
    padding: 3,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF'
  },
  containerS: {
    marginTop: 20,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white'
  }
})
