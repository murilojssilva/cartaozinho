import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IAdProps } from '@/app/interfaces/IAdProps'
import Toast from 'react-native-toast-message'
import { useFocusEffect } from '@react-navigation/native'
import { useAds } from './useAds'
import { favoritesRemoveAll } from '@/app/storage/favorites/favoritesRemoveAll'
import { useNavigation } from 'expo-router'

const FAVORITES_KEY = 'FAVORITES_KEY'

export function useFavorites() {
  const { allAds } = useAds()
  const [favorites, setFavorites] = useState<IAdProps[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const navigation = useNavigation()

  const updateNavigationParams = (updatedFavorites) => {
    navigation.setParams({ favoritesSize: updatedFavorites.length })
  }

  const loadFavorites = useCallback(async () => {
    try {
      setIsFavoriteLoading(true)
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY)
      if (storedFavorites) {
        const parsedFavorites: IAdProps[] = JSON.parse(storedFavorites)
        setFavorites(parsedFavorites)
        setFavoriteIds(parsedFavorites.map((fav) => fav.id))
        updateNavigationParams(parsedFavorites)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar favoritos.',
        text2: error.message,
      })
    } finally {
      setIsFavoriteLoading(false)
    }
  }, [])

  const addFavorite = useCallback(
    async (id: string) => {
      try {
        const item = allAds.find((ad) => ad.id === id)
        if (!item) throw new Error('Item not found')

        const updatedFavorites = [...favorites, item]
        setFavorites(updatedFavorites)
        setFavoriteIds((prev) => [...prev, id])
        await AsyncStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify(updatedFavorites)
        )
        updateNavigationParams(updatedFavorites)
        Toast.show({
          type: 'info',
          text1: 'Anúncio incluído aos favoritos.',
        })
      } catch (error) {
        console.error('Failed to add favorite:', error)
      }
    },
    [allAds, favorites]
  )

  const removeFavorite = useCallback(
    async (id: string) => {
      try {
        const updatedFavorites = favorites.filter((item) => item.id !== id)
        setFavorites(updatedFavorites)
        setFavoriteIds((prev) => prev.filter((favId) => favId !== id))
        await AsyncStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify(updatedFavorites)
        )
        updateNavigationParams(updatedFavorites)
        Toast.show({
          type: 'info',
          text1: 'Anúncio removido dos favoritos.',
        })
      } catch (error) {
        console.error('Failed to remove favorite:', error)
      }
    },
    [favorites]
  )

  const toggleFavorite = useCallback(
    async (id: string) => {
      try {
        setIsFavoriteLoading(true)
        if (favoriteIds.includes(id)) {
          await removeFavorite(id)
        } else {
          await addFavorite(id)
        }
      } catch (error) {
        console.error('Failed to update favorites:', error)
      } finally {
        setIsFavoriteLoading(false)
      }
    },
    [favoriteIds, removeFavorite, addFavorite]
  )

  const removeAllFavorites = useCallback(async () => {
    try {
      setIsFavoriteLoading(true)
      await favoritesRemoveAll()
      setFavorites([])
      setFavoriteIds([])
      updateNavigationParams([])
      Toast.show({ type: 'info', text1: 'Todos os favoritos foram removidos' })
    } catch (error) {
      console.error('Failed to remove all favorites:', error)
    } finally {
      setIsFavoriteLoading(false)
    }
  }, [])

  const isFavorited = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  )

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, [loadFavorites])
  )

  return {
    favorites,
    favoriteIds,
    setFavorites,
    isFavoriteLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    removeAllFavorites,
    isFavorited,
    loadFavorites,
    setIsFavoriteLoading,
  }
}
