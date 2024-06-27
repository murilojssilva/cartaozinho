import { useState } from 'react'

export type changeCityMenuState = {
  changeCityMenu: boolean
  toggleChangeCityMenu: () => void
  setChangeCityMenu: (visible: boolean) => void
}

export default function useChangeCityMenu(
  initialState = true
): changeCityMenuState {
  const [changeCityMenu, setChangeCityMenu] = useState(initialState)

  const toggleChangeCityMenu = () => {
    setChangeCityMenu((prevState) => !prevState)
  }

  return {
    changeCityMenu,
    toggleChangeCityMenu,
    setChangeCityMenu,
  }
}
