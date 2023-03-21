export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'unknowUrl'
export const LOCAL_STORAGE_TOKEN_NAME = 'let-me-know'