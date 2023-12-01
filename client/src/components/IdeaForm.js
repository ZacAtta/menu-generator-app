import TagsApi from '../services/tagsApi';
import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async getTags() {
    try {
      const res = await TagsApi.getTags();
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.app.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields");
      return;
    }

    // Save user to local storage
    localStorage.setItem("username", this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      app: this._form.elements.app.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields
    this._form.elements.text.value = "";
    this._form.elements.app.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  async render() {
    const tagList = await this.getTags();
    console.log(tagList);
    // Generate HTML for options
    const optionsHTML = tagList
      .map((tag) => {
        return `<option value="${tag.tagName}" class="tag" style="background-color: ${tag.tagColor};">${tag.tagName.toUpperCase()}</option>`;
      })
      .join(""); 
      console.log(optionsHTML);
    this._formModal.innerHTML = `
    <form id="idea-form">
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${
        localStorage.getItem("username") ? localStorage.getItem("username") : ""
      }" />
    </div>
    <div class="form-control">
      <label for="idea-app">Enter an Application</label>
      <input type="text" name="app" id="app" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Choose a tag</label>
      <select name="tag" id="tag">
      ${optionsHTML}
      </select>
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
