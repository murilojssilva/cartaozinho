import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Location from 'expo-location'
import Toast from 'react-native-toast-message'

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const useGetCity = () => {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [isLoadingGetCity, setIsLoadingGetCity] = useState(false)

  const fetchCity = async (query: string) => {
    try {
      setIsLoadingGetCity(true)
      const formattedQuery = removeAccents(
        query.toLowerCase().replace(/\s+/g, '-').replace(/ç/g, 'c')
      )

      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${formattedQuery}`
      )

      if (
        response.data &&
        response.data.microrregiao &&
        response.data.microrregiao.mesorregiao &&
        response.data.microrregiao.mesorregiao.UF
      ) {
        const { nome, microrregiao } = response.data
        const estado = microrregiao.mesorregiao.UF.sigla
        setCity(nome)
        setState(estado)
      } else {
        setCity('Cidade não encontrada')
        setState('')
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Erro ao buscar a cidade.`,
        text2: error as string,
      })

      setCity('Erro ao buscar a cidade')
      setState('')
    } finally {
      setIsLoadingGetCity(false)
    }
  }

  const fetchCityByCoordinates = async (latitude, longitude) => {
    try {
      setIsLoadingGetCity(true)
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

      if (response) {
        const formattedQuery = removeAccents(
          response[0].subregion
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/ç/g, 'c')
        )

        const response2 = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${formattedQuery}`
        )

        if (
          response2.data &&
          response2.data.microrregiao &&
          response2.data.microrregiao.mesorregiao &&
          response2.data.microrregiao.mesorregiao.UF
        ) {
          const { nome, microrregiao } = response2.data
          const estado = microrregiao.mesorregiao.UF.sigla
          setCity(nome)
          setState(estado)
        } else {
          setCity('Cidade não encontrada')
          setState('')
        }
      } else {
        setCity('Cidade não encontrada')
        setState('')
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Erro ao buscar a cidade pelas coordenadas.`,
        text2: error as string,
      })

      setCity('Erro ao buscar a cidade')
      setState('')
    } finally {
      setIsLoadingGetCity(false)
    }
  }

  const getCurrentLocation = async () => {
    try {
      setIsLoadingGetCity(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setCity('Permissão para acesso à localização negada')
        setState('')
        return
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      const { latitude, longitude } = location.coords

      fetchCityByCoordinates(latitude, longitude)
    } catch (error) {
      console.error('Erro ao obter localização atual:', error)
      setCity('Erro ao obter localização')
      setState('')
    } finally {
      setIsLoadingGetCity(false)
    }
  }

  useEffect(() => {
    if (!city) {
      getCurrentLocation()
    }
  }, [city])

  return {
    city,
    state,
    fetchCity,
    getCurrentLocation,
    isLoadingGetCity,
  }
}

export default useGetCity
