import { StyledText, StyledTouchableOpacity, StyledView } from '@/app/styled'
import { StyleSheet } from 'react-native'

export function RadioButton({ label, value, selected, onSelect }) {
  return (
    <StyledTouchableOpacity
      style={styles.radioContainer}
      onPress={() => onSelect(value)}
    >
      <StyledView style={styles.outerCircle}>
        {selected && <StyledView style={styles.innerCircle} />}
      </StyledView>
      <StyledText style={styles.radioLabel}>{label}</StyledText>
    </StyledTouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
  },
})
