
import api from "../request"
import { SET_LOADING, SET_DATA, SET_GENRES, SET_FAVORITE } from "../constants/actions";

export const getAccount = async () => {
    try {
        const response = await api.account.detailAccount()
        localStorage.setItem('users', JSON.stringify(response))
    } catch (error) {
        
    }
}

export const getListFavorite = async () => {
    const response = await api.account.listFavorite()
    return response.results
}

export const addFavorite = async ({
    id,
    favorite = true
}) => {
    try {
        const response = await api.account.addFavorite({
            "media_type": "movie",
            "media_id": id,
            "favorite": favorite
        })
        return response
    } catch (error) {
        
    }
}

export const getGenresMovies = async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
        const response = await api.genres.genresMovies()
        dispatch({
            type: SET_GENRES,
            payload: response.genres
        })
    } catch (error) {
        console.log(error);
    }
}
export const getListApi = async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
        const response = await api.movieList.nowPlaying()
        const data = response.results
        dispatch({
            type: SET_DATA,
            payload: data,
        })
        getDataFavorite(dispatch)
    } catch (error) {
        console.log("error", error);
    }
}
export const getDataFavorite = async (dispatch) => {
    try {
        const dataFavorite = await getListFavorite()
        dataFavorite.reverse()
        localStorage.setItem("film_favorite", JSON.stringify(dataFavorite))
        dispatch({
            type: SET_FAVORITE,
            payload: dataFavorite,
        })
    } catch (error) {
        console.log(error);
    }
}


export const getMovieDetail = async (id) => {
    try {
        const listFavorite = await getListFavorite()
        const idFavorite = listFavorite.map(ids => ids.id)
        let response = await api.movieList.movieDetail(id)
        response['favorite'] = false
        if (idFavorite.includes(response.id)) {
            response['favorite'] = true
        }
        return {
            response,
            loading: false
        }
    } catch (error) {
            return { loading: false }
    }
}


export const searchMovies = async ({ dispatch, searchTerm }) => {
    if (!searchTerm) {
        getListApi(dispatch)
        return
    }
    try {
        dispatch({ type: SET_LOADING })
        const response = await api.movieList.searchMovie(searchTerm)
            dispatch({
                type: SET_DATA,
                payload: response.results,
            })
    } catch (error) {
        console.log(error);
    }
}

export const keywordMovies = async (searchTerm) => {
    try {
        const response = await api.movieList.keyword(searchTerm)
        return response.results
    } catch (error) {
        return []
        console.log(error);
    }
}