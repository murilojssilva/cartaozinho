import { ActionButton } from '@/components/ActionButton'
import { Header } from '@/components/Header'
import { InputText } from '@/components/InputText'
import { SkeletonActionButton } from '@/components/Skeletons/SkeletonActionButton'
import { SkeletonInputText } from '@/components/Skeletons/SkeletonInputText'
import { SkeletonTag } from '@/components/Skeletons/SkeletonTag'
import { Tag } from '@/components/Tag'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native'

export default function EditAd() {
  const categories = [
    'Beleza',
    'Saúde',
    'Educação',
    'Entretenimento',
    'Internet',
    'Games',
    'Tecnologia',
    'Cabelo',
    'Serviço',
    'Reciclagem',
    'Jornalismo',
    'Evento',
  ]
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white'
    >
      <Header title='Editar anúncio' icon='pen' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className='p-4'
      >
        <View className='flex-col gap-2'>
          <Text className='font-bold text-xl my-4'>Informações do anúncio</Text>
          <View className='flex-2 flex-col gap-2'>
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Nome' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Cargo' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='Descrição'
                numberOfLines={10}
                multiline={true}
                textAlignVertical='top'
                className='justify-start'
              />
            )}
          </View>
          <Text className='font-bold text-xl my-4'>Atendimento</Text>
          {isLoading ? (
            <View className='flex-2 flex-row'>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </View>
          ) : (
            <View className='flex-row gap-2'>
              <Tag text='À domicílio' />
              <Tag text='No estabelecimento' />
              <Tag text='Remoto' />
            </View>
          )}

          <Text className='font-bold text-xl my-4'>Categoria</Text>
          {isLoading ? (
            <View className='flex-2 flex-row'>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              className='flex-row'
            >
              {categories.map((categorie, index) => (
                <Tag key={index} text={categorie} />
              ))}
            </ScrollView>
          )}
          <Text className='font-bold text-xl my-4'>Contato</Text>
          <View className='gap-2'>
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='Telefone'
                keyboardAppearance='number'
                keyboardType='number'
              />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText
                text='WhatsApp'
                keyboardAppearance='number'
                keyboardType='number'
              />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='E-mail' />
            )}
          </View>
          <Text className='font-bold text-xl my-4'>Localização</Text>
          <View className='gap-2 mb-4'>
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='CEP' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Rua' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Número' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Bairro' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Cidade' />
            )}
            {isLoading ? (
              <SkeletonInputText inputSize={6} />
            ) : (
              <InputText text='Estado' />
            )}
          </View>
        </View>
      </ScrollView>
      <View className='p-4'>
        {isLoading ? (
          <SkeletonActionButton />
        ) : (
          <ActionButton
            backgroundColor='cyan-700'
            textColor='white'
            text='Editar anúncio'
            icon='id-card'
          />
        )}
      </View>
    </KeyboardAvoidingView>
  )
}
