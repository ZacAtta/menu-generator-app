import IdeaForm from './IdeaForm';
import TagForm from './TagForm';
class Modal {
  constructor() {
    this._modal = document.querySelector('#modal');
    this._modalTagBtn = document.querySelector('#tag-modal-btn')
    this._modalBtn = document.querySelector('#modal-btn');
    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener('click', this.openIdeasForm.bind(this));
    this._modalTagBtn.addEventListener('click', this.openTagsForm.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
    document.addEventListener('closemodal', () => this.close());
  }

  openIdeasForm() {
    console.log('idea');
    const ideaForm = new IdeaForm();
    ideaForm.render();
    this._modal.style.display = 'block';
  }

  openTagsForm() {
    console.log('tag');
    const tagForm = new TagForm();
    tagForm.render();
    this._modal.style.display = 'block';
  }

  close() {
    this._modal.style.display = 'none';
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
