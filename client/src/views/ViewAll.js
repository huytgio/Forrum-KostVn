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


const ViewAll = () => {
    const {
        authState: {
            user: { username }
        },
    } = useContext(AuthContext)
    const { postState: { posts },
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
            <Overlay placement="left" overlay={<Tooltip> Chia sẻ thêm cho chúng tôi </Tooltip>}>
                <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                    <img src={addIcon} alt='add' width='80' height='80' />
                </Button>
            </Overlay>
        </Card>


        </>
    )
    return (
        <>
            {body}
        </>
    )
}

export default ViewAll