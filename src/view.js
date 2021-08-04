import onChange from 'on-change';
import validate from './validate.js';

const rssForm = document.querySelector('.rss-form');
const submitButton = document.querySelector('button');
const feedbackDiv = document.querySelector('.feedback');
const input = document.querySelector('input');
const feedsDiv = document.querySelector('.feeds');
const postsDiv = document.querySelector('.posts');

const renderStateForm = (value, state) => {
  switch (value) {
    case 'filling':
      feedbackDiv.textContent = '';
      break;
    case 'failed':
      feedbackDiv.textContent = state.form.error;
      feedbackDiv.classList.add('text-danger');
      feedbackDiv.classList.remove('text-success');
      input.classList.add('is-invalid');
      break;
    case 'success':
      rssForm.reset();
      feedbackDiv.textContent = 'RSS loaded successfully';
      feedbackDiv.classList.remove('text-danger');
      feedbackDiv.classList.add('text-success');
      input.classList.remove('is-invalid');
      break;
    default:
      break;
  }
};

const renderPosts = (state) => {
  console.log('начало renderPosts');
  postsDiv.textContent = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = '<h2 class="card-title h4">Posts</h2>';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.posts.forEach((post) => {
    const { title, url } = post;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.textContent = title;
    li.append(a);
    ul.append(li);
  });

  card.append(cardBody);
  card.append(ul);
  postsDiv.append(card);
  console.log('конец renderPosts');
};

const renderFeeds = (state) => {
  console.log('начало renderFeeds');
  feedsDiv.textContent = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = '<h2 class="card-title h4">Feeds</h2>';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.feeds.forEach((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    li.innerHTML = `<h3 class="h6 m-0">${title}</h3><p class="m-0 small text-black-50">${description}</p>`;
    ul.append(li);
  })

  card.append(cardBody);
  card.append(ul);
  feedsDiv.append(card);
  console.log('конец renderFeeds');
  //renderPosts(state);
}

export default (state) => onChange(state, (path, value) => {
  console.log('что-то изменилось, а именно:', path, value);
  switch (path) {
    case 'form.state':
      renderStateForm(value, state);
      break;
    case 'feeds':
      renderFeeds(state);
      break;
    case 'posts':
      renderPosts(state);
      break;
    default:
      break;
  }
});
