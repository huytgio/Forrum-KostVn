import { createContext, useReducer, useEffect, useState } from "react"
import axios from 'axios'
import { postReducer } from "../Reducers/postReducer"
import {
    ADD_POST,
    apiUrl,
    DELETE_POST,
    UPDATE_POST, FIND_POST,
    POSTS_LOADED_FAIL,
    POSTS_LOADED_SUCCESS,
    ADD_CMTS
} from "./Constant"
export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer,
        {
            post: null,
            posts: [],
            postsLoading: false,
        })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    const [showAddCmtModal, setShowAddCmtModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })
    const [KeyPost, setKeyPost] = useState({
        key: ''
    })
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            // console.log(response.data)
            if (response.data.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAIL })
            if (error.response.data) {
                console.log('loi he thong')
                return error.response.data
            }
            else return { success: false, message: error.message }
        }
    }


    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts/getallpost`)
            // console.log(response.data)
            if (response.data.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAIL })
            if (error.response.data) {
                console.log('loi he thong')
                return error.response.data
            }
            else return { success: false, message: error.message }
        }
    }

    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: `Server has a critical damage` }
        }
    }

    const getPostsByKey = async Key => {
        try {
            const response = await axios.get(`${apiUrl}/posts/getbykey/${Key}`)
            console.log(response.data)
            if (response.data.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: `Server has a critical damage` }
        }
    }

    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success)
                dispatch({ type: DELETE_POST, payload: postId })
        } catch (error) {
            console.log(error)
        }
    }

    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })
    }

    const getPostId = postId => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })
        return postId
    }

    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost
            )
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }

    // const addCmttoPost = async (postId, addedCmttoPost) => {
    //     try {
    //         const response = await axios.post(
    //             `${apiUrl}/comment/${postId}`, addedCmttoPost
    //         )
    //         if (response.data.success) {
    //             dispatch({ type: ADD_POST, payload: response.data.post })
    //             return response.data
    //         }
    //     } catch (error) {
    //         return error.response.data
    //             ? error.response.data
    //             : { success: false, message: 'Server error' }
    //     }
    // }

    const PostContextData = {
        postState, getPosts, setShowAddPostModal, showAddPostModal,
        addPost, showToast, setShowToast,
        deletePost, updatePost, findPost,
        showUpdatePostModal, setShowUpdatePostModal,
        getAllPosts, getPostsByKey, setKeyPost, KeyPost,
        showAddCmtModal, setShowAddCmtModal,
        getPostId
    }

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider
