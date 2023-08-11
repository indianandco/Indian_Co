import "./Cards.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../services/CartContext";


// eslint-disable-next-line react/prop-types
const Cards = ({ product }) => {

    // eslint-disable-next-line react/prop-types
    const { id, image, title, category, description, fragance, size, price } = product
    const { addProduct, noStock } = useContext(CartContext);

    const sendProduct = () => {
        addProduct(product)
    }
    console.log(noStock);
    return (
        <div className='containerCards'>
            <Card className="mx-4 my-4" style={{ width: '30rem' }}>
                <NavLink to={`/detail/${id}`} >
                    <Card.Img className="imageCards" variant="top" src={image} image={image} />
                </NavLink>
                <Card.Header className="pb-1"><Card.Title className="d-flex justify-content-center" >{title}</Card.Title></Card.Header>
                <Card.Body className="p-3 d-flex flex-column">
                    <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                    <Card.Text>{`${description}.`}</Card.Text>
                    <Card.Text>{`Fragancias:${fragance}.`}</Card.Text>
                    <Card.Text>{`Tamaño:${size}`}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush align-items-center">
                    <Button onClick={sendProduct} disabled={noStock} className="border-0 rounded-0 addToCart" style={{ width: '100%' }} variant="outline-success" size="lg">Agregar al carrito</Button>
                </ListGroup>
                <ListGroup horizontal className="d-flex align-items-center justify-content-between list-group-flush">
                    <ListGroup.Item variant="dark" className="px-2">Precio</ListGroup.Item>
                    <ListGroup.Item className=" border-0 rounded-0 px-2">{/* {offer ? price : offer_price} */}${price}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Cards;