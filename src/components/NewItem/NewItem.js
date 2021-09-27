import ItemForm from './ItemForm'
import useHttp from '../../hooks/use-http'
import classes from './NewItem.module.css'

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp()

  // Argument 1 - what do you want to do with the data?
  // Get the data
  // prepare an object
  // send that data to parent to add to array
  const applyDataFn = (itemObj, data) => {
    const generatedId = data.name // firebase-specific => "name" contains generated id
    const createdItem = { id: generatedId, ...itemObj }
    props.onAddItem(createdItem)
  }

  const enterItemHandler = async (itemObj) => {
    // // Argument 2 - what type of request is this?
    const requestConfigObj = {
      url: 'https://react-http-55d40-default-rtdb.asia-southeast1.firebasedatabase.app/items.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: itemObj,
    }

    sendTaskRequest(requestConfigObj, applyDataFn.bind(null, itemObj))
  }

  return (
    <section className={classes.itemForm}>
      <ItemForm onEnterItem={enterItemHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </section>
  )
}

export default NewTask
