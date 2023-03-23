import Button from "react-bootstrap/esm/Button"
import playIcon from '../../assets/play-btn.png'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import cmtIcon from '../../assets/chat.svg'

import React, { useContext } from 'react'
import { PostContext } from "../../contexts/PostContext"

const ActionButton = ({ url, _id }) => {
    const { deletePost, findPost, setShowUpdatePostModal } = useContext(PostContext)
    const choosePost = postId => {
        findPost(postId)
        setShowUpdatePostModal(true)

    }
    return (
        <>
            <Button variant="outline-info" href={url} target='_blank' >
                <img src={playIcon} alt='play' width='32' height='32' />
                <br></br>
                Xem
            </Button>
            <Button variant="outline-success" onClick={choosePost.bind(this, _id)}>
                <img src={editIcon} alt='play' width='32' height='32' />
                <br></br>
                Sửa
            </Button>
            <Button variant="outline-danger" onClick={deletePost.bind(this, _id)}>
                <img src={deleteIcon} alt='play' width='32' height='32' />
                <br></br>
                Xóa
            </Button>
            <Button variant="outline-secondary" href={url} target='_blank'>
                <img src={cmtIcon} alt='play' width='32' height='32' />
                <br></br>
                Ý Kiến
            </Button>

        </>
    )
}

export default ActionButton
