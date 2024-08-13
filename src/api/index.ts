import { ArticleCreation } from '../components/Article';

const baseURL = 'http://localhost:8888';
const articleRoute = '/articles';
const endpoint = baseURL + articleRoute;

export async function getArticles() {
  const response = await fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
  return response;
}

export async function createArticle(article: ArticleCreation) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })
    .then((res) => res.json())
    .then((data) => data);
  return response;
}
