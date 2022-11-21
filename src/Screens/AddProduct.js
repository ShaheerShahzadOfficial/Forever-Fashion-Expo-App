import React, { useState, useMemo, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert
  // Alert
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNewProduct } from '../Actions/ProductsActions'
import { CREATE_NEW_PRODUCT_RESET } from '../Constants/constant'

var height = Dimensions.get('window').height
// var width = Dimensions.get('window').width

const AddProduct = ({ navigation }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  const dispatch = useDispatch()
  const { success, loading } = useSelector(state => state?.NewProduct)

  useEffect(() => {
    if (success) {
      Alert.alert('Product Created Successfully')
      dispatch({ type: CREATE_NEW_PRODUCT_RESET })
      navigation.navigate('Products')
    }
  }, [dispatch, navigation, success])

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      allowsMultipleSelection: true,
      base64: true
    })

    if (!result.cancelled) {
      if (result?.uri !== undefined) {
        setImageUrl(`data:image/jpg;base64,${result?.base64}`)
        setImage([])
      }
      if (result?.selected !== undefined) {
        result?.selected?.forEach(element => {
          setImage(old => [...old, `data:image/jpg;base64,${element?.base64}`])
        })
        setImageUrl('')
      }
    }
  }

  const addProduct = () => {
    if (imageUrl !== '') {
      console.table({ imageUrl })
      dispatch(
        CreateNewProduct(name, description, price, category, stock, imageUrl)
      )
    } else {
      dispatch(
        CreateNewProduct(name, description, price, category, stock, image)
      )
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#FFC4D4' }}>
      <View style={styles?.container}>
        <Text
          style={{
            color: '#5E17EB',
            fontSize: 40,
            marginTop: 10,
            marginBottom: 10
          }}
        >
          Add Product
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
          value={price}
          placeholder='Product Price'
          placeholderTextColor='#9e6dff'
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder='Product Description'
          placeholderTextColor='#9e6dff'
          multiline
        />
        <TextInput
          style={styles.input}
          onChangeText={setStock}
          value={stock}
          placeholder='Stock'
          placeholderTextColor='#9e6dff'
          keyboardType='numeric'
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

        <TouchableOpacity style={styles?.Filebtn} onPress={pickImage}>
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
            Choose Files
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: 320,
            maxHeight: height,
            flexWrap: 'wrap',
            marginLeft: 14
          }}
        >
          {image &&
            image?.map((images, index) => (
              <Image
                key={index}
                style={{
                  width: 90,
                  height: 90,
                  //  borderRadius: 100,
                  margin: 6
                }}
                source={{ uri: images }}
              />
            ))}
        </View>

        {imageUrl && (
          <Image
            style={{
              width: 100,
              height: 100,
              //  borderRadius: 100,
              margin: 0
            }}
            source={{ uri: imageUrl }}
          />
        )}

        <TouchableOpacity
          style={styles?.btn}
          disabled={loading ? true : false}
          onPress={addProduct}
        >
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
            {loading ? 'Create Please Wait' : 'Create Product'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default AddProduct

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
    height: 50,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20
  },
  Filebtn: {
    backgroundColor: '#5E17EB',
    height: 50,
    width: 300,
    elevation: 10,
    marginLeft: 10,
    padding: 10,
    marginTop: 20
    // marginBottom: 40
  },
  input: {
    // marginLeft: 'auto',
    // marginRight: 'auto',
    backgroundColor: '#fff',
    color: '#5E17EB',
    marginBottom: 10,
    height: 60,
    width: 300,
    marginLeft: 10,
    padding: 16,
    marginTop: 20
  }
})
