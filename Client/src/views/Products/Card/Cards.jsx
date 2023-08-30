/* eslint-disable react/prop-types */
import "./Cards.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";

const Cards = ({ product }) => {
    const { _id, image, title, price, offer, offer_price } = product;

    return (
        <div className='containerCards'>
            <Card className="mx-4 my-4 customCard">
                <NavLink to={`/detail/${_id}`} >
                    <Card.Img className="imageCards" variant="top" src={image} image={image} />
                </NavLink>
                <Card.Header className="pb-1"><Card.Title className="text-center pTitle" >{title}</Card.Title></Card.Header>
                <ListGroup className="list-group-flush align-items-center">
                    <Button className="border-0 rounded-0 addToCart" style={{ width: '100%' }} variant="outline-success" size="lg"><NavLink to={`/detail/${_id}`} className="nav-link no-underline">Ver Producto</NavLink></Button>
                </ListGroup>
                <ListGroup horizontal className="d-flex align-items-center justify-content-between list-group-flush">
                    <ListGroup.Item variant="dark" className="px-2">Precio</ListGroup.Item>
                    <ListGroup.Item className=" border-0 rounded-0 px-2 py-0">
                        {offer ? (
                            <span><span style={{ textDecoration: 'line-through', color: '#CCCCCC' }}>${price}</span><span>{`  $${offer_price}`}</span></span>
                        ) : (
                            <span>{`$${price}`}</span>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Cards;
