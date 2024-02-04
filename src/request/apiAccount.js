import baseRequest from "../utils/request"

export default class apiAccount extends baseRequest {
    constructor() {
        super();
        this.url = 'account/20962664'
        this.urlListFavorite = '/favorite/movies?language=en-US&sort_by=created_at.asc'
        this.urlAddFavorite = '/favorite'
    }

    detailAccount = () => this.get(this.url)
    listFavorite = () => this.get(this.url + this.urlListFavorite)
    addFavorite = (body) => this.post(this.url + this.urlAddFavorite, body)
}