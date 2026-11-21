import React from "react";
import {Card,  Button} from 'react-bootstrap'

const PropsCRUD = ({_id, name,description,photo}) =>{
    return (
    <Card >
      <Card.Img variant="top" src={"http://localhost:5000/images/"+photo} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" href={"/readOne/"+_id}>Read more</Button>
      </Card.Body>
    </Card>
    );
};


export default PropsCRUD;