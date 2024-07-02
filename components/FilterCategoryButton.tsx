import { StyledTouchableOpacity, StyledText } from '@/app/styled'

interface IFilterCategoryButtonProps {
  label: string
  isSelected: boolean
  onPress: () => void
}

export function FilterCategoryButton({
  label,
  isSelected,
  onPress,
}: IFilterCategoryButtonProps) {
  return (
    <StyledTouchableOpacity
      className={`m-2 p-2 rounded-full items-center ${
        isSelected ? 'bg-lime-600' : 'bg-gray-200'
      }`}
      onPress={onPress}
    >
      <StyledText
        className={`text-xs ${isSelected ? 'text-white' : 'text-black'}`}
      >
        {label}
      </StyledText>
    </StyledTouchableOpacity>
  )
}
