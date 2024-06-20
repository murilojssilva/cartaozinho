import { useState } from 'react'

const useOrderMenu = (initialState = true) => {
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

export default useOrderMenu
