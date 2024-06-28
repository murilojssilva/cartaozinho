import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile } from '../screens/Profile'
import { EditProfile } from '../screens/EditProfile'
import { EditPassword } from '../screens/EditPassword'
import { MyAd } from '../screens/MyAd'
import { EditAd } from '../screens/EditAd'

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
