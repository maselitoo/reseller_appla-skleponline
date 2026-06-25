import React, { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../App'
import { authApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

type Nav = NativeStackNavigationProp<RootStackParamList>

export default function LoginScreen() {
  const navigation = useNavigation<Nav>()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Wypełnij wszystkie pola')
      return
    }

    setLoading(true)
    try {
      const userData = isLogin
        ? await authApi.login(email, password)
        : await authApi.register(name, email, password)
      await login(userData)
      Alert.alert('✅ Sukces', isLogin ? `Witaj, ${userData.name}!` : 'Konto utworzone!')
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Błąd', err instanceof Error ? err.message : 'Spróbuj ponownie')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>🍎</Text>
        <Text style={styles.title}>{isLogin ? 'Zaloguj się' : 'Utwórz konto'}</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'Witaj ponownie!' : 'Dołącz do Reseller Apple'}
        </Text>

        {!isLogin && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Imię i nazwisko</Text>
            <TextInput
              style={styles.input}
              placeholder="Jan Kowalski"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="jan@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hasło</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.primaryBtnText}>
            {loading ? 'Proszę czekać...' : isLogin ? 'Zaloguj się' : 'Utwórz konto'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.secondaryBtnText}>
            {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 28 },

  logo: { fontSize: 64, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#1d1d1f', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6e6e73', textAlign: 'center', marginBottom: 32 },

  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#1d1d1f', marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#d2d2d7', borderRadius: 12,
    padding: 14, fontSize: 15, backgroundColor: '#f5f5f7',
  },

  primaryBtn: { backgroundColor: '#0071e3', borderRadius: 50, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  primaryBtnDisabled: { backgroundColor: '#a0c4f1' },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 17 },

  secondaryBtn: { paddingVertical: 16, alignItems: 'center' },
  secondaryBtnText: { color: '#0071e3', fontSize: 15, fontWeight: '500' },
})
