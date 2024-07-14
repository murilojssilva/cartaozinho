import { useState, useEffect } from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'
import * as Location from 'expo-location'
import { ActionButton } from './ActionButton'
import { StyledView } from '@/app/styled'
import Toast from 'react-native-toast-message'

interface IMapScreenProps {
  cep: string
  number: string
}

export function MapScreen({ cep, number }: IMapScreenProps) {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: `Permissão de localização negada`,
        })

        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    }

    const fetchCoordinates = async () => {
      try {
        const viaCepResponse = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        )

        if (viaCepResponse.data.erro) {
          Toast.show({
            type: 'error',
            text1: `CEP inválido`,
          })

          return
        }

        const { logradouro, bairro, localidade, uf } = viaCepResponse.data
        const address = `${logradouro} ${number}, ${bairro}, ${localidade}, ${uf}, Brasil`

        const nominatimResponse = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: address,
              format: 'json',
              addressdetails: 1,
              countrycodes: 'br',
              limit: 1,
            },
          }
        )

        if (nominatimResponse.data.length > 0) {
          const { lat, lon } = nominatimResponse.data[0]
          setRegion({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
        } else {
          Toast.show({
            type: 'error',
            text1: `Coordenadas não encontradas para este endereço.`,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserLocation()
    fetchCoordinates()
  }, [cep, number])

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${region.latitude},${region.longitude}&travelmode=driving`
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsMyLocationButton
        showsUserLocation
        toolbarEnabled
        zoomEnabled
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>

      <StyledView className='mt-4'>
        <ActionButton
          icon='map'
          backgroundColor='cyan-700'
          textColor='white'
          iconColor='white'
          text='Abrir no Google Maps'
          onPress={handleOpenMaps}
        />
      </StyledView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 300,
    height: 200,
  },
})
