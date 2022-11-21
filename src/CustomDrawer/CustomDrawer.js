import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import { StatusBar } from 'expo-status-bar'
import { Logout } from '../Actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'


const CustomDrawer = (props) => {
    
    const dispatch = useDispatch()
    const { loading, user, error } = useSelector(state => state.Authentication)


  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='#FFC4D4' />
      <DrawerContentScrollView {...props}>
        <ImageBackground
          resizeMode='cover'
          source={require('./../../assets/bg.jpg')}
          style={{ width: '100%', top: -4 }}
        >
          <Image
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              margin: 20
            }}
            source={{uri:user?.avatar?.url}}
          />
          <Text style={styles.Text}>{user?.name}</Text>
        </ImageBackground>
        <View style={{ backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
      <TouchableOpacity
          onPress={() => {
            dispatch(Logout())
          }}
          style={{
            paddingVertical: 10,
            backgroundColor: 'white',
            height: 50,
            borderRadius: 100,
            elevation: 6
          }}
        >
          <Text style={{ fontSize: 20, color: '#000', textAlign: 'center' }}>
            LOGOUT
          </Text>
        </TouchableOpacity>     
         </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 2,
    marginBottom: 16,
    color: 'white'
  }
})
