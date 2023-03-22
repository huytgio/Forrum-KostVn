export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'http://26.155.8.197:5000/api'

export const apiUrl2 =
    process.env.NODE_ENV !== 'production'
        ? 'http://26.155.8.197:5000/api'
        : 'someUrl'
export const LOCAL_STORAGE_TOKEN_NAME = 'let-me-know'