import React, { useEffect } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { AdminAllUser, DeleteUser } from '../Actions/UserActions'

var width = Dimensions.get('window').width

const Users = ({ navigation }) => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.AllUser)

  useEffect(() => {
    dispatch(AdminAllUser())
  }, [dispatch])

  const renderItem = ({ item }) => (
    <View
      key={item?._id}
      style={{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#FD8B9C'
      }}
    >
      <Text
        style={{
          width: 140,
          textAlign: 'center',
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?.email}
      </Text>
      <Text
        style={{
          width: 90,
          textAlign: 'center',
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?.name}
      </Text>
      <Text
        style={{
          width: 60,
          textAlign: 'center',
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?.role}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: 60
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete Product',
              'Are You Sure You Want To Delete It ?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed')
                },
                {
                  text: 'Delete',
                  onPress: () => dispatch(DeleteUser(item?._id)),
                  style: 'destructive'
                }
              ]
            )
          }}
          style={{ width: 30, margin: 0 }}
        >
          <Text>
            <List.Icon color={'red'} icon='delete' />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UpdateUser', { UserId: item?._id })
          }}
          style={{ width: 30, margin: 0 }}
        >
          <Text>
            <List.Icon color={'blue'} icon='pencil' />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#DA1050',
          zIndex: 100,
          padding: 10,
          top: 20
          //   height:80
        }}
      >
        <Text
          style={{
            width: 125,
            margin: 2,
            textAlign: 'center',
            color: 'white'
          }}
        >
          Email
        </Text>

        <Text
          style={{
            width: 90,
            margin: 2,
            textAlign: 'center',
            color: 'white'
          }}
        >
          Name
        </Text>

        <Text
          style={{
            width: 60,
            marginTop: 2,
            marginLeft: 6,
            textAlign: 'justify',
            color: 'white'
          }}
        >
          Role
        </Text>

        <Text
          style={{
            flexDirection: 'row',
            width: 80,
            // margin: 2,
            textAlign: 'auto',
            color: 'white'
          }}
        >
          Action
        </Text>
      </View>
      <FlatList
        style={{ backgroundColor: '#ffb8c8', top: 21 }}
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
      />
    </View>
  )
}

export default Users

const styles = StyleSheet.create({
  container: {
    padding: 1
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    width: width
  },
  tableRow: {
    width: width
  }
})
