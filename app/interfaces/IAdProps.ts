import { TouchableOpacityProps } from 'react-native'

export interface IAdProps {
  id: string | number[]
  user_id: string
  name: string
  office: string
  officeTypes: string[]
  categories: string[]
  description: string
  serviceTypes: string[]
  phone: string
  email: string
  whatsapp: string
  instagram: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  complement: string
}

export interface ICardItemProps extends TouchableOpacityProps {
  id: string
  user_id: string
  name: string
  phone: string
  email: string
  whatsapp: string
  instagram: string
  office: string
  officeTypes: string[]
  serviceTypes: string[]
  categories: string[]
}
