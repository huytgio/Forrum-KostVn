import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
// import ActionButtons from './ActionButton'

const SingleCmt = ({ cmt: { _id, content, cmttype, user: { username } } }) => (
    <Card style={{ width: '18rem' }} border={
        cmttype === 'Feedback'
            ? 'success'
            : cmttype === 'Additional'
                ? 'warning'
                : 'danger'
    }>
        <Card.Body>
            <Card.Title>{username}</Card.Title>
            <Badge
                pill
                bg={
                    cmttype === 'Feedback'
                        ? 'success'
                        : cmttype === 'Additional'
                            ? 'warning'
                            : 'danger'
                }
            >

            </Badge>
            <Card.Text>
                {content}

            </Card.Text>
            {/* <ActionButtons url={url} _id={_id} /> */}
        </Card.Body>
    </Card>
)

export default SingleCmt
