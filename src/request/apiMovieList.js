import baseRequest from "../utils/request"

export default class apiMovieList extends baseRequest {
    constructor() {
        super();
        this.url = ''
        this.urlNowPlaying = 'movie/now_playing?language=en-US&page=1'
        this.urlMovieDetail = 'movie/'
        this.urlSearchMovie = 'search/movie?query='
    }

    nowPlaying = () => this.get(this.urlNowPlaying)
    movieDetail = (id) => this.get(this.urlMovieDetail + id)
    searchMovie = (name_movies) => this.get(this.urlSearchMovie + name_movies)
}