import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButton'

const SinglePost = ({ post: { _id, status, title, pdesc, url } }) => (
    <Card style={{ width: '18rem' }} border={
        status === 'Complete'
            ? 'success'
            : status === 'In Work'
                ? 'warning'
                : 'danger'
    }>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Badge
                pill
                bg={
                    status === 'Complete'
                        ? 'success'
                        : status === 'In Work'
                            ? 'warning'
                            : 'danger'
                }
            >
                {status}
            </Badge>
            <Card.Text>
                {pdesc}

            </Card.Text>
            <ActionButtons url={url} _id={_id} />
        </Card.Body>
    </Card>
)

export default SinglePost
