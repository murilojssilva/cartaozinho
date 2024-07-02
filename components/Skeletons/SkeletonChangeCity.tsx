import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { StyledAnimatedView } from '@/app/styled'
import { useColorSkeletonTransition } from '@/hooks/useColorSkeletonTransition'

export function SkeletonChangeCity() {
  const backgroundColor = useColorSkeletonTransition()

  return (
    <StyledAnimatedView
      style={{ backgroundColor }}
      className='flex-2 flex-row p-6 my-2 rounded-xl'
    />
  )
}
