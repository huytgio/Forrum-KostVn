import Button from "react-bootstrap/esm/Button"
import playIcon from '../../assets/play-btn.png'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import cmtIcon from '../../assets/chat.svg'

import DirrectIcon from '../../assets/view.svg'
import React, { useContext } from 'react'
import { PostContext } from "../../contexts/PostContext"
import Col from "react-bootstrap/esm/Col"
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/esm/Container"

const ActionButtonAll = ({ url, _id }) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)
    const choosePost = postId => {
        findPost(postId)
        setShowUpdatePostModal(true)

    }
    return (
        <Container >
            <Row>
                <Button variant="outline-info" href={url} target='_blank' size="sm" >
                    <img src={playIcon} alt='play' width='32' height='32' />
                    Xem
                </Button>
            </Row>

            <Row>
                <Button variant="outline-success" href={url} size='sm'>
                    <img src={DirrectIcon} alt='play' width='32' height='32' />
                    truy cập
                </Button>
            </Row>

            <Row>
                <Button variant="outline-secondary" href={url} target='_blank'>
                    <img src={cmtIcon} alt='play' width='32' height='32' />
                    Ý Kiến
                </Button>
            </Row>


        </Container>
    )
}

export default ActionButtonAll
