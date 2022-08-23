import { useState } from 'react'
import { createArtifact } from '../../api/artifacts'
import { useNavigate } from 'react-router-dom'
import { createArtifactSuccess, createArtifactFailure } from '../shared/AutoDismissAlert/messages'
import ArtifactForm from '../shared/ArtifactForm'

import '../../components/style.css'

const CreateArtifact = (props) => {
    console.log('these are the props in createArtifact\n', props)
    
    // User and messages
    const { user, msgAlert } = props
    const navigate = useNavigate()

    // Used to create the artifact object to send to the API.
    const [artifact, setArtifact] = useState({
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

    console.log('this is artifact in createArtifact', artifact)

    const handleChange = (e, index) => {
        setArtifact(prevArtifact => {
            // key/value pair in the artifact object.
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // Updated key/value pair in the artifact object
            let updatedArtifact = null
            // Updated key/value that in the substats array 
            // array index - To know with one out of the 4 to update.
            let updatedId = index
            // used make the array
            let newArr = [...artifact.substats]
            
            if (e.target.type === 'number') {
                updatedValue = parseFloat(e.target.value)
            }

            // Detect if the array needs be updated and if it's stat one or amount
            if (updatedName === 'substats.stat') {
                newArr[updatedId] = {
                    ...prevArtifact.substats[updatedId],
                    stat: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
            } else if (updatedName === 'substats.amount') {
                newArr[updatedId] = {
                    ...prevArtifact.substats[updatedId],
                    amount: updatedValue
                }
                updatedArtifact = {substats: [...newArr]}
            //If it's nut one of the arrays, nothing special needs to be done to it.
            } else {
                updatedArtifact = {
                    ...prevArtifact.substats,
                    [updatedName]: updatedValue
                }
            }
            
            return {
                ...prevArtifact,
                ...updatedArtifact
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        e.preventDefault()

        createArtifact(user, artifact)
            // if we're successful, navigate to the show page for the new artifact
            .then(res => { navigate(`/artifacts/${res.data.artifact._id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createArtifactSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createArtifactFailure,
                    variant: 'danger'
                })
            )
    }

    // the form the user fills out.
    return (
        <ArtifactForm 
            artifact={ artifact } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new artifact!"
        />
    )
}

export default CreateArtifact