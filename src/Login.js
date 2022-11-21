import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from './Actions/UserActions'
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { loading, user, error } = useSelector(state => state.Authentication)

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

  const login = () => {
    const Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const Pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/
    if (email !== '' && password !== '') {
      if (Email.test(email) === true) {
        if (Pass.test(password) === true) {
          dispatch(LoginUser(email, password))

          if (error) {
            if (
              error.message ===
              "Cannot read properties of null (reading 'password')"
            ) {
              ToastAndroid.show('Invalid Email OR Password', ToastAndroid.SHORT)
            }
            if (error.msg === '😡👿Eamil or Password not matched 😡👿') {
              ToastAndroid.show('Invalid Email OR Password', ToastAndroid.SHORT)
            }
          }
        } else {
          ToastAndroid.show('Password is not valid', ToastAndroid.SHORT)
        }
      } else {
        ToastAndroid.show('Email is not valid', ToastAndroid.SHORT)
      }
    } else {
      ToastAndroid.show('Enter Email And Password', ToastAndroid.SHORT)
    }
  }
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 300 }}
        source={require('../assets/splash.png')}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder='Enter Email'
        placeholderTextColor='#9e6dff'
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder='Enter Password'
        placeholderTextColor='#9e6dff'
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={login}
        style={styles.btn}
        disabled={loading === true ? true : false}
      >
        <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
          {loading === true ? 'Please Wait' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

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
    backgroundColor: '#5E17EB',
    marginBottom: 50,
    height: 50,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 10,
    marginTop: 20
  },
  input: {
    backgroundColor: '#fff',
    color: '#5E17EB',
    marginBottom: 10,
    height: 60,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 16,
    marginTop: 20
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
