import React, { useEffect, useState } from 'react'
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
import { AdminAllOrder, deleteOrder } from '../Actions/OrderActions'
// import { AdminAllUser } from '../Actions/UserActions'

var width = Dimensions.get('window').width

const Orders = ({ navigation }) => {
  const dispatch = useDispatch()
  const { order } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(AdminAllOrder())
  }, [dispatch])

  const containerStyle = { backgroundColor: 'white', padding: 20 }

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
        {item?._id}
      </Text>
      <Text
        style={{
          width: 90,
          textAlign: 'center',
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?.orderItem?.length}
      </Text>
      <Text
        style={{
          width: 60,
          textAlign: 'center',
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?.status}
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
                  onPress: () => {
                    dispatch(deleteOrder(item?._id))
                    dispatch(AdminAllOrder())
                  },
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
            navigation.navigate('UpdateOrder', { OrderId: item?._id })
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
          Order ID
        </Text>

        <Text
          style={{
            width: 90,
            margin: 2,
            textAlign: 'center',
            color: 'white'
          }}
        >
          Items QTY
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
          Status
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
      {order?.length !== 0 ? (
        <FlatList
          style={{ backgroundColor: '#ffb8c8', top: 21 }}
          data={order}
          renderItem={renderItem}
          keyExtractor={item => item?._id}
        />
      ) : (
        <Text
          style={{
            fontSize: 30,
            color: '#DA1050',
            top: 60,
            textAlign: 'center'
          }}
        >
          No Order Found
        </Text>
      )}
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // backgroundColor: '#FFC4D4',
    // color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    top: 40
  }
})
