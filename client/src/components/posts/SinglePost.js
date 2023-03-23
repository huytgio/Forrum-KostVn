import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButton'

const SinglePost = ({ post: { _id, status, title, pdesc, url } }) => (
    <Card
        className='shadow'
        border={
            status === 'Complete'
                ? 'success'
                : status === 'In Work'
                    ? 'warning'
                    : 'danger'
        }
    >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{title}</p>
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
                    </Col>
                    <Col className='text-right'>
                        <ActionButtons url={url} _id={_id} />
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text>{pdesc}</Card.Text>
        </Card.Body>
    </Card>
)

export default SinglePost
