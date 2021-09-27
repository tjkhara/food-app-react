import { Fragment } from 'react'

import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'
import BasicForm from '../Layout/BasicForm'

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <BasicForm />
      <AvailableMeals />
    </Fragment>
  )
}

export default Meals
