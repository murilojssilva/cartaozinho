import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUserProps } from '@/app/interfaces/IUserProps'

interface IUserContext {
  user: IUserProps | null
  setUser: (user: IUserProps | null) => void
  signed: boolean
}

const initialUserContext: IUserContext = {
  user: null,
  setUser: () => {},
  signed: false,
}

export const UserContext = createContext<IUserContext>(initialUserContext)

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUserState] = useState<IUserProps | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          console.log('User loaded from AsyncStorage:', parsedUser)
          setUserState(parsedUser)
        }
      } catch (error) {
        console.error('Failed to load user from storage', error)
      }
    }
    loadUser()
  }, [])

  const setUser = async (newUser: IUserProps | null) => {
    setUserState(newUser)
    if (newUser) {
      await AsyncStorage.setItem('user', JSON.stringify(newUser))
      console.log('User saved to AsyncStorage:', newUser)
    } else {
      await AsyncStorage.removeItem('user')
      console.log('User removed from AsyncStorage')
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, signed: !!user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
