import Button from "react-bootstrap/esm/Button"
import playIcon from '../../assets/play-btn.png'
import cmtIcon from '../../assets/chat.svg'

import DirrectIcon from '../../assets/view.svg'
import React, { useContext } from 'react'
import { PostContext } from "../../contexts/PostContext"
import Row from 'react-bootstrap/Row'
import Container from "react-bootstrap/esm/Container"
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom"
import AddCmtModal from "./AddCmtModal"


const ActionButtonAll = ({ url, _id }) => {
    const { findPost, setShowAddCmtModal, getPostId,
        postState: { post, cmts } } = useContext(PostContext)

    const choosePost = postId => {
        findPost(postId)
        return postId
    }
    const choosePosttoCmt = postId => {
        getPostId(postId)
        setShowAddCmtModal(true)
        // return postId
    }
    return (
        <Container >
            <Link to='/detail'>
                <Row>
                    <Button variant="outline-info" onClick={choosePost.bind(this, _id)} size="sm" >
                        <img src={playIcon} alt='play' width='32' height='32' />
                        Xem
                    </Button>
                </Row>
            </Link>


            <Row>
                <Button variant="outline-success" href={url} size='sm'>
                    <img src={DirrectIcon} alt='play' width='32' height='32' />
                    truy cập
                </Button>
            </Row>

            <Row>
                <Button variant="outline-secondary" onClick={choosePosttoCmt.bind(this, _id)} >
                    <img src={cmtIcon} alt='play' width='32' height='32' />
                    Ý Kiến
                </Button>
            </Row>


        </Container>
    )
}

export default ActionButtonAll
