import Button from "react-bootstrap/esm/Button"
import playIcon from '../../assets/play-btn.png'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'


import React, { useContext } from 'react'
import { PostContext } from "../../contexts/PostContext"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"


const ActionButton = ({ url, _id }) => {
    const { deletePost, findPost, setShowUpdatePostModal, postState: { post } } = useContext(PostContext)
    const choosePost = postId => {
        findPost(postId)
        console.log(post)
        setShowUpdatePostModal(true)

    }
    return (
        <Container fluid>

            <Row>
                <Button variant="outline-info" href={url} target='_blank' size="sm" >
                    <img src={playIcon} alt='play' width='32' height='32' />
                    <br></br>
                    Xem
                </Button>
            </Row>
            <Row>
                <Button variant="outline-success" onClick={choosePost.bind(this, _id)} size="sm">
                    <img src={editIcon} alt='play' width='32' height='32' />
                    <br></br>
                    Sửa
                </Button>
            </Row>



            <Row>
                <Button variant="outline-danger" onClick={deletePost.bind(this, _id)} size="sm">
                    <img src={deleteIcon} alt='play' width='32' height='32' />
                    <br></br>
                    Xóa
                </Button>
                {/* <Col>
                    <Button variant="outline-secondary" href={url} target='_blank' size="sm">
                        <img src={cmtIcon} alt='play' width='32' height='32' />
                        <br></br>
                        Ý Kiến
                    </Button>
                </Col> */}

            </Row>
        </Container>
    )
}

export default ActionButton
