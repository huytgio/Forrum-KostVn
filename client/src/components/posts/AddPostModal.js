import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'


const AddPostModal = () => {

    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext)
    const [newPost, setNewPost] = useState({
        title: '',
        pdesc: '',
        url: '',
        status: ''
    })
    const { title, pdesc, url, status } = newPost
    const onChangeNewPostForm = event => setNewPost({ ...newPost, [event.target.name]: event.target.value })
    const closeDialog = () => {
        setNewPost({
            title: '',
            pdesc: '',
            url: '',
            status: ''
        })
        setShowAddPostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await addPost(newPost)
        resetAddPostData()
        setShowAddPostModal(false)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }
    const resetAddPostData = () => {
        setNewPost({
            title: '',
            pdesc: '',
            url: '',
            status: ''
        })
    }
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Bạn muốn chia sẻ gì?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Tiêu Đề' name='title' required aria-describedby='title-help' value={title} onChange={onChangeNewPostForm} />
                        <Form.Text id='title-help' muted>Bắt Buộc</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control as='textarea' placeholder='Miêu Tả' row={3} name='pdesc' value={pdesc} onChange={onChangeNewPostForm} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Link có liên quan'
                            name='url'
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Select aria-label="Default select example" name='status' value={status} onChange={onChangeNewPostForm} >
                        <option value="In Work">Đang Nghiên Cứu</option>
                        <option value="Complete">Hoàn Thành Nghiên Cứu</option>
                        <option value="Will Do"> Sẽ Nghiên Cứu</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Đóng
                    </Button>
                    <Button variant='primary' type='submit'>
                        Chia Sẻ
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal