import { useState } from 'react'
import axios from 'axios'
import { Alert } from 'react-native'

export default function useGetAddress() {
  const [address, setAddress] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

  const handleCepChange = async (cep: string) => {
    const cleanedCep = cep.replace('-', '')

    setAddress((prevAddress) => ({ ...prevAddress, cep }))

    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanedCep}/json/`
        )
        const { logradouro, bairro, localidade, uf } = response.data

        setAddress((prevAddress) => ({
          ...prevAddress,
          rua: logradouro,
          bairro,
          cidade: localidade,
          estado: uf,
        }))
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível recuperar o endereço. Verifique o CEP e tente novamente.'
        )
      }
    }
  }

  return {
    address,
    setAddress,
    handleCepChange,
  }
}
