import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'

type Nav = NativeStackNavigationProp<RootStackParamList>

const categories = [
  { name: 'iPhone', icon: '📱', color: '#e3f0ff' },
  { name: 'MacBook', icon: '💻', color: '#e3fff0' },
  { name: 'iPad', icon: '🖥️', color: '#fff3e3' },
  { name: 'Watch', icon: '⌚', color: '#f3e3ff' },
  { name: 'AirPods', icon: '🎧', color: '#ffe3e3' },
]

export default function HomeScreen() {
  const navigation = useNavigation<Nav>()

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🍎</Text>
        <Text style={styles.heroTitle}>Reseller Apple</Text>
        <Text style={styles.heroSubtitle}>Najlepsze produkty Apple{'\n'}w najlepszych cenach</Text>
        <TouchableOpacity
          style={styles.heroBtn}
          onPress={() => navigation.navigate('Products', {})}
        >
          <Text style={styles.heroBtnText}>Zobacz produkty</Text>
        </TouchableOpacity>
      </View>

      {/* Kategorie */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popularne kategorie</Text>
        <View style={styles.categoriesGrid}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.name}
              style={[styles.categoryCard, { backgroundColor: cat.color }]}
              onPress={() => navigation.navigate('Products', { category: cat.name })}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Cechy sklepu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dlaczego my?</Text>
        {[
          { icon: '✅', title: 'Gwarancja jakości', desc: 'Pełna gwarancja producenta' },
          { icon: '🚚', title: 'Szybka dostawa', desc: 'Wysyłka w 24h, darmowa od 500 zł' },
          { icon: '💰', title: 'Najlepsze ceny', desc: 'Konkurencyjne ceny i promocje' },
          { icon: '🔒', title: 'Bezpieczne płatności', desc: 'BLIK, karty, przelewy' },
        ].map(f => (
          <View key={f.title} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  hero: {
    backgroundColor: '#0071e3',
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroEmoji: { fontSize: 56, marginBottom: 8 },
  heroTitle: { fontSize: 32, fontWeight: '700', color: '#fff', marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 24, marginBottom: 24 },
  heroBtn: { backgroundColor: '#fff', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 50 },
  heroBtnText: { color: '#0071e3', fontWeight: '700', fontSize: 16 },

  section: { padding: 24 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1d1d1f', marginBottom: 16 },

  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: {
    width: '46%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  categoryIcon: { fontSize: 36, marginBottom: 8 },
  categoryName: { fontSize: 16, fontWeight: '600', color: '#1d1d1f' },

  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  featureIcon: { fontSize: 28, width: 44 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 15, fontWeight: '600', color: '#1d1d1f' },
  featureDesc: { fontSize: 13, color: '#6e6e73', marginTop: 2 },
})
