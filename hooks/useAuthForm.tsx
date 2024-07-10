import { useState } from 'react'
import { useNavigation } from 'expo-router'
import Toast from 'react-native-toast-message'

interface AuthForm {
  email: string
  password: string
}

interface SignUpForm extends AuthForm {
  name: string
  lastName: string
  phone: string
  confirmPassword: string
}

export function useAuthForm(initialValues: AuthForm | SignUpForm) {
  const [formValues, setFormValues] = useState(initialValues)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const handleChange = (
    name: keyof AuthForm | keyof SignUpForm,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
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
      Toast.show({
        text1: 'Login realizado com sucesso',
        onShow: () => navigation.navigate('App', { screen: 'Home' }),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    const { name, lastName, phone, email, password, confirmPassword } =
      formValues as SignUpForm
    if (
      !name ||
      !lastName ||
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
      Toast.show({
        text1: 'Conta criada com sucesso!',
        text2: 'Sua conta foi criada com sucesso.',
        onShow: () => navigation.navigate('App', { screen: 'Home' }),
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar conta',
        text2: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formValues,
    isLoading,
    handleChange,
    handleLogin,
    handleSignUp,
  }
}
