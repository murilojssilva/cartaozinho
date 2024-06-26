import { useState } from 'react'

export default function useFilterMenu(initialState = true) {
  const [filterMenu, setFilterMenu] = useState(initialState)

  const toggleFilterMenu = () => {
    setFilterMenu((prevState) => !prevState)
  }

  return {
    filterMenu,
    toggleFilterMenu,
    setFilterMenu,
  }
}
