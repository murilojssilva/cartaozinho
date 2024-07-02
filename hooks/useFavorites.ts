import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IAdProps } from '@/app/interfaces/IAdProps'

const FAVORITES_KEY = 'FAVORITES_KEY'

export function useFavorites() {
  const [favorites, setFavorites] = useState<IAdProps[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY)
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    }
  }

  const addFavorite = async (item: IAdProps) => {
    try {
      const updatedFavorites = [...favorites, item]
      setFavorites(updatedFavorites)
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      )
    } catch (error) {
      console.error('Failed to add favorite:', error)
    }
  }

  const removeFavorite = async (itemId: string) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== itemId)
      setFavorites(updatedFavorites)
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      )
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    setFavorites,
  }
}
