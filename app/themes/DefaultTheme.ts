import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper'

const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#ffffff',
    card: '#f8f8f8',
    text: '#000000',
    primary: '#6200ee',
    accent: '#03dac4',
  },
}

export default DefaultTheme
