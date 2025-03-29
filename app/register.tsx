import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^\d+$/, 'Phone number must contain only digits')
    .min(9, 'Phone number must be at least 9 digits')
    .max(12, 'Phone number must not exceed 12 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
      const login = useAuthStore((state) => state.login); // Access the login method from Zustand
    
  const handleRegister = async () => {
    // Validate input using zod
    const validationResult = registerSchema.safeParse({ name, email, phone, password });

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => err.message).join('\n');
      Alert.alert('Validation Error', errorMessages);
      return;
    }

    try {
      const response = await fetch('https://websitenet-eight.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });
      
 

      const data = await response.json();
      console.log(data);
      
      const { accessToken, name: userName } = data;

      // Automatically log in the user using the returned data
      login(userName, accessToken);

      // Redirect to the home screen
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while registering. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginLink}>Or Login?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;