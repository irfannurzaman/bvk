import ApiMovieList from "./apiMovieList";
import ApiGenres from "./apiGenres";
import ApiAccount from "./apiAccount";


const api = {
    movieList: new ApiMovieList(),
    genres: new ApiGenres(),
    account: new ApiAccount()
}

export default api