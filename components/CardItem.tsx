import { Ionicons } from '@expo/vector-icons'

import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { useNavigation } from 'expo-router'
import { SocialButton } from './SocialButton'
import { Tag } from './Tag'
import { useState } from 'react'

interface ICardItemProps extends TouchableOpacityProps {
  name: string
  office: string
  officeType: string
  categories: string[]
}

export function CardItem({
  name,
  office,
  officeType,
  categories,
  ...props
}: ICardItemProps) {
  const navigation = useNavigation()

  const [isFavorited, setIsFavorited] = useState(false)
  return (
    <TouchableOpacity
      {...props}
      className='flex-2 flex-col gap-0 bg-gray-200 p-4 mb-4 w-full'
    >
      <View className='flex-1 flex-row my-4'>
        <View className='flex-1 flex-row justify-between items-start'>
          <View className='flex-1 flex-row gap-2'>
            <View className='flex-2 items-center justify-center bg-gray-300 p-4 rounded-xl'>
              <Ionicons name='person' size={32} color='gray-300' />
            </View>
            <View className='flex-1 flex-col'>
              <Text className='font-bold text-xl'>{name}</Text>
              <Text className='font-semibold text-sm'>{office}</Text>
              <Text className='font-normal text-xs'>{officeType}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
            <Ionicons
              name='bookmark'
              size={28}
              color={isFavorited ? '#0e7490' : '#9ca3af'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        className='flex-2 flex-row gap-2 my-4'
      >
        {categories.map((categorie: string, index) => (
          <Tag key={index} text={categorie} />
        ))}
      </ScrollView>
      <View className='flex-1 flex-row'>
        <SocialButton
          text='Telefone'
          color='gray-300'
          icon='phone'
          onPress={() => navigation.navigate('details')}
        />

        <SocialButton
          text='WhatsApp'
          color='green-300'
          icon='whatsapp'
          onPress={() => navigation.navigate('details')}
        />

        <SocialButton
          text='E-mail'
          color='gray-300'
          icon='envelope'
          onPress={() => navigation.navigate('details')}
        />
      </View>
    </TouchableOpacity>
  )
}
