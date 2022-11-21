import React, { useEffect, useState } from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, UpdateUserRole } from '../Actions/UserActions'
import { ADMIN_UPDATE_USERS_RESET } from '../Constants/constant'

const UpdateUser = ({ route, navigation }) => {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Role, setRole] = useState('')
  const [open, setOpen] = useState(false)

  const { user } = useSelector(state => state.userDetails)
  const { loading, isUpdated } = useSelector(state => state.DeleteUpdateUser)

  const { UserId } = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user?._id !== UserId) {
      dispatch(getUserDetails(UserId))
    } else {
      setName(user?.name)
      setRole(user?.role)
      setEmail(user?.email)
    }

    if (isUpdated) {
      Alert.alert('User Role Updated Successfully')
      dispatch({ type: ADMIN_UPDATE_USERS_RESET })
      navigation.navigate('Users')
    }
  }, [dispatch, UserId, isUpdated, user])

  const Roles = [
    { label: 'User', value: 'User' },
    { label: 'Admin', value: 'Admin' }
  ]

  const updateUserRoleSubmitHandler = () => {
    dispatch(UpdateUserRole(UserId, Name, Email, Role))
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFC4D4' }}>
      <View style={styles?.container}>
        <Text
          style={{
            color: '#5E17EB',
            fontSize: 30,
            marginTop: 100,
            marginBottom: 40
          }}
        >
          Update User
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={Name}
          placeholder='User Name'
          placeholderTextColor='#9e6dff'
          editable={false}
        />

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={Email}
          placeholder='User Email'
          placeholderTextColor='#9e6dff'
          editable={false}
        />

        <DropDownPicker
          placeholder='Role'
          open={open}
          value={Role}
          items={Roles}
          setOpen={setOpen}
          setValue={setRole}
          style={{
            width: 300,
            marginLeft: 36,
            marginRight: 'auto',
            borderRadius: 0,
            padding: 10,
            height: 50,
            borderWidth: 0,
            marginTop: 20,
            height: 60,
            backgroundColor: '#fff',
            elevation: 10
          }}
        />

        <TouchableOpacity
          onPress={updateUserRoleSubmitHandler}
          style={styles.btn}
          disabled={loading ? true : false}
        >
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
            {loading ? 'Updating Please Wait' : 'Update User'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default UpdateUser

const styles = StyleSheet.create({
  container: {
    flex: 2,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto'
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
  textarea: {
    backgroundColor: '#fff',
    color: '#5E17EB',
    marginBottom: 10,
    minHeight: 60,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 16,
    marginTop: 20
  },
  btn: {
    backgroundColor: '#5E17EB',
    marginBottom: 50,
    height: 50,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 10,
    marginTop: 30
  }
})
