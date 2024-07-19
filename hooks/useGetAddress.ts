import { useState } from 'react'
import axios from 'axios'
import Toast from 'react-native-toast-message'

type Address = {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export default function useGetAddress() {
  const [newAddress, setNewAddress] = useState<Address>({
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

    if (!/^\d{8}$/.test(cleanedCep)) {
      Toast.show({
        type: 'error',
        text1: 'CEP inválido.',
        text2: 'O CEP deve conter 8 dígitos numéricos.',
      })
      return
    }

    setNewAddress((prevAddress) => ({ ...prevAddress, cep }))

    if (cleanedCep.length === 8) {
      const source = axios.CancelToken.source()

      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cleanedCep}/json/`,
          { cancelToken: source.token }
        )
        const { logradouro, bairro, localidade, uf, erro } = response.data

        if (erro) {
          Toast.show({
            type: 'error',
            text1: 'CEP não encontrado.',
            text2: 'Verifique o CEP e tente novamente.',
          })
          return
        }

        setNewAddress((prevAddress) => ({
          ...prevAddress,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        }))
        Toast.show({
          type: 'info',
          text1: 'Dados do endereço coletados.',
        })
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Requisição cancelada:', error.message)
        } else {
          Toast.show({
            type: 'error',
            text1: 'Erro ao recuperar o endereço.',
            text2: 'Verifique o CEP e tente novamente.',
          })
        }
      }

      return () => {
        source.cancel('Requisição cancelada pelo usuário.')
      }
    }
  }

  return {
    newAddress,
    setNewAddress,
    handleCepChange,
  }
}
