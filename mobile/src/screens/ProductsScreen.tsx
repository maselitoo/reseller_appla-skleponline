import React, { useState, useEffect } from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, ActivityIndicator, Alert
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { productsApi, type Product } from '../services/api'
import { useCart } from '../context/CartContext'

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>

const CATEGORIES = ['All', 'iPhone', 'MacBook', 'iPad', 'Watch', 'AirPods']

const FALLBACK: Product[] = [
  { _id: '1', name: 'iPhone 15 Pro', category: 'iPhone', price: 5499, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', description: 'Chip A17 Pro', inStock: true, countInStock: 10, rating: 0, discount: 0 },
  { _id: '2', name: 'MacBook Pro 14"', category: 'MacBook', price: 8999, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', description: 'Chip M3', inStock: true, countInStock: 5, rating: 0, discount: 0 },
  { _id: '3', name: 'iPad Pro 12.9"', category: 'iPad', price: 5799, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', description: 'Chip M2', inStock: true, countInStock: 8, rating: 0, discount: 0 },
  { _id: '4', name: 'Apple Watch S9', category: 'Watch', price: 1899, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', description: 'Chip S9', inStock: true, countInStock: 20, rating: 0, discount: 0 },
  { _id: '5', name: 'AirPods Pro 2', category: 'AirPods', price: 1199, image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop', description: 'ANC', inStock: true, countInStock: 30, rating: 0, discount: 0 },
  { _id: '6', name: 'MacBook Air 13"', category: 'MacBook', price: 5499, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop', description: 'Chip M2', inStock: true, countInStock: 12, rating: 0, discount: 0 },
]

export default function ProductsScreen({ route }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(route.params?.category ?? 'All')
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await productsApi.getAll({ category })
        setProducts(data.products)
      } catch {
        const filtered = category === 'All' ? FALLBACK : FALLBACK.filter(p => p.category === category)
        setProducts(filtered)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  const handleAdd = (product: Product) => {
    addToCart({ id: product._id, name: product.name, price: product.price, image: product.image })
    Alert.alert('✓ Dodano do koszyka', product.name)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={c => c}
        contentContainerStyle={styles.filterBar}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterBtn, category === item && styles.filterBtnActive]}
            onPress={() => setCategory(item)}
          >
            <Text style={[styles.filterText, category === item && styles.filterTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0071e3" style={{ marginTop: 60 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={p => p._id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.cardPrice}>{item.price.toLocaleString('pl-PL')} zł</Text>
                {item.inStock ? (
                  <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item)}>
                    <Text style={styles.addBtnText}>+ Koszyk</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.outBtn}>
                    <Text style={styles.outBtnText}>Brak w magazynie</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  filterBar: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#d2d2d7', backgroundColor: '#fff' },
  filterBtnActive: { backgroundColor: '#0071e3', borderColor: '#0071e3' },
  filterText: { fontSize: 14, color: '#1d1d1f', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { gap: 12, marginBottom: 12 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardImage: { width: '100%', height: 140 },
  cardBody: { padding: 12 },
  cardCategory: { fontSize: 11, color: '#0071e3', fontWeight: '600', marginBottom: 4, textTransform: 'uppercase' },
  cardName: { fontSize: 14, fontWeight: '600', color: '#1d1d1f', marginBottom: 6, lineHeight: 18 },
  cardPrice: { fontSize: 16, fontWeight: '700', color: '#1d1d1f', marginBottom: 10 },
  addBtn: { backgroundColor: '#0071e3', borderRadius: 50, paddingVertical: 8, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  outBtn: { backgroundColor: '#e5e5ea', borderRadius: 50, paddingVertical: 8, alignItems: 'center' },
  outBtnText: { color: '#6e6e73', fontSize: 13 },
})
