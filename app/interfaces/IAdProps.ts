import { TouchableOpacityProps } from 'react-native'

export interface IAdProps {
  id: string | string[]
  user_id: string
  name: string
  office: string
  officeTypes: string[]
  categories: string[]
  description: string
  serviceTypes: string[]
  contact: {
    phone: string
    email: string
    whatsapp: string
    instagram: string
  }
  address: {
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    complement: string
  }
  created_at: number
  updated_at: number
}

export interface ICardItemProps extends TouchableOpacityProps {
  id: string
  user_id: string
  name: string
  contact: {
    phone: string
    email: string
    whatsapp: string
    instagram: string
  }
  office: string
  description: string
  officeTypes: string[]
  serviceTypes: string[]
  categories: string[]
  address: {
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    complement: string
  }
  created_at: number
  updated_at: number
}
