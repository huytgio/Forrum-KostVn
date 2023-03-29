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
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                postsloading: false
            }
        case 'UPDATE_POST':
            const newPosts = state.posts.map(post =>
                post._id === payload._id ? payload : post
            )

            return {
                ...state,
                posts: newPosts
            }
        case "FIND_POST":
            return { ...state, post: payload }

        case "CMT_LOADED_SUCCESS":
            return {
                ...state, cmts: payload
            }

        default:
            return state

    }
}