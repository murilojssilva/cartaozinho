import { useState } from 'react'

export const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false)

  console.log(showAlert)

  return { showAlert, setShowAlert }
}
