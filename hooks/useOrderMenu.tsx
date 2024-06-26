import { useState } from 'react'

export type OrderMenuState = {
  orderMenu: boolean
  toggleOrderMenu: () => void
  setOrderMenu: (visible: boolean) => void
}

export default function useOrderMenu(initialState = true): OrderMenuState {
  const [orderMenu, setOrderMenu] = useState(initialState)

  const toggleOrderMenu = () => {
    setOrderMenu((prevState) => !prevState)
  }

  return {
    orderMenu,
    toggleOrderMenu,
    setOrderMenu,
  }
}
