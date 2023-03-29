import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../contexts/PostContext'
import { CmtContext } from '../contexts/CommentContext'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/esm/Badge'
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import AlertMessage from '../components/layout/AlertMessage'
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SingleCmt from '../components/posts/SingleCmt'




const Detail = () => {
    const { postState: { post: { _id, status, title, pdesc, url, user: { username } }, posts }
    } = useContext(PostContext)
    const { cmtState: { cmts }, getCmtByPost } = useContext(CmtContext)

    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     const loadUserWrapper = () => getCmtByPost(_id);
    //     loadUserWrapper();
    // }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ShowCmt = async event => {
        event.preventDefault()
        getCmtByPost(_id)
        console.log(cmts, 'đã có')
        handleShow()
    }
    let card
    if (cmts.length === 0) {
        card = (
            <div> Không có Góp Ý </div>
        )
    } else {
        card = (
            <Card>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {cmts.map(cmt => (
                        <Col key={cmt._id} className='my-2'>
                            <SingleCmt cmt={cmt} />
                        </Col>
                    ))}
                </Row>
            </Card>
        )
    }
    let body
    body = (
        <>
            <Card>
                <Card.Header> tác giả: {username}</Card.Header>
                <Button variant="secondary" size='sm' onClick={ShowCmt}> Hiện Ý Kiến</Button>
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
                    {card}
                </Offcanvas.Body>
            </Offcanvas>
        </>



    )
    return (
        <>
            <AlertMessage info={alert} />
            <div>{body}</div>
        </>

    )
}

export default Detail