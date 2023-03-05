import type { NextApiRequest, NextApiResponse } from 'next';
import { getIssueData, getRepositoriesOfIssue } from '../../../core/jira/issue';
import { Issue } from '../../../types/issue';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const jiraIssue = await getIssueData(id as string);
  const repositories = await getRepositoriesOfIssue(jiraIssue.id as number);

  const issue: Issue = {
    id: jiraIssue.id,
    title: jiraIssue.key,
    description: jiraIssue.fields.description,
    priority: jiraIssue.fields.priority.name,
    resolutionDate: jiraIssue.fields.resolutiondate,
    assignee: {
      name: jiraIssue.fields.assignee?.displayName,
      image: jiraIssue.fields.assignee?.avatarUrls["48x48"]
    }
  };

  issue.repositories = repositories;
  issue.summary = jiraIssue.fields.summary;
  issue.epic = {
    id: jiraIssue.fields.parent.id,
    title: jiraIssue.fields.parent.fields.summary
  };

  res.status(200).json(issue);
}