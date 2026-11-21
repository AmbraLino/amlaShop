import React , {useState, useEffect}from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import PropsCRUD from "./PropsCRUD";

const ReadAll=()=>{
    const[infos,setInfos]=useState([])
    useEffect(()=>{
        const dbInfos=async()=>{
            await axios.get("http://localhost:5000/api/items/readItems")
            .then((res)=>setInfos(res.data))
            .catch((err)=>console.log("Not read"+ err))
        }
        dbInfos();
    },[]);

    return(
        <Container>
            <Row>
                {infos.map((info)=>{
                   return(
                    <Col key={info._id}>
                        <PropsCRUD {...info} />
                    </Col>
                   )
                })}
            </Row>
        </Container>    
    );
    
};
export default ReadAll;





