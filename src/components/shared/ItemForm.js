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
                <Form.Label htmlFor="item">Name of Item</Form.Label>
                <Form.Control
                    placeholder="What is your item?"
                    name="item"
                    id="item"
                    value={ item.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="brand">Brand</Form.Label>
                <Form.Control
                    placeholder="What kind of item is this?"
                    name="brand"
                    id="brand"
                    value={ item.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                    placeholder="What price is your item?"
                    type="number"
                    name="price"
                    id="price"
                    value={ item.price }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Is this item new?"
                    item="new"
                    defaultChecked={ item.new  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ItemForm