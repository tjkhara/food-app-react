import { useReducer } from 'react'

const initialInputState = {
  value: '',
  isTouched: false,
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched,
    }
  }

  if (action.type === 'BLUR') {
    return {
      isTouched: true,
      value: state.value,
    }
  }

  if (action.type === 'RESET') {
    return {
      isTouched: false,
      value: '',
    }
  }

  return initialInputState
}

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  )

  // Name validation
  const valueIsValid = validateValue(inputState.value)
  // invalid only if it was touched and is invalid
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = (e) => {
    dispatch({
      type: 'INPUT',
      value: e.target.value,
    })
  }

  const inputBlurHandler = () => {
    dispatch({
      type: 'BLUR',
    })
  }

  const reset = () => {
    dispatch({
      type: 'RESET',
    })
  }

  return {
    value: inputState.value,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    isValid: valueIsValid,
    reset,
  }
}

export default useInput
