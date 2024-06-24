import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Stack, useNavigation } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function AuthLayout() {
  const navigation = useNavigation()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name='signUp'
        options={{
          title: '',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerRight: () => (
            <View className='flex-2 flex-row items-center'>
              <Ionicons name='log-in-outline' size={22} />
              <Text className='text-xl text-gray-700 font-semibold'>
                {' '}
                Cadastro
              </Text>
            </View>
          ),
          headerLeft: () => (
            <FontAwesome5
              name='chevron-left'
              size={26}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack>
  )
}
