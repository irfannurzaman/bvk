import { useEffect, useState, useContext } from 'react';
import {
    getAccount,
    getListApi,
    getGenresMovies
} from "./actions"

import AppContext from "../context/Context"


export default function useContent() {
    const { state, dispatch } = useContext(AppContext.Context);
    
    useEffect(() => {
        getGenresMovies(dispatch)
        getListApi(dispatch)
        getAccount()
    }, []);

    return { ...state };
}
