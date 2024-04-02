import { FormHelperText, Button, OutlinedInput } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'

const NumberInput = ({ name, formControl }) => {
  const [isMinusKeyPressed, setIsMinusKeyPresses] = useState(false)
  const [isPlusKeyPressed, setIsPlusKeyPresses] = useState(false)
  const clearRef = useRef()

  function handleMinus(field) {
    console.log('s')
    clearRef.current = setInterval(() => {
      const newValue = parseInt(field.value, 10) - 1
      field.onChange(newValue)
      console.log('minus')
    }, 1)
  }
  console.log(isPlusKeyPressed, isMinusKeyPressed)

  useEffect(() => {
    if (isMinusKeyPressed) {
      clearInterval(clearRef.current)
    }
  }, [isMinusKeyPressed])

  return (
    <Controller
      name={name}
      control={formControl}
      render={({ field, fieldState: { error } }) => (
        <>
          <Button
            variant="outlined"
            onMouseDown={() => {
              setIsMinusKeyPresses(true)
              handleMinus(field)
            }}
            onMouseUp={() => setIsMinusKeyPresses(false)}
            onMouseLeave={() => setIsMinusKeyPresses(false)}
          >
            -
          </Button>
          <OutlinedInput size="small" type="text" {...field} readOnly />
          <Button
            variant="outlined"
            onMouseDown={() => {
              setIsPlusKeyPresses(true)
              const newValue = parseInt(field.value, 10) + 1
              field.onChange(newValue)
            }}
            onMouseUp={() => setIsMinusKeyPresses(false)}
            onMouseLeave={() => setIsMinusKeyPresses(false)}
          >
            +
          </Button>
          {!!error && (
            <FormHelperText color="red" error>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  )
}

export default NumberInput
