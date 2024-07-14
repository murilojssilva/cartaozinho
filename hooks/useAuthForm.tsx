import { useState } from 'react'
import { useNavigation } from 'expo-router'
import Toast from 'react-native-toast-message'
import { userCreate } from '@/app/storage/user/userCreate'
import { userEdit } from '@/app/storage/user/userEdit'
import { usersGetAll } from '@/app/storage/user/usersGetAll'
import uuid from 'react-native-uuid'
import { useUser } from '@/app/context/UserContext'
import { userGetById } from '@/app/storage/user/userGetById'

interface AuthForm {
  email: string
  password: string
}

interface SignUpForm extends AuthForm {
  name: string
  lastName: string
  nickname: string
  phone: string
  confirmPassword: string
}

interface EditProfileForm {
  name: string
  lastName: string
  nickname: string
  phone: string
}

interface EditPasswordForm {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export function useAuthForm(
  initialValues: AuthForm | SignUpForm | EditProfileForm | EditPasswordForm
) {
  const [formValues, setFormValues] = useState(initialValues)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUserAd, setIsLoadingUserAd] = useState(false)
  const [userAd, setUserAd] = useState({})

  const navigation = useNavigation()
  const { user, setUser } = useUser()

  const handleChange = (
    name:
      | keyof AuthForm
      | keyof SignUpForm
      | keyof EditProfileForm
      | keyof EditPasswordForm,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    const { email, password } = formValues as AuthForm
    if (!email || !password) {
      Toast.show({
        type: 'info',
        text1: 'Erro ao fazer o login',
        text2: 'Por favor, preencha todos os campos.',
      })
      return
    }

    setIsLoading(true)

    try {
      const users = await usersGetAll()
      const user = users.find(
        (user) => user.email === email && user.password === password
      )

      if (!user) {
        throw new Error('Usuário não encontrado ou senha incorreta.')
      }
      setUser(user)

      Toast.show({
        text1: 'Login realizado com sucesso',
        onShow: () => navigation.navigate('App', { screen: 'Home' }),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: error instanceof Error ? error.message : 'Erro desconhecido.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    const {
      name,
      lastName,
      nickname,
      phone,
      email,
      password,
      confirmPassword,
    } = formValues as SignUpForm
    if (
      !name ||
      !lastName ||
      !nickname ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Toast.show({
        type: 'info',
        text1: 'Erro ao criar conta',
        text2: 'Por favor, preencha todos os campos.',
      })
      return
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'info',
        text1: 'Senhas não coincidem',
        text2: 'A senha e a confirmação não são iguais.',
      })

      return
    }

    setIsLoading(true)

    try {
      userCreate({
        id: uuid.v4(),
        name,
        phone,
        lastName,
        nickname,
        email,
        password,
      })
      Toast.show({
        text1: 'Conta criada com sucesso!',
        text2: 'Sua conta foi criada com sucesso.',
        onShow: () => navigation.navigate('App', { screen: 'Home' }),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar conta',
        text2: error as string,
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleLogout() {
    try {
      setIsLoading(true)
      setUser(null)
      Toast.show({
        type: 'success',
        text1: 'Usuário deslogado com sucesso.',
        onShow: () => navigation.navigate('Auth', { screen: 'Login' }),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar conta',
        text2: error as string,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProfile = async () => {
    const { name, lastName, nickname, phone } = formValues as EditProfileForm
    if (!name || !lastName || !nickname || !phone) {
      Toast.show({
        type: 'info',
        text1: 'Erro ao editar perfil',
        text2: 'Por favor, preencha todos os campos.',
      })
      return
    }

    setIsLoading(true)

    try {
      const updatedUser = { ...user, name, lastName, nickname, phone }
      // Atualizar o usuário no banco de dados
      await userEdit(updatedUser)
      setUser(updatedUser)

      Toast.show({
        text1: 'Perfil editado com sucesso!',
      })
      navigation.navigate('Profile')
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar perfil',
        text2: error instanceof Error ? error.message : 'Erro desconhecido.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPassword = async () => {
    const { currentPassword, newPassword, confirmNewPassword } =
      formValues as EditPasswordForm

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Toast.show({
        type: 'info',
        text1: 'Erro ao editar senha',
        text2: 'Por favor, preencha todos os campos.',
      })
      return
    }

    if (newPassword !== confirmNewPassword) {
      Toast.show({
        type: 'info',
        text1: 'Senhas não coincidem',
        text2: 'A nova senha e a confirmação não são iguais.',
      })
      return
    }

    if (currentPassword !== user.password) {
      Toast.show({
        type: 'info',
        text1: 'Senha atual incorreta',
        text2: 'A senha atual fornecida está incorreta.',
      })
      return
    }

    setIsLoading(true)

    try {
      const updatedUser = { ...user, password: newPassword }
      // Atualizar o usuário no banco de dados
      await userEdit(updatedUser)
      setUser(updatedUser)

      Toast.show({
        text1: 'Senha editada com sucesso!',
      })
      navigation.navigate('Profile')
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar senha',
        text2: error instanceof Error ? error.message : 'Erro desconhecido.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGetUserAd(id: string): Promise<IAdProps | null> {
    setIsLoadingUserAd(true)
    try {
      const ad = await userGetById(id)
      if (ad) setUserAd(ad)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar dados.',
        text2: error as string,
      })
    } finally {
      setIsLoadingUserAd(false)
    }
  }

  return {
    formValues,
    isLoading,
    isLoadingUserAd,
    userAd,
    handleGetUserAd,
    setIsLoadingUserAd,
    handleChange,
    handleLogin,
    handleSignUp,
    handleLogout,
    handleEditProfile,
    handleEditPassword,
  }
}
