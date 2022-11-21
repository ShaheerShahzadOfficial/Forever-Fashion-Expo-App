import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '.././Home.js'
import Login from './Login.js'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from './Actions/UserActions.js'
import DashBoard from './Screens/DashBoard.js'
import CustomDrawer from './CustomDrawer/CustomDrawer.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Products from './Screens/Products.js'
import Users from './Screens/Users.js'
import AddProduct from './Screens/AddProduct.js'
import Orders from './Screens/Orders.js'
import { GetAdminProduct } from './Actions/ProductsActions.js'
import UpdateProduct from './Screens/UpdateProduct.js'
import UpdateOrder from './Screens/UpdateOrder.js'
import UpdateUser from './Screens/UpdateUserRole.js'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function MyDrawer () {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          color: 'purple',
          zIndex: 100
        },
        // headerBackground: '#FFC4D4',
        headerStyle: { backgroundColor: '#ff3a70' },
        headerTintColor: '#fff',
        drawerStatusBarAnimation: 'slide',
        drawerActiveBackgroundColor: '#ff3a70',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginRight: 12, fontSize: 15 },
        drawerInactiveBackgroundColor: '#fff',
        drawerInactiveTintColor: '#5E17EB'
      }}
      initialRouteName='DashBoard'
    >
      <Drawer.Screen name='DashBoard' component={DashBoard} />
      <Drawer.Screen name='Products' component={Products} />
      <Drawer.Screen name='Users' component={Users} />
      <Drawer.Screen name='Add Product' component={AddProduct} />

      <Drawer.Screen name='Orders' component={Orders} />
    </Drawer.Navigator>
  )
}

function MyStack () {
  const { user } = useSelector(state => state.Authentication)
  return (
    <Stack.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          color: 'purple',
          zIndex: 100
        },
        drawerStatusBarAnimation: 'slide',
        drawerActiveBackgroundColor: '#ff3a70',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginRight: 12, fontSize: 15 },
        drawerInactiveBackgroundColor: '#fff',
        drawerInactiveTintColor: '#5E17EB'

        //  drawerPosition: "right",
      }}
    >
      {user?.role !== 'Admin' ? (
        <>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              header: () => null
            }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              header: () => null
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name='DashBoardRoute' component={MyDrawer} />
          <Stack.Screen name='UpdateProduct' component={UpdateProduct} />
          <Stack.Screen name='UpdateOrder' component={UpdateOrder} />
          <Stack.Screen name='UpdateUser' component={UpdateUser} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function Route () {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(LoadUser())
    dispatch(GetAdminProduct())
  }, [dispatch])
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
