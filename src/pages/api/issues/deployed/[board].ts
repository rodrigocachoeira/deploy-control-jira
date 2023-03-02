import type { NextApiRequest, NextApiResponse } from 'next';

import { getLastDeployedTasks, getRepositoriesOfIssue } from '../../../../core/jira/issue';
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
    const repositories = await getRepositoriesOfIssue(lastDeploys[i].id);

    lastDeploys[i].repositories = repositories;
  }

  res.status(200).json(lastDeploys);
}