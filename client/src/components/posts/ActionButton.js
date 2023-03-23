import Button from "react-bootstrap/esm/Button"
import playIcon from '../../assets/play-btn.png'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import cmtIcon from '../../assets/chat.svg'

import React from 'react'

const ActionButton = ({ url, _id }) => {
    return (
        <>
            <Button variant="outline-info" href={url} target='_blank' >
                <img src={playIcon} alt='play' width='32' height='32' />
                <br></br>
                Xem
            </Button>
            <Button variant="outline-success" href={url} target='_blank'>
                <img src={editIcon} alt='play' width='32' height='32' />
                <br></br>
                Sửa
            </Button>
            <Button variant="outline-danger" href={url} target='_blank'>
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
