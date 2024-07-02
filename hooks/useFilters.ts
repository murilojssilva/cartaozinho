import { useState } from 'react'

interface IFilters {
  name: string
  categories: string[]
  officeTypes: string[]
  serviceTypes: string[]
}

interface IUseFilters {
  filters: IFilters
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>
  handleFilterChange: (
    filterName: keyof IFilters,
    value: string | string[]
  ) => void
  resetFilters: () => void
}

export function useFilters(
  initialFilters: IFilters = {
    name: '',
    categories: [],
    officeTypes: [],
    serviceTypes: [],
  }
): IUseFilters {
  const [filters, setFilters] = useState<IFilters>(initialFilters)

  const handleFilterChange = (
    filterName: keyof IFilters,
    value: string | string[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }))
  }

  const resetFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, setFilters, handleFilterChange, resetFilters }
}
