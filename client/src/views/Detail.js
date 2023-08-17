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
import AddCmtModal from "../components/posts/AddCmtModal"




const Detail = () => {
    const { postState: { post: { _id, status, title, pdesc, url, user: { username } }, posts, },
        getPostId, showAddCmtModal, setShowAddCmtModal
    } = useContext(PostContext);
    const { cmtState: { cmts }, getCmtByPost } = useContext(CmtContext)

    // const [show, setShow] = useState(false);
    const choosePosttoCmt = _id => {
        getPostId(_id);
        setShowAddCmtModal(true);
        console.log(_id)
    };


    // useEffect(() => {
    //     const loadUserWrapper = () => getCmtByPost(_id);
    //     loadUserWrapper();
    // }, []);
    useEffect(() => {
        getCmtByPost(_id);
    }, []);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const ShowCmt = async event => {
    //     event.preventDefault()
    //     getCmtByPost(_id)
    //     console.log(cmts, 'đã có')
    //     handleShow()
    // }
    let card
    if (cmts.length === 0) {
        card = (
            <div> Không có Góp Ý </div>
        )
    } else {
        card = (
            <Card>
                <Row className='row-cols-1 row-cols-md-2 g-4 mx-auto mt-3'>
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
            <AddCmtModal />
            <Card>
                <Card.Header> tác giả: {username}</Card.Header>

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
                    <Card.Text>
                        {/* <Link to={url}> truy cập: "{url}" để biết thêm chi tiết </Link> */}
                        <Button href={url} variant='secondary'> {url} </Button>
                    </Card.Text>
                    <Card.Body className="text-center">
                        <Card.Title className="text-center mb-4">
                            <span className="text-primary font-weight-bold">Câu hỏi</span>
                        </Card.Title>
                        {card}
                        <Button variant="primary" size='sm' onClick={choosePosttoCmt.bind(this, _id)}>
                            Thêm Ý Kiến
                        </Button>
                    </Card.Body>

                </Card.Body>
                <Link to='/dashboard'>
                    <Button variant="primary" size='sm'>Trở về</Button>
                </Link>
            </Card>

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