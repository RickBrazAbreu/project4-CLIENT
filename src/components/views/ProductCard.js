// useEffect(() => {        

//     let finalSizeArray = props.product.variants[0].options.map(option => {
//         let sizeInfo = {}

//         sizeInfo.key = option.name
//         sizeInfo.text = option.name
//         sizeInfo.value = option.id

//         return sizeInfo
//     })

//     setSizes(finalSizeArray)
// }, [])

// const [sizes, setSizes] = useState([])

// <Card>
//     <Card.Content>
//         <Card.Header>{props.product.name}</Card.Header>
//         <Card.Meta>{props.product.price.formatted_with_symbol}</Card.Meta>
//         <Card.Description>{props.product.description.replace(/(<([^>]+)>)/ig,"")}</Card.Description>
//         <Dropdown
//             className="sizes-drop"
//             onChange={handleSize}
//             value={sizes.text}
//             fluid
//             placeholder='Select Size'
//             selection
//             options={sizes}
//         />
//     </Card.Content>
// </Card>


// const [variantInfo, setVariantInfo] = useState()

// const handleSize = (e, {value}) => {
//     setVariantInfo({[props.product.variants[0].id]: value})
// }

// const handleButtonAddCart = e => {
//     e.preventDefault()
//     props.addToCart(props.product.id, variantInfo)
// }

// <Button fluid className='add-button' onClick={handleButtonAddCart}>
//     Add to Cart
//     <Icon name='arrow right' />
// </Button>