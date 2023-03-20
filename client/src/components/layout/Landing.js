import { Redirect } from 'react-router-dom'

const Landing = () => {
    return <Redirect to={{ pathname: '/login' }} />
}

export default Landing
