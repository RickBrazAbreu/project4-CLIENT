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
        itemtype: '',
        new: false
    })

    console.log('this is item in createItem', item)

    const handleChange = (e) => {
        setItem(prevItem => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }
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
    const handleSubmit = (e) => {
        e.preventDefault()

        createItem(user, item)
            .then(res => { navigate(`/itens/${res.data.item.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createItemSuccess,
                    variant: 'success'
                })
            })
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