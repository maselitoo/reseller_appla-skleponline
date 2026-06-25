import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'

import { AuthProvider } from './src/context/AuthContext'
import { CartProvider } from './src/context/CartContext'

import HomeScreen from './src/screens/HomeScreen'
import ProductsScreen from './src/screens/ProductsScreen'
import CartScreen from './src/screens/CartScreen'
import LoginScreen from './src/screens/LoginScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import { useCart } from './src/context/CartContext'

// Typy nawigacji
export type RootStackParamList = {
  Home: undefined
  Products: { category?: string }
  Cart: undefined
  Login: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>()

function CartTabIcon() {
  const { totalItems } = useCart()
  return <Text style={{ fontSize: 22 }}>{totalItems > 0 ? `🛒(${totalItems})` : '🛒'}</Text>
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0071e3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: '#0071e3',
        tabBarInactiveTintColor: '#6e6e73',
        tabBarStyle: { borderTopColor: '#e5e5ea' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '🍎 Reseller Apple',
          tabBarLabel: 'Strona główna',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: 'Produkty',
          tabBarLabel: 'Produkty',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>📦</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Koszyk',
          tabBarLabel: 'Koszyk',
          tabBarIcon: () => <CartTabIcon />,
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Logowanie',
          tabBarLabel: 'Konto',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>👤</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>⚙️</Text>,
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppTabs />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  )
}
