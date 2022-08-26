import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const ItemForm = (props) => {
    const { item, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="item">Item</Form.Label>
                <Form.Control
                    placeholder="What is your item's item?"
                    item="item"
                    id="item"
                    value={ item.item }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="type">Type</Form.Label>
                <Form.Control
                    placeholder="What kind of item is this?"
                    item="type"
                    id="type"
                    value={ item.type }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="age">Age</Form.Label>
                <Form.Control
                    placeholder="How old is your item?"
                    type="number"
                    item="price"
                    id="price"
                    value={ item.price }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is this item adoptable?"
                    item="adoptable"
                    defaultChecked={ item.adoptable  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ItemForm