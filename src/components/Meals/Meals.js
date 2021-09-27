import { Fragment, useState, useEffect } from 'react'

import MealsSummary from './MealsSummary'
import AvailableMeals from './AvailableMeals'
import NewItem from '../NewItem/NewItem'
import useHttp from '../../hooks/use-http'

const Meals = () => {
  const [meals, setMeals] = useState([])

  const { isLoading, error, sendRequest: fetchMeals } = useHttp()

  useEffect(() => {
    // Argument 1
    const applyDataFn = (data) => {
      const loadedMeals = []
      // console.log(data)
      for (const mealKey in data) {
        loadedMeals.push({
          id: mealKey,
          description: data[mealKey].description,
          name: data[mealKey].name,
          price: data[mealKey].price,
        })
      }
      console.log(loadedMeals)
      setMeals(loadedMeals)
    }
    // Argument 2
    const requestConfigObj = {
      url: 'https://react-http-55d40-default-rtdb.asia-southeast1.firebasedatabase.app/items.json',
    }

    fetchMeals(requestConfigObj, applyDataFn)
  }, [fetchMeals])

  // update state
  const addMealHandler = (meal) => {
    setMeals((prevMeals) => prevMeals.concat(meal))
  }

  return (
    <Fragment>
      <MealsSummary />
      <NewItem onAddItem={addMealHandler} />
      <AvailableMeals availableMeals={meals} />
    </Fragment>
  )
}

export default Meals
