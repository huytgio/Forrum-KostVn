import { createContext, useReducer, useEffect } from "react"
import axios from 'axios'
import { authReducer } from "../Reducers/authReducer"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./Constant"
import setAuthToken from "../utils/setAuthToken"
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    const loadUser = async () => {
        // console.log('userloading')
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth/verify`)
            if (response.data.success) {
                // console.log(response)
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }
        } catch (error) {
            // console.log(error)
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
        console.log(localStorage[LOCAL_STORAGE_TOKEN_NAME] || 'not have token',)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const loadUserWrapper = () => loadUser();
        loadUserWrapper();
    }, []);
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data

        } catch (error) {
            if (error.response.data) {
                console.log('loi he thong')
                return error.response.data
            }
            else return { success: false, message: error.message }
        }
    }
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            console.log(response)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            await loadUser()
            return response.data

        } catch (error) {
            if (error.response.data) {
                console.log('loi he thong')
                return error.response.data
            }
            else return { success: false, message: error.message }
        }
    }


    const AuthContextData = { loginUser, registerUser, authState }

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider