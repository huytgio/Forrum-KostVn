export const cmtReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SHOW':
            return {
                ...state,
                cmts: payload,
            }

        case 'ADD':
            return {
                ...state,
                cmts: [...state.cmts, payload],
            }
        default:
            return state

    }
}