import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtonsAll from './ActionButtonAll'
import Button from 'react-bootstrap/esm/Button'
const SinglePostAll = ({ post: { _id, status, title, pdesc, url, user: { username } } }) => (
    <Card style={{ width: '16rem' }} border={
        status === 'Complete'
            ? 'success'
            : status === 'In Work'
                ? 'warning'
                : 'danger'
    }>
        <Card.Text> <Badge pill className='xl'> {username} </Badge> </Card.Text>
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
            <ActionButtonsAll url={url} _id={_id} />
        </Card.Body>
    </Card>
)

export default SinglePostAll
