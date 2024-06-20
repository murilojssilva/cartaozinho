import { useState } from 'react'

const useFilterMenu = (initialState = true) => {
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

export default useFilterMenu
