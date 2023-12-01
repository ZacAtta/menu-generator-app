import axios from 'axios';

class TagsApi {
  constructor() {
    this._apiUrl = '/api/tags';

    console.log(process.env.NODE_ENV);
  }

  getTags() {
    return axios.get(this._apiUrl);
  }

  createTag(data) {
    return axios.post(this._apiUrl, data);
  }

  updateTag(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteTag(id) {
    return axios.delete(`${this._apiUrl}/${id}`);
  }
}

export default new TagsApi();
