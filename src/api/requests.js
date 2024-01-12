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
  backendApi.put(`/news/${id}?populate=*`, {
    data: { views },
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getTeamFetch = () => backendApi.get('/people?populate=*');

export const getSurveysFetch = () => backendApi.get('/surveys?populate=*&sort=publishedAt');
export const voteFetch = (surveyId, answerToVote, otherAnswers) =>
  backendApi.put(`/surveys/${surveyId}?populate=*`, {
    data: { answers: [...otherAnswers, { ...answerToVote, responses: Number(answerToVote.responses) + 1 }].sort((a, b) => a.id - b.id) },
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getContactsFetch = () => backendApi.get('/contact');

export const getFirstBlockFetch = () => backendApi.get('/first-block-content?populate=*');

// Telegram Bot
const chatIds = [904054855];
export const sendMessageToBot = (sendText) =>
  chatIds.forEach((chatId) => {
    axios.post('https://api.telegram.org/bot6969347180:AAEu0tOh5Etn9f8wu7RPvLOgjLwU0er54eo/sendMessage', {
      chat_id: chatId,
      text: sendText,
    });
  });
