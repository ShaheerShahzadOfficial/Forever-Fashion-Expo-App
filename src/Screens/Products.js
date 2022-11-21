import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Item,
  TouchableOpacity,
  Alert
} from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, GetAdminProduct } from '../Actions/ProductsActions'
import { DELETE_PRODUCT_RESET } from '../Constants/constant'

var width = Dimensions.get('window').width

const Products = ({ navigation }) => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const { isDeleted } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(GetAdminProduct())

    if (isDeleted) {
      Alert.alert('Product Deleted Successfully')
      // history.push("/admin/Products");
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
  }, [dispatch, isDeleted])

  const renderItem = ({ item }) => (
    <View
      key={item._id}
      style={{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#FD8B9C'
      }}
    >
      <Text
        style={{
          width: 125,
          margin: 2,
          textAlign: 'center',
          padding: 3,
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?._id}
      </Text>
      <Text
        style={{
          width: 90,
          margin: 2,
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
          margin: 2,
          textAlign: 'center',
          borderRightWidth: 1,
          borderColor: '#FD8B9C'
        }}
      >
        {item?.price}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: 80,
          margin: 2
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
                  onPress: () => dispatch(deleteProduct(item?._id)),
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
            navigation.navigate('UpdateProduct', { ProductId: item?._id })
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
    <ScrollView>
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#5E17EB',
            zIndex: 100,
            padding: 6
            // top: 20
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
            Id
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
              margin: 2,
              textAlign: 'center',
              color: 'white'
            }}
          >
            Price
          </Text>

          <Text
            style={{
              flexDirection: 'row',
              width: 80,
              margin: 2,
              textAlign: 'center',
              color: 'white'
            }}
          >
            Action
          </Text>
        </View>
        <FlatList
          style={{ backgroundColor: '#ffb8c8', top: 1 }}
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    </ScrollView>
  )
}

export default Products

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
