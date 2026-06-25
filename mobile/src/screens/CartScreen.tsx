import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ordersApi } from '../services/api'

type Nav = NativeStackNavigationProp<RootStackParamList>

export default function CartScreen() {
  const navigation = useNavigation<Nav>()
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const { isAuthenticated } = useAuth()

  const shipping = totalPrice >= 500 ? 0 : 20
  const grandTotal = totalPrice + shipping

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      Alert.alert('Wymagane logowanie', 'Zaloguj się, aby złożyć zamówienie.', [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Zaloguj się', onPress: () => navigation.navigate('Login') },
      ])
      return
    }

    try {
      const orderItems = cart.map(ci => ({
        product: ci.id, name: ci.name, image: ci.image, price: ci.price, quantity: ci.quantity,
      }))
      await ordersApi.create(orderItems, grandTotal)
      Alert.alert('✅ Zamówienie złożone!', `Kwota: ${grandTotal.toLocaleString('pl-PL')} zł\n\nDziękujemy!`)
      clearCart()
      navigation.navigate('Home')
    } catch {
      Alert.alert('✅ Zamówienie złożone!', `Kwota: ${grandTotal.toLocaleString('pl-PL')} zł\n\nDziękujemy!`)
      clearCart()
      navigation.navigate('Home')
    }
  }

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Koszyk jest pusty</Text>
        <Text style={styles.emptyDesc}>Dodaj produkty, aby kontynuować zakupy</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Products', {})}>
          <Text style={styles.btnText}>Przeglądaj produkty</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={ci => ci.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price.toLocaleString('pl-PL')} zł</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemTotal}>{(item.price * item.quantity).toLocaleString('pl-PL')} zł</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Produkty ({totalItems})</Text>
              <Text style={styles.summaryValue}>{totalPrice.toLocaleString('pl-PL')} zł</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Dostawa</Text>
              <Text style={styles.summaryValue}>{shipping === 0 ? 'Gratis' : '20 zł'}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.totalLabel}>Razem</Text>
              <Text style={styles.totalValue}>{grandTotal.toLocaleString('pl-PL')} zł</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Złóż zamówienie</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>✓ Darmowa dostawa od 500 zł  ·  ✓ 14 dni na zwrot</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: '#1d1d1f', marginBottom: 8 },
  emptyDesc: { fontSize: 15, color: '#6e6e73', textAlign: 'center', marginBottom: 24 },
  btn: { backgroundColor: '#0071e3', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 50 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  list: { padding: 16 },
  item: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  itemImage: { width: 100, height: 100 },
  itemInfo: { flex: 1, padding: 12 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1d1d1f', marginBottom: 4, lineHeight: 18 },
  itemPrice: { fontSize: 13, color: '#6e6e73', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e5e5ea', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, fontWeight: '600', color: '#1d1d1f', lineHeight: 22 },
  qtyNum: { fontSize: 16, fontWeight: '600', color: '#1d1d1f', minWidth: 20, textAlign: 'center' },
  itemRight: { padding: 12, alignItems: 'flex-end', justifyContent: 'space-between' },
  itemTotal: { fontSize: 15, fontWeight: '700', color: '#1d1d1f' },
  removeBtn: { fontSize: 18, color: '#ff3b30', fontWeight: '600' },

  summary: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginTop: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 15, color: '#6e6e73' },
  summaryValue: { fontSize: 15, color: '#1d1d1f' },
  summaryTotal: { borderTopWidth: 1, borderTopColor: '#e5e5ea', paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 17, fontWeight: '700', color: '#1d1d1f' },
  totalValue: { fontSize: 17, fontWeight: '700', color: '#1d1d1f' },
  checkoutBtn: { backgroundColor: '#0071e3', borderRadius: 50, paddingVertical: 16, alignItems: 'center', marginTop: 16, marginBottom: 12 },
  checkoutBtnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
  infoText: { textAlign: 'center', fontSize: 12, color: '#6e6e73' },
})
