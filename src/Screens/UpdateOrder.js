import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderDetail, UpdateOrderStatus } from '../Actions/OrderActions'
import { UPDATE_ORDER_RESET } from '../Constants/constant'

const UpdateOrder = ({ route, navigation }) => {
  const { loading, isUpdated } = useSelector(state => state.DeleteUpdateOrder)

  const { orderDetails } = useSelector(state => state.OrderDetails)

  const { OrderId } = route.params
  const dispatch = useDispatch()
  useEffect(() => {
    if (orderDetails && orderDetails._id !== OrderId) {
      dispatch(GetOrderDetail(OrderId))
    }

    // dispatch(GetProductDetail(id))

    if (isUpdated) {
      Alert.alert('Product Updated Successfully')
      dispatch({ type: UPDATE_ORDER_RESET })
      navigation.navigate('Orders')
    }
  }, [dispatch, OrderId, isUpdated, orderDetails])

  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)

  const updateOrderSubmitHandler = () => {
    dispatch(UpdateOrderStatus(OrderId, status))
  }
  const Statuses1 = [{ label: 'Shipped', value: 'Shipped' }]
  const Statuses2 = [{ label: 'Delivered', value: 'Delivered' }]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFC4D4' }}>
      <ScrollView>
        <View style={styles?.container}>
          <Text
            style={{
              color: '#5E17EB',
              fontSize: 30,
              marginTop: 40,
              marginBottom: 10
            }}
          >
            UpdateOrder Status
          </Text>

          <Text style={styles?.heading}>Shipping Info</Text>
          <Text style={styles?.subHeading}>
            Name:{' '}
            <Text style={styles?.subSubHeading}>
              {orderDetails?.User && orderDetails?.User.name}{' '}
            </Text>
          </Text>
          <Text style={styles?.subHeading}>
            Phone:
            <Text style={styles?.subSubHeading}>
              {orderDetails?.shippingInfo &&
                orderDetails?.shippingInfo?.phoneNumber}
            </Text>
          </Text>
          <Text style={styles?.subHeading}>
            Address:
            <Text style={styles?.subSubHeading}>
              {orderDetails?.shippingInfo &&
                `${orderDetails?.shippingInfo?.address}, ${orderDetails?.shippingInfo?.city}, ${orderDetails?.shippingInfo?.state}, ${orderDetails?.shippingInfo.postalCode}`}
            </Text>
          </Text>

          <Text style={styles?.heading}> Payment </Text>
          <Text style={styles?.subHeading}>
            Amount:
            <Text style={styles?.subSubHeading}>
              {orderDetails?.totalPrice && orderDetails?.totalPrice}
            </Text>
          </Text>

          <Text style={styles?.heading}> Order Status </Text>
          <Text style={styles?.subSubHeading}>Processing </Text>

          <Text style={styles?.heading}> Your Cart Items: </Text>
          {orderDetails?.orderItem &&
            orderDetails?.orderItem.map(item => (
              <View
                key={item?.product}
                style={{ flexDirection: 'row', margin: 10 }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    //  borderRadius: 100,
                    margin: 0
                  }}
                  source={{
                    uri: item?.image
                  }}
                />
                <View>
                  <Text style={styles?.subHeading}>{item.name}</Text>

                  <Text style={styles?.subHeading}>
                    {item?.quantity} X Rs {item?.price} ={''}
                    <Text> Rs {item?.price * item?.quantity} </Text>
                  </Text>
                </View>
              </View>
            ))}
          {orderDetails?.status === 'Delivered' ? null : (
            <DropDownPicker
              placeholder='Order Status'
              open={open}
              value={status}
              items={
                orderDetails?.status === 'Proccessing' ? Statuses1 : Statuses2
              }
              setOpen={setOpen}
              setValue={setStatus}
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
          )}

          <TouchableOpacity
            onPress={updateOrderSubmitHandler}
            style={styles.btn}
            disabled={loading ? true : false}
          >
            <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
              {loading ? 'Updating Please Wait' : 'Update Status'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UpdateOrder

const styles = StyleSheet.create({
  container: {
    flex: 2,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto'
  },
  heading: {
    color: '#000',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  subHeading: {
    color: 'crimson',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  subSubHeading: {
    color: '#5E17EB',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
    // fontWeight: 900
  },
  btn: {
    backgroundColor: '#5E17EB',
    height: 50,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20
  }
})
