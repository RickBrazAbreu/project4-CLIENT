import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateItemSuccess, updateItemFailure } from '../shared/AutoDismissAlert/messages'

// componets 
import ItemForm from '../shared/ItemForm'

const EditItemModal = (props) => {
    const { 
        user, show, handleClose, updateItem, msgAlert, triggerRefresh
    } = props

    //PlaceHolder for the Item going to be edited, so I'll have all the part that are not been changed.
    const [item, setItem] = useState(props.item)

    console.log('item in edit modal', item)

    const handleChange = (e, index) => {
        setItem(prevItem => {
            // the key/value pair
            const updatedName = e.target.name
            let updatedValue = e.target.value
            let updatedId = index

            // console.logs
            console.log('this is the input type', e.target.type)
            console.log('%s: %s', e.target.name, e.target.value)

            if (e.target.type === 'number') {
                updatedValue = Number(e.target.value)
            }

            let newArr = [...item.substats]
            let updatedItem = null
            
            //Checking if this is an object fuild that is inside the array substats
            // First key/value pair in the array is stat.
            if (updatedName === 'substats.stat') {
                newArr[updatedId] = {
                    ...prevItem.substats[updatedId],
                    stat: updatedValue
                }
                updatedItem = {substats: [...newArr]}
            } else if (updatedName === 'substats.amount') {
                // Second key/value pair in the array is amount
                newArr[updatedId] = {
                    ...prevItem.substats[updatedId],
                    amount: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
            } else {
                // If not in the array just create the key/value pair in an object
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

    const handleSubmit = (e) => {
        e.preventDefault()
        updateItem(user, item)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateItemSuccess,
                    variant: 'success'
                })
            })

            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateItemFailure,
                    variant: 'danger'
                })
            )
    }

    // Displays the edit pop up when the user had clicked on it.
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ItemForm 
                    item={item}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Item"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditItemModal