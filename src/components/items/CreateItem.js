import { useState } from 'react'
import { createItem } from '../../api/items'
import { useNavigate } from 'react-router-dom'
import { createItemSuccess, createItemFailure } from '../shared/AutoDismissAlert/messages'
import ItemForm from '../shared/ItemForm'

import '../../components/style.css'

const CreateItem = (props) => {
    console.log('these are the props in createItem\n', props)
    
    // User and messages
    const { user, msgAlert } = props
    const navigate = useNavigate()

    // Used to create the item object to send to the API.
    const [item, setItem] = useState({
        name: '',
        slot: '',
        level: '',
        mainStat: '',
        mainStatAmount: '',
        substats: [{
            stat: '',
            amount: ''},{
            stat: '',
            amount: ''},{
            stat: '',
            amount: ''},{
            stat: '',
            amount: ''}]
    })

    console.log('this is item in createItem', item)

    const handleChange = (e, index) => {
        setItem(prevItem => {
            // key/value pair in the item object.
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // Updated key/value pair in the item object
            let updatedItem = null
            // Updated key/value that in the substats array 
            // array index - To know with one out of the 4 to update.
            let updatedId = index
            // used make the array
            let newArr = [...item.substats]
            
            if (e.target.type === 'number') {
                updatedValue = parseFloat(e.target.value)
            }

            // Detect if the array needs be updated and if it's stat one or amount
            if (updatedName === 'substats.stat') {
                newArr[updatedId] = {
                    ...prevItem.substats[updatedId],
                    stat: updatedValue
                }
                updatedItem = {substats: [...newArr]}
            } else if (updatedName === 'substats.amount') {
                newArr[updatedId] = {
                    ...prevItem.substats[updatedId],
                    amount: updatedValue
                }
                updatedItem = {substats: [...newArr]}
            //If it's nut one of the arrays, nothing special needs to be done to it.
            } else {
                updatedItem = {
                    ...prevItem.substats,
                    [updatedName]: updatedValue
                }
            }
            
            return {
                ...prevItem,
                ...updatedItem
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        e.preventDefault()

        createItem(user, item)
            // if we're successful, navigate to the show page for the new item
            .then(res => { navigate(`/items/${res.data.item._id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createItemSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createItemFailure,
                    variant: 'danger'
                })
            )
    }

    // the form the user fills out.
    return (
        <ItemForm 
            item={ item } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new item!"
        />
    )
}

export default CreateItem