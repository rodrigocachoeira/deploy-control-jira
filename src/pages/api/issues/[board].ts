import type { NextApiRequest, NextApiResponse } from 'next';

import { getReadyForDeployIssues } from '../../../core/jira/issue';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { board } = req.query;
  const { sprint, status } = req.body;

  const issues = await getReadyForDeployIssues(board as string, sprint, status);

  res.status(200).json(issues);
}