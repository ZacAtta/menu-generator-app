import IdeasApi from '../services/ideasApi';
import TagsApi from '../services/tagsApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this._tags = [];
    this.getIdeas();
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      await this.getTags();
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You can not delete this resource');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  async getTags() {
    try {
      const res = await TagsApi.getTags();
      this._tags = res.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  getTagColor(tag) {
    let tagItem = this._tags.find(item => item.tagName === tag);
    if (!tagItem) {
      return 'red';
    };
    return tagItem.tagColor
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagColor = this.getTagColor(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem('username')
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : '';
        return `
      <div class="card" data-id="${idea._id}">
     ${deleteBtn}
     <h3>
       ${idea.app}     
     </h3>
      <p>
        ${idea.text}
      </p>
      <img src="${idea.imageUrl}" alt="Your Image Description" class="image">
      <p style="background-color:  ${tagColor};" class='tag'>${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
      `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
 