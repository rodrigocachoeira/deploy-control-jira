import type { NextApiRequest, NextApiResponse } from 'next';

import { getIssueData, getLastDeployedTasks, getRepositoriesOfIssue } from '../../../../core/jira/issue';
import { getActiveSprintOfBoard } from '../../../../core/jira/sprint';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { board } = req.query;
  const { boardId } = req.body;
  
  const activeSprint = await getActiveSprintOfBoard(boardId);
  const lastDeploys = await getLastDeployedTasks(String(board), activeSprint);

  for(var i = 0; i < lastDeploys.length; i++) {
    const issueId = lastDeploys[i].id;

    const issueData = await getIssueData(issueId);
    const repositories = await getRepositoriesOfIssue(issueId);

    lastDeploys[i].repositories = repositories;
    lastDeploys[i].summary = issueData.fields.summary;
    lastDeploys[i].epic = {
      id: issueData.fields.parent.id,
      title: issueData.fields.parent.fields.summary
    };
  }

  res.status(200).json(lastDeploys);
}