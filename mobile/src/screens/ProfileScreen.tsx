import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import * as Location from 'expo-location'

export default function ProfileScreen() {
  const [location, setLocation] = useState<string | null>(null)
  const [loadingLocation, setLoadingLocation] = useState(false)

  const getLocation = async () => {
    setLoadingLocation(true)
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Brak uprawnień', 'Zezwól na dostęp do lokalizacji w ustawieniach.')
        return
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
      const [address] = await Location.reverseGeocodeAsync(loc.coords)
      setLocation(`${address.city ?? ''}, ${address.country ?? ''}`)
      Alert.alert('📍 Twoja lokalizacja', `${address.city}, ${address.country}`)
    } catch {
      Alert.alert('Błąd', 'Nie można pobrać lokalizacji.')
    } finally {
      setLoadingLocation(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.title}>Reseller Apple</Text>
        <Text style={styles.subtitle}>Twój profil i ustawienia</Text>
      </View>

      {/* Sekcja lokalizacji – natywna funkcja */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Lokalizacja</Text>
        <Text style={styles.cardDesc}>
          Użyj GPS, aby znaleźć najbliższy punkt odbioru lub sprawdzić dostępność dostawy w Twoim rejonie.
        </Text>
        {location && (
          <View style={styles.locationBadge}>
            <Text style={styles.locationText}>📌 {location}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.btn, loadingLocation && styles.btnDisabled]}
          onPress={getLocation}
          disabled={loadingLocation}
        >
          <Text style={styles.btnText}>
            {loadingLocation ? 'Pobieranie...' : '🗺️ Pobierz moją lokalizację'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info o aplikacji */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ℹ️ O aplikacji</Text>
        {[
          ['Wersja', '1.0.0'],
          ['Platforma', 'React Native + Expo'],
          ['Backend', 'Node.js + Express + MongoDB'],
          ['Autorzy', 'Team Reseller Apple'],
        ].map(([k, v]) => (
          <View key={k} style={styles.infoRow}>
            <Text style={styles.infoKey}>{k}</Text>
            <Text style={styles.infoVal}>{v}</Text>
          </View>
        ))}
      </View>

      {/* Kontakt */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📞 Kontakt</Text>
        <Text style={styles.contact}>📧 kontakt@resellerapple.pl</Text>
        <Text style={styles.contact}>📞 +48 123 456 789</Text>
        <Text style={styles.contact}>🌐 resellerapple.pl</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },

  header: { backgroundColor: '#0071e3', padding: 40, alignItems: 'center' },
  avatar: { fontSize: 64, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },

  card: { backgroundColor: '#fff', margin: 16, marginBottom: 0, borderRadius: 16, padding: 20 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1d1d1f', marginBottom: 8 },
  cardDesc: { fontSize: 14, color: '#6e6e73', lineHeight: 20, marginBottom: 12 },

  locationBadge: { backgroundColor: '#e3f0ff', borderRadius: 8, padding: 10, marginBottom: 12 },
  locationText: { color: '#0071e3', fontWeight: '600' },

  btn: { backgroundColor: '#0071e3', borderRadius: 50, paddingVertical: 14, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#a0c4f1' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  infoKey: { fontSize: 14, color: '#6e6e73' },
  infoVal: { fontSize: 14, color: '#1d1d1f', fontWeight: '500' },

  contact: { fontSize: 15, color: '#1d1d1f', marginBottom: 8 },
})
