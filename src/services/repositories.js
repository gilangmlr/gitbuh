import axios from 'axios';

const API_URL = process.env.API_URL || 'https://api.github.com';

export const getRepository = async ({ owner, repo } = {}) => {
  const res = await axios.get(`${API_URL}/repos/${owner}/${repo}`);
  return res.data;
};
