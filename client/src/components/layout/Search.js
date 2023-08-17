import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/esm/Container"
import { useContext, useState } from "react"
import { PostContext } from "../../contexts/PostContext"
import { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import Toast from 'react-bootstrap/Toast'
import AlertMessage from '../layout/AlertMessage'
import React from 'react'


const Search = () => {
    const [alert, setAlert] = useState(null)
    const ref = useRef(null)
    const { postState: { posts },
        getPostsByKey, getPosts
    } = useContext(PostContext)



    const [KeyPost, setKeyPost] = useState({
        key: ''
    })
    const { keygeted } = KeyPost
    const onSearchChange = event => setKeyPost({ ...keygeted, [event.target.name]: [event.target.value] })
    const onSubmit = async event => {
        event.preventDefault()
        if (!ref.current.value) {
            setAlert({ type: 'danger', message: 'Ô tìm kiếm không được trống' })
            setTimeout(() => setAlert(null), 2000)
        } else {

            getPostsByKey(ref.current.value)
        }


    }
    const onClear = async event => {
        event.preventDefault()
        // getPosts()
        window.location.reload();

    }


    return (
        <>


            <Form className="d-flex" onSubmit={onSubmit} onReset={onClear} >
                <Form.Control
                    type="search"
                    placeholder="Tìm Kiếm"
                    className="me-2"
                    aria-label="Search"
                    name='key'
                    value={keygeted}
                    onChange={onSearchChange}
                    ref={ref}
                />
                <Button variant="success" type="submit" className="text-white" >Tìm Kiếm</Button>
                <Button variant="danger" type="reset" className="text-white" >Xóa Kết Quả Tìm Kiếm</Button>


            </Form>
            <AlertMessage info={alert} />
        </>

    )
}

export default Search