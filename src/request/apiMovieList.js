import baseRequest from "../utils/request"

export default class apiMovieList extends baseRequest {
    constructor() {
        super();
        this.url = ''
        this.urlNowPlaying = 'movie/now_playing?language=en-US&page=1'
        this.urlMovieDetail = 'movie/'
        this.urlSearchMovie = 'search/movie?query='
        this.urlKeyword = 'search/keyword?query='
        this.urlPlayYoutube = 'movie/'
    }

    nowPlaying = () => this.get(this.urlNowPlaying)
    movieDetail = (id) => this.get(this.urlMovieDetail + id)
    searchMovie = (name_movies) => this.get(this.urlSearchMovie + name_movies)
    keyword = (keyword) => this.get(this.urlKeyword + keyword + '&page=1')
    playYoutube = (id) => this.get(this.urlPlayYoutube + id + '/videos?language=en-US=')

}