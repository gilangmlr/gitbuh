import axios from 'axios';

const API_URL = process.env.API_URL || 'https://api.github.com';

export const getIssues = async ({
  owner,
  repo,
  per_page = 10,
  page = 1,
} = {}) => {
  const res = await axios.get(`${API_URL}/repos/${owner}/${repo}/issues`, {
    params: {
      per_page,
      page,
    },
  });
  return res.data;
};

export const getIssue = async ({ owner, repo, id } = {}) => {
  const res = await axios.get(`${API_URL}/repos/${owner}/${repo}/issues/${id}`);
  return res.data;
};

export const searchIssues = async ({
  owner,
  repo,
  query,
  per_page = 10,
  page = 1,
} = {}) => {
  const res = await axios.get(`${API_URL}/search/issues`, {
    params: {
      q: `${query}+repo:${owner}/${repo}/node+type:issue+state:open`,
      per_page,
      page,
    },
  });
  return res.data;
};
