import TagsApi from '../services/tagsApi';

class TagForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    // this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.tagName.value ||
      !this._form.elements.tagColor.value
    ) {
      alert('Please enter all fields');
      return;
    }

    const tag = {
      tagName: this._form.elements.tagName.value.toLowerCase(),
      tagColor: this._form.elements.tagColor.value.toLowerCase(),
    };

    // Add tag to server
    const newTag = await TagsApi.createTag(tag);

    // Clear fields
    this._form.elements.tagName.value = '';
    this._form.elements.tagColor.value = '';

    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="tag-form">
    <div class="form-control">
      <label for="tag-tagName">Enter a name</label>
      <input type="text" name="tagName" id="tagName"/>
    </div>
    <div class="form-control">
      <label for="tag-tagColor">Select a color</label>
      <input type="text" name="tagColor" id="tagColor" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.querySelector('#tag-form');
    this.addEventListeners();
  }
}

export default TagForm;
