import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export function RadioButton({ label, value, selected, onSelect }) {
  return (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={() => onSelect(value)}
    >
      <View style={styles.outerCircle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
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
