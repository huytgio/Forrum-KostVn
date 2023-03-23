import { PostContext } from "../contexts/PostContext"
import { useContext, useEffect } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import Card from "react-bootstrap/Card"
import { AuthContext } from "../contexts/AuthContext"
import Button from "react-bootstrap/esm/Button"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SinglePost from "../components/posts/SinglePost"
import AddPostModal from "../components/posts/AddPostModal"
import addIcon from '../assets/plus-circle-fill.svg'
import Overlay from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'



const Dashboard = () => {
    const {
        authState: {
            user: { username }
        },
    } = useContext(AuthContext)
    const { postState: { posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast
    } = useContext(PostContext)

    useEffect(() => {
        const loadUserWrapper = () => getPosts();
        loadUserWrapper();
    }, []);
    let body = null

    if (postsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info'>
                    Loading...
                </Spinner>
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'> Chào Bạn mới: {username} </Card.Header>
                    <Card.Body>
                        <Card.Title>Bắt Đầu Chia Sẽ Hoặc Học tập Ngay</Card.Title>
                        <Card.Text>
                            Bắt Đầu Chia sẽ bài học của bạn hoặc cho người khác biết bạn cần học gì
                        </Card.Text>
                        <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}> Tiến Hành </Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else if (posts) {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
                <Overlay placement="left" overlay={<Tooltip> Chia sẻ thêm cho chúng tôi </Tooltip>}>
                    <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt='add' width='80' height='80' />
                    </Button>
                </Overlay>

            </>
        )
    }

    return (
        <>
            {body}
            <AddPostModal />
            <Toast show={show} style={{ position: 'fixed', top: '20%', right: '10px' }} className={`bg-${type}`}
                onClose={setShowToast.bind(this, { show: false, message: '', type: null })}
                delay={2000} autohide>
                <Toast.Body>
                    <strong>
                        {message}
                    </strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard