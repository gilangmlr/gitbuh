import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { getIssues, searchIssues } from '../../../src/services/issues';
import { getRepository } from '../../../src/services/repositories';

const RepoPage = () => {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [totalIssues, setTotalIssues] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const PER_PAGE = 10;
  const totalPage = Math.floor(totalIssues / PER_PAGE);

  const { push, query } = useRouter();
  const { owner, repo } = query;

  const handleIssueClick = (issueId) => () => {
    push(`/${owner}/${repo}/issues/${issueId}`);
  };

  const handleSearchChange = async (event) => {
    const searchQuery = event.target?.value;
    if (!searchQuery) return;

    setCurrentPage(1);
    setSearchQuery(searchQuery);

    const { items, total_count } = await searchIssues({
      owner,
      repo,
      query: searchQuery,
      per_page: 10,
      page: 1,
    });
    setIssues(items);
    setTotalIssues(total_count);
  };

  const handlePaginationChange = async (event, page) => {
    setCurrentPage(page);
    const issues = await getIssues({ owner, repo, page: currentPage });
    setIssues(issues);
  };

  useEffect(() => {
    if (!owner || !repo) return;

    (async () => {
      const [repository, issues] = await Promise.all([
        getRepository({ owner, repo }),
        getIssues({ owner, repo, page: currentPage }),
      ]);
      setRepository(repository);
      setTotalIssues(repository.open_issues);
      setIssues(issues);
    })();
  }, [owner, repo]);

  return (
    <>
      <div>{repository.full_name}</div>
      <TextField
        placeholder="Search: open issues"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Grid container spacing={3}>
        {issues.map(({ title, number }, idx) => {
          return (
            <Grid key={idx} item xs={12} onClick={handleIssueClick(number)}>
              <Paper>{title}</Paper>
            </Grid>
          );
        })}
      </Grid>

      <Pagination
        count={totalPage}
        shape="rounded"
        page={currentPage}
        onChange={handlePaginationChange}
      />
    </>
  );
};

export default RepoPage;
