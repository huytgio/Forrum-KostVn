import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../contexts/PostContext'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/esm/Badge'
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';




const Detail = () => {
    const { postState: { post: { _id, status, title, pdesc, url, user: { username } } }
    } = useContext(PostContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    console.log(_id)
    let body
    body = (
        <>
            <Card>
                <Card.Header> tác giả: {username}</Card.Header>
                <Button variant="secondary" size='sm' onClick={handleShow}>Góp Ý</Button>
                <Card.Body>
                    <Card.Title className="text-center">{title}</Card.Title>
                    <Badge className='text-center'
                        bg={
                            status === 'Complete'
                                ? 'success'
                                : status === 'In Work'
                                    ? 'warning'
                                    : 'danger'
                        }
                    >
                        {status}
                    </Badge>
                    <Card.Text>
                        {pdesc}
                    </Card.Text>
                </Card.Body>
                <Link to='/dashboard'>
                    <Button variant="primary" size='sm'>Trở về</Button>
                </Link>
            </Card>
            <Offcanvas show={show} onHide={handleClose} placement='bottom'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Góp Ý</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                </Offcanvas.Body>
            </Offcanvas>
        </>



    )
    return (
        <div>{body}</div>
    )
}

export default Detail