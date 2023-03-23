export const postReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'POSTS_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload,
                postsloading: false
            }
        case 'POSTS_LOADED_FAIL':
            return {
                ...state,
                posts: [],
                postsloading: false
            }
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, payload],
                postsloading: false
            }

        default:
            return state

    }
}