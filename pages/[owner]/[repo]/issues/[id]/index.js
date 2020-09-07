import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { getIssue } from '../../../../../src/services/issues';
import { Typography } from '@material-ui/core';

const IssueDetail = () => {
  const [issue, setIssue] = useState({});

  const { query } = useRouter();
  const { owner, repo, id } = query;

  useEffect(() => {
    if (!owner || !repo || !id) return;

    (async () => {
      const issue = await getIssue({ owner, repo, id });

      setIssue(issue);
    })();
  }, [owner, repo, id]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography>{issue.body}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default IssueDetail;
