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
  setSelectedCategories: React.Dispatch<React.SetStateAction<string>>
  setSelectedOfficeTypes: React.Dispatch<React.SetStateAction<string>>
  setSelectedServiceTypes: React.Dispatch<React.SetStateAction<string>>
  selectedCategories: string[]
  selectedOfficeTypes: string[]
  selectedServiceTypes: string[]
  handleFilterChange: (
    filterName: keyof IFilters,
    value: string | string[]
  ) => void
  handleClearFilters: () => void
  resetFilters: () => void
  handleApplyFilters: () => void
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.categories || []
  )
  const [selectedOfficeTypes, setSelectedOfficeTypes] = useState<string[]>(
    initialFilters.officeTypes || []
  )
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    initialFilters.serviceTypes || []
  )

  const handleFilterChange = (
    filterName: keyof IFilters,
    value: string | string[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }))

    // Atualizar os estados selecionados com base no filtro alterado
    switch (filterName) {
      case 'categories':
        setSelectedCategories(value as string[])
        break
      case 'officeTypes':
        setSelectedOfficeTypes(value as string[])
        break
      case 'serviceTypes':
        setSelectedServiceTypes(value as string[])
        break
      default:
        break
    }
  }

  const resetFilters = () => {
    setFilters(initialFilters)
    setSelectedCategories(initialFilters.categories || [])
    setSelectedOfficeTypes(initialFilters.officeTypes || [])
    setSelectedServiceTypes(initialFilters.serviceTypes || [])
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedOfficeTypes([])
    setSelectedServiceTypes([])
    setFilters({
      name: '',
      categories: [],
      officeTypes: [],
      serviceTypes: [],
    })
  }

  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      categories: selectedCategories,
      officeTypes: selectedOfficeTypes,
      serviceTypes: selectedServiceTypes,
    })
    // Adicione aqui a lógica para aplicar os filtros, como fechar modais, atualizar listas, etc.
  }

  return {
    filters,
    setFilters,
    selectedCategories,
    selectedOfficeTypes,
    selectedServiceTypes,
    handleClearFilters,
    setSelectedCategories,
    setSelectedOfficeTypes,
    setSelectedServiceTypes,
    handleFilterChange,
    resetFilters,
    handleApplyFilters,
  }
}
