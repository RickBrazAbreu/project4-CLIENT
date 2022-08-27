import { useState } from 'react'
import { createItem } from '../../api/itens'
import { useNavigate } from 'react-router-dom'
import { createItemSuccess, createItemFailure } from '../shared/AutoDismissAlert/messages'
import ItemForm from '../shared/ItemForm'

const CreateItem = (props) => {
    console.log('these are the props in createItem\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [item, setItem] = useState({
        item: '',
        brand: '',
        price: '',
        new: false
    })

    console.log('this is item in createItem', item)

    const handleChange = (e) => {
        setItem(prevItem => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "new" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "new" && !e.target.checked) {
                updatedValue = false
            }

            const updatedItem = {
                [updatedName]: updatedValue
            }
            return {
                ...prevItem,
                ...updatedItem
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createItem(user, item)
            // if we're successful, navigate to the show page for the new item
            .then(res => { navigate(`/itens/${res.data.item.id}`)})
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