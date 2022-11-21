import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { useDispatch, useSelector } from 'react-redux'
import { GetAdminProduct } from '../Actions/ProductsActions'
import { AdminAllUser } from '../Actions/UserActions'

var width = Dimensions.get('screen').width

const DashBoard = () => {
  const dispatch = useDispatch()

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(199, 21, 133, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }

  const { users } = useSelector(state => state.AllUser)
  const { products } = useSelector(state => state.products)
  const { order } = useSelector(state => state.orders)
  useEffect(() => {
    dispatch(AdminAllUser())
    dispatch(GetAdminProduct())
  }, [dispatch])

  let outOfStock = 0

  products &&
    products?.forEach(item => {
      if (item.Stock <= 0) {
        outOfStock += 1
      }
    })

  const data = [
    {
      name: 'In Stock',
      Stock: products?.length - outOfStock,
      color: '#C71585',
      legendFontColor: 'rgb(199, 21, 133)',
      legendFontSize: 15
    },
    {
      name: 'Out Of Stock',
      Stock: outOfStock,
      color: '#DB7093',
      legendFontColor: 'rgb(219, 112, 147)',
      legendFontSize: 15
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View
            style={{
              top: 20,
              backgroundColor: '#DA1050',
              width: width,
              height: 100
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                top: 40,
                color: 'white'
              }}
            >
              Total Income Rs{' '}
              {order && order?.reduce((acc, item) => acc + item?.totalPrice, 0)}
            </Text>
          </View>

          <View style={styles?.header}>
            <View
              style={{
                backgroundColor: '#Ff3a71',
                width: 100,
                height: 100,
                padding: 10,
                borderRadius: 100
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  top: 10,
                  color: 'white',
                  fontSize: 18
                }}
              >
                Products
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  top: 20,
                  color: 'white',
                  fontSize: 18
                }}
              >
                {products && products?.length}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#663399',
                width: 100,
                height: 100,
                padding: 10,
                borderRadius: 100,
                left: 6
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  top: 10,
                  color: 'white',
                  fontSize: 18
                }}
              >
                Orders
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  top: 20,
                  color: 'white',
                  fontSize: 18
                }}
              >
                {order?.length}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#00BFFF',
                width: 100,
                height: 100,
                padding: 10,
                borderRadius: 100,
                left: 12
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  top: 10,
                  color: '#fff',
                  fontSize: 18
                }}
              >
                Users
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  top: 20,
                  color: '#fff',
                  fontSize: 18
                }}
              >
                {users?.length}
              </Text>
            </View>
          </View>

          <View style={{ width: width, padding: 4, marginTop: 60 }}>
            <PieChart
              data={data}
              width={width}
              height={240}
              chartConfig={chartConfig}
              accessor={'Stock'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              center={[10, 20]}
              absolute={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DashBoard

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    top: 20
  }
})
