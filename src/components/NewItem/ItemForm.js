import useInput from '../../hooks/use-input'
import classes from './BasicForm.module.css'
import Card from '../UI/Card'

const ItemForm = (props) => {
  // name
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '')

  // description
  const {
    value: enteredDescription,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    isValid: enteredDescriptionIsValid,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== '')

  // For price
  const {
    value: enteredPrice,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    isValid: enteredPriceIsValid,
    reset: resetPriceInput,
  } = useInput((value) => value.trim() !== '' && value > 0)

  let formIsValid = false

  if (enteredNameIsValid && enteredDescriptionIsValid && enteredPriceIsValid) {
    formIsValid = true
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault()

    if (
      !enteredNameIsValid ||
      !enteredDescriptionIsValid ||
      !enteredPriceIsValid
    ) {
      return
    }

    resetNameInput()
    resetDescriptionInput()
    resetPriceInput()

    props.onEnterItem({
      name: enteredName,
      description: enteredDescription,
      price: enteredPrice,
    })
  }

  const firstnameInputClasses = nameInputHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`

  const lastnameInputClasses = descriptionInputHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`

  const emailInputClasses = priceInputHasError
    ? `${classes.formControl} ${classes.invalid}`
    : `${classes.formControl}`

  return (
    <Card>
      <form onSubmit={formSubmissionHandler}>
        <div className={`${classes.controlGroup} ${firstnameInputClasses}`}>
          <div className='form-control'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className={classes.errorText}>Name must not be empty</p>
            )}
          </div>
          <div className={`${classes.controlGroup} ${lastnameInputClasses}`}>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              id='description'
              onChange={descriptionChangedHandler}
              onBlur={descriptionBlurHandler}
              value={enteredDescription}
            />
            {descriptionInputHasError && (
              <p className={classes.errorText}>Description must not be empty</p>
            )}
          </div>
        </div>
        {/* Price */}
        <div className={`${classes.controlGroup} ${emailInputClasses}`}>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            onChange={priceChangedHandler}
            onBlur={priceBlurHandler}
            value={enteredPrice}
          />
          {priceInputHasError && (
            <p className='error-text'>Please enter valid price.</p>
          )}
        </div>
        <div className='form-actions'>
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    </Card>
  )
}

export default ItemForm
