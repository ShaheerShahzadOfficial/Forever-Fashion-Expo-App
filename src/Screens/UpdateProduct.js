import React, { useEffect, useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import {
  GetAdminProduct,
  GetProductDetail,
  updateProduct
} from '../Actions/ProductsActions'
import { UPDATE_PRODUCT_RESET } from '../Constants/constant'

const UpdateProduct = ({ route, navigation }) => {
  const { ProductId } = route.params

  const { product } = useSelector(state => state.productDetail)
  const { loading, isUpdated } = useSelector(state => state.product)

  //   setTimeout(() => {
  //     loading = false
  //   }, 10000)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (product && product?._id !== ProductId) {
      dispatch(GetProductDetail(ProductId))
    } else {
      setName(product?.name)
      setDescription(product?.description)
      setPrice(product?.price)
      setCategory(product?.category)
      setStock(product?.Stock)
    }
    if (isUpdated) {
      Alert.alert('Product Updated Successfully')
      dispatch({ type: UPDATE_PRODUCT_RESET })
      dispatch(GetAdminProduct())
      navigation.navigate('Products')
    }
  }, [dispatch, isUpdated, product, ProductId])

  const updatingProduct = () => {
    dispatch(
      updateProduct(ProductId, name, price, description, category, stock)
    )
  }

  const categories = [
    {
      label: 'Gadgets',
      value: 'Gadgets'
    },
    {
      label: 'Bags',
      value: 'Bags'
    },
    {
      label: 'Ladies Clothes',
      value: 'Ladies Clothes'
    },
    {
      label: 'jewellery',
      value: 'jewellery'
    }
  ]

  return (
    <ScrollView style={{ backgroundColor: '#ffb8c8' }}>
      <View style={styles?.container}>
        <Text
          style={{
            color: '#5E17EB',
            fontSize: 30,
            marginTop: 100,
            marginBottom: 40
          }}
        >
          Update Product
        </Text>

        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder='Product Name'
          placeholderTextColor='#9e6dff'
        />

        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price.toString()}
          placeholder='Product Price'
          placeholderTextColor='#9e6dff'
          keyboardType='number-pad'
          textContentType='oneTimeCode'
        />

        <TextInput
          style={styles.input}
          onChangeText={setStock}
          value={stock.toString()}
          placeholder='Product Stock'
          placeholderTextColor='#9e6dff'
          keyboardType='number-pad'
          textContentType='oneTimeCode'
        />
        <DropDownPicker
          placeholder='Category'
          open={open}
          value={category}
          items={categories}
          setOpen={setOpen}
          setValue={setCategory}
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
            backgroundColor: 'transparent'
          }}
        />
        <TextInput
          style={styles.textarea}
          onChangeText={setDescription}
          value={description}
          placeholder='Product Description'
          placeholderTextColor='#9e6dff'
          multiline
        />

        <TouchableOpacity
          onPress={updatingProduct}
          style={styles.btn}
          disabled={loading ? true : false}
        >
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
            {loading ? 'Updating Please Wait' : 'Update Product'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default UpdateProduct

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
    marginTop: 20
  }
})
