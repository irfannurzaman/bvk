import baseRequest from "../utils/request"

export default class apiGenres extends baseRequest {
    constructor() {
        super();
        this.url = 'genre/movie/list?language=en'
    }

    genresMovies = (body) => this.get(this.url)
}