import { useState } from 'react'
import axios from 'axios'
import Toast from 'react-native-toast-message'

export default function useGetAddress() {
  const [newAddress, setNewAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  })

  const handleCepChange = async (cep: string) => {
    const cleanedCep = cep.replace('-', '')

    setNewAddress((prevAddress) => ({ ...prevAddress, cep }))

    if (cleanedCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanedCep}/json/`
        )
        const { logradouro, bairro, localidade, uf } = response.data

        setNewAddress((prevAddress) => ({
          ...prevAddress,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        }))
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: `Não foi possível recuperar o endereço. Verifique o CEP e tente novamente.`,
          text2: error as string,
        })
      }
    }
  }

  return {
    newAddress,
    setNewAddress,
    handleCepChange,
  }
}
