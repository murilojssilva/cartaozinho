import { TouchableOpacityProps } from 'react-native'

export interface IAdProps {
  id: number
  name: string
  office: string
  officeType: string[]
  categories: string[]
  description: string
  serviceType: string[]
  phone: string
  email: string
  whatsapp: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  complement: string
}

export interface ICardItemProps extends TouchableOpacityProps {
  name: string
  phone: string
  email: string
  whatsapp: string
  office: string
  officeType: string[]
  categories: string[]
}
