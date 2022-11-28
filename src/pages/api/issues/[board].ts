import type { NextApiRequest, NextApiResponse } from 'next';

import { getReadyForDeployIssues } from '../../../core/jira/issue';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { board } = req.query;
  const { sprint, status } = req.body;

  const issues = await getReadyForDeployIssues(board, sprint, status);

  res.status(200).json(issues);
}