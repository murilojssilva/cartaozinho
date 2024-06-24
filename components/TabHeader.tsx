import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ITabHeaderProps extends TouchableOpacityProps {
  text: string
  icon: string
  iconAction?: string
  iconActionColor?: string
}

export function TabHeader({
  text,
  icon,
  iconAction,
  iconActionColor = 'black',
  ...props
}: ITabHeaderProps) {
  return (
    <View
      className={`flex-2 flex-row justify-${
        iconAction ? 'between' : 'center'
      } gap-2 items-center bg-gray-100 p-8 rounded-xl`}
    >
      <View className='flex-2 flex-row items-center'>
        <FontAwesome5 name={icon} size={18} color='#0e7490' />
        <Text className='text-xl text-gray-700 font-semibold'>{` ${text}`}</Text>
      </View>
      <TouchableOpacity {...props}>
        <AntDesign name={iconAction} size={22} color={iconActionColor} />
      </TouchableOpacity>
    </View>
  )
}
