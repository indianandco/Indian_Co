import "./Cards.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Cards = ({ title, price, /* offer_price */ description, size, fragance, /* offer */ image, category }) => {

    return (
        <div>
            <Card className="mx-4 my-4" style={{ width: '30rem' }}>
                <NavLink to="/contact">
                    <Card.Img variant="top" src="frascos.jpeg" image={image} />
                </NavLink>
                <Card.Header className="pb-1"><Card.Title className="d-flex justify-content-center" >{title}</Card.Title></Card.Header>
                <Card.Body className="p-3 d-flex flex-column">
                    <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                    <Card.Text>{`${description}.`}</Card.Text>
                    <Card.Text>{`Fragancias:${fragance}.`}</Card.Text>
                    <Card.Text>{`Tamaño:${size}`}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush align-items-center">
                    <Button className="border-0 rounded-0" style={{ width: '100%' }} variant="outline-success" size="lg">Agregar al carrito</Button>
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