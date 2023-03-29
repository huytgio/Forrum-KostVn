import { createContext, useReducer } from "react"
import axios from 'axios'
import { cmtReducer } from "../Reducers/commentReducer"
import {

    apiUrl,
    POSTS_LOADED_FAIL,

} from "./Constant"
export const CmtContext = createContext()

const CmtContextProvider = ({ children }) => {

    const [cmtState, dispatch] = useReducer(cmtReducer,
        {
            cmts: []
        })

    const getCmtByPost = async postId => {
        try {
            const response = await axios.get(`${apiUrl}/comment/${postId}`)
            // console.log(response.data.cmts)
            if (response.data.success) {
                dispatch({ type: 'SHOW', payload: response.data.cmts })
                // console.log('test')
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
    const addCmt = async (postId, addedCmttoPost) => {
        try {
            const response = await axios.post(
                `${apiUrl}/comment/${postId}`, addedCmttoPost
            )
            if (response.data.success) {
                dispatch({ type: 'ADD', payload: response.data.cmt })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }


    const CmtContextData = {
        cmtState, getCmtByPost, addCmt
    }

    return (
        <CmtContext.Provider value={CmtContextData}>
            {children}
        </CmtContext.Provider>
    )
}
export default CmtContextProvider
