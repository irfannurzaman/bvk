import { SET_LOADING, SET_DATA, SET_GENRES, SET_FAVORITE } from "../constants/actions"

export function reducer(state, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case SET_FAVORITE:
            return {
                ...state,
                favorite: action.payload,
            };
        case SET_GENRES:
            return {
                ...state,
                genres: action.payload,
                loading: false
            };
        default:
            return { ...state }
    }
}