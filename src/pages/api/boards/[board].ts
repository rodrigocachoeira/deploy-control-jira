import type { NextApiRequest, NextApiResponse } from 'next';

import { getReadyForDeployIssues } from '../../../core/jira/issue';
import { getActiveSprintOfBoard } from '../../../core/jira/sprint';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { board } = req.query;
  const { boardId, status } = req.body;
  
  const activeSprint = await getActiveSprintOfBoard(boardId);

  const issues = await getReadyForDeployIssues(String(board), activeSprint, status);

  res.status(200).json(issues);
}