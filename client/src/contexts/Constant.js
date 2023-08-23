export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'https://he-thong-no-sql-rust.vercel.app/api'

export const apiUrl2 =
    process.env.NODE_ENV !== 'production'
        ? 'http://26.155.8.197:5000/api'
        : 'someUrl'
export const LOCAL_STORAGE_TOKEN_NAME = 'let-me-know'

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'
export const ADD_CMTS = 'ADD_CMTS'