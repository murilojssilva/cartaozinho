import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native'
import { DefaultTheme as PaperDarkTheme } from 'react-native-paper'

const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    primary: '#bb86fc',
    accent: '#03dac6',
  },
}

export default DarkTheme
