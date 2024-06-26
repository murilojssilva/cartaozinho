import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile } from '../screens/profile'
import EditProfile from '../screens/editProfile'
import EditPassword from '../screens/editPassword'
import MyAd from '../screens/myAd'
import EditAd from '../screens/editAd'

const { Navigator, Screen } = createNativeStackNavigator()

function ProfileNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Profile' component={Profile} />
      <Screen name='EditProfile' component={EditProfile} />
      <Screen name='EditPassword' component={EditPassword} />
      <Screen name='MyAd' component={MyAd} />
      <Screen name='EditAd' component={EditAd} />
    </Navigator>
  )
}

export default ProfileNavigator
