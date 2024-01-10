import axios from 'axios';
import { backendURL } from 'constants/backendURL';

export const backendApi = axios.create({
  baseURL: `${backendURL}/api`,
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null],
);

export const getNewsFetch = () => backendApi.get('/news?populate=*&sort=publishedAt');
export const increaseNewsViewsFetch = (id, views) =>
  backendApi.put(`/news/${id}`, {
    data: { views },
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getTeamFetch = () => backendApi.get('/people?populate=*');

export const getSurveysFetch = () => backendApi.get('/surveys?populate=*&sort=publishedAt');

export const getContactsFetch = () => backendApi.get('/contact');

export const getFirstBlockFetch = () => backendApi.get('/first-block-content?populate=*');
