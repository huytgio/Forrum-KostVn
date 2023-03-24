import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from '../../assets/large.png'
import LogoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import Search from './Search'
const NavBarMenu = () => {
    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)
    const logout = () => logoutUser()
    return (
        <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
            <Container>
                <Navbar.Brand href="/dashboard">
                    <img
                        src={Logo}
                        alt='Logo'
                        width='100'
                        height='80'
                        className='mr-2'
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" variant="tabs">
                        <Nav.Link
                            className='font-weight-bolder text-white'
                            to='/dashboard'
                            as={Link}

                        >
                            Trang Chủ
                        </Nav.Link>
                        <Nav.Link
                            className='font-weight-bolder text-white'
                            to='/about'
                            as={Link}
                        >
                            Thông Tin
                        </Nav.Link>

                        <Nav.Link
                            className='font-weight-bolder text-white'
                            to='/myassets'
                            as={Link}
                        >
                            Của Tôi
                        </Nav.Link>

                        <Nav className="me-auto">
                            <Search />
                        </Nav>


                    </Nav>
                    <Nav>
                        <Nav.Link className='font-weight-bolder text-dark' disabled>
                            Chào {username}!
                        </Nav.Link>
                        <Button
                            variant='secondary'
                            className='font-weight-bolder'
                            onClick={logout}
                        >
                            <img
                                src={LogoutIcon}
                                alt='logoutIcon'
                                width='32'
                                height='32'
                                className='mr-2'
                            />
                            Đăng xuất
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarMenu