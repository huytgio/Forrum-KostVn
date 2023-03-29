import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { CmtContext } from "../../contexts/CommentContext"

const AddCmtModal = () => {
    // Contexts
    const {
        postState: { post },
        showAddCmtModal, setShowAddCmtModal,
        setShowToast
    } = useContext(PostContext)

    const { cmtState: { cmts }, getCmtByPost, addCmt } = useContext(CmtContext)


    const [newCmt, setNewCmt] = useState({
        content: '',
        cmttype: '',

    })
    const { content, cmttype } = newCmt
    const onAddNewCmtForm = event => setNewCmt({ ...newCmt, [event.target.name]: event.target.value })

    const resetAddCmtData = () => {
        setNewCmt({
            content: '',
            cmttype: ''
        })
        setShowAddCmtModal(false)
    }
    const closeDialog = () => {
        resetAddCmtData()
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { message, success } = await addCmt(post._id, newCmt)
        // setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
        resetAddCmtData()
    }





    return (
        <Modal show={showAddCmtModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Cập Nhật</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Mô tả'
                            name='content'
                            value={content}
                            onChange={onAddNewCmtForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as='select'
                            value={cmttype}
                            name='cmttype'
                            onChange={onAddNewCmtForm}
                        >
                            <option value="Feedback"> Phản Hồi</option>
                            <option value="Additional">Góp Ý</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Đóng
                    </Button>
                    <Button variant='primary' type='submit'>
                        Thêm Ý Kiến
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddCmtModal
