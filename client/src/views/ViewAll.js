import { PostContext } from "../contexts/PostContext"
import { useContext, useEffect } from "react"
import Card from "react-bootstrap/Card"
import { AuthContext } from "../contexts/AuthContext"
import Button from "react-bootstrap/esm/Button"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SinglePostAll from "../components/posts/SinglePostAll"
import addIcon from '../assets/plus-circle-fill.svg'
import Overlay from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Search from "../components/layout/Search"
import AddCmtModal from "../components/posts/AddCmtModal"
import Toast from 'react-bootstrap/Toast'


const ViewAll = () => {
    const {
        authState: {
            user: { username }
        },
    } = useContext(AuthContext)
    const { postState: { posts }, showToast: { show, message, type }, setShowToast,
        getAllPosts,
        setShowAddPostModal
    } = useContext(PostContext)

    useEffect(() => {
        const loadUserWrapper = () => getAllPosts();
        loadUserWrapper();
    }, []);
    let body
    body = (
        <> <Card>
            <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                {posts.map(post => (
                    <Col key={post._id} className='my-2'>
                        <SinglePostAll post={post} />
                    </Col>
                ))}
            </Row>
        </Card>


        </>
    )
    return (
        <>   <Toast show={show} style={{ position: 'fixed', top: '20%', right: '10px' }} className={`bg-${type}`}
            onClose={setShowToast.bind(this, { show: false, message: '', type: null })}
            delay={2000} autohide>
            <Toast.Body>
                <strong>
                    {message}
                </strong>
            </Toast.Body>
        </Toast>
            <AddCmtModal />
            {body}
        </>
    )
}

export default ViewAll