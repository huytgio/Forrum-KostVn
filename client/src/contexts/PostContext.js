import { createContext, useReducer, useEffect, useState } from "react"
import axios from 'axios'
import { postReducer } from "../Reducers/postReducer"
import {
    ADD_POST,
    apiUrl,
    LOCAL_STORAGE_TOKEN_NAME,
    POSTS_LOADED_FAIL,
    POSTS_LOADED_SUCCESS
} from "./Constant"
import setAuthToken from "../utils/setAuthToken"
export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer,
        {
            posts: [],
            postsLoading: false,

        })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
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
    const PostContextData = {
        postState, getPosts, setShowAddPostModal, showAddPostModal,
        addPost, showToast, setShowToast
    }
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider
