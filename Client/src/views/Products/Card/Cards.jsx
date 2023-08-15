/* eslint-disable react/prop-types */
import "./Cards.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../../services/CartContext";

const Cards = ({ product }) => {
    const { id, image, title, price } = product;
    const { addProduct } = useContext(CartContext);
    // eslint-disable-next-line no-unused-vars
    const [noStock, setNoStock] = useState();

    const sendProduct = () => {
        addProduct(product);
    };

    return (
        <div className='containerCards'>
            <Card className="mx-4 my-4 customCard">
                <NavLink to={`/detail/${id}`} >
                    <Card.Img className="imageCards" variant="top" src={image} image={image} />
                </NavLink>
                <Card.Header className="pb-1"><Card.Title className="text-center pTitle" >{title}</Card.Title></Card.Header>
                <ListGroup className="list-group-flush align-items-center">
                    <Button onClick={sendProduct} disabled={noStock} className="border-0 rounded-0 addToCart" style={{ width: '100%' }} variant="outline-success" size="lg">Agregar al carrito</Button>
                </ListGroup>
                <ListGroup horizontal className="d-flex align-items-center justify-content-between list-group-flush">
                    <ListGroup.Item variant="dark" className="px-2">Precio</ListGroup.Item>
                    <ListGroup.Item className=" border-0 rounded-0 px-2">${price}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Cards;
