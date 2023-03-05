import { get } from './request';

import moment from 'moment';
import { Issue } from '../../types/issue';

const RECENT_DEPLOYED_IN_HOURS = 70;

export async function getReadyForDeployIssues(board: string, sprint: Number, status: string) {
  const HOST = process.env.JIRA_HOST;
  const STATUS = status
    .replaceAll('"', "%22")
    .replaceAll(" ", "%20");

  const path = `${HOST}/rest/api/2/search/?jql=project%3D${board}%20AND%20status%20in%20(${STATUS})%20AND%20Sprint%20%3D%20${sprint}`;

  const data = await get(path);

  let issues: Issue[] = [];

  data.issues.forEach((issue: any) => {
    issues.push({
      id: issue.id,
      title: issue.key,
      description: issue.fields.description,
      priority: issue.fields.priority.name,
      resolutionDate: issue.fields.resolutiondate,
      assignee: {
        name: issue.fields.assignee?.displayName,
        image: issue.fields.assignee?.avatarUrls["48x48"]
      }
    });
  });

  return issues;
}

export async function getLastDeployedTasks(board: string, sprint: Number) {
  const deployedIssues = await getReadyForDeployIssues(board, sprint, 'Done');

  const deployedidTheLastThreeHours = deployedIssues.filter((issue: Issue) => {
    const date = issue.resolutionDate;
    const diffInHours = moment().diff(moment(date), 'hours');

    return diffInHours <= RECENT_DEPLOYED_IN_HOURS;
  })

  return deployedidTheLastThreeHours;
}

export async function getRepositoriesOfIssue(issueId: number) {
  const HOST = process.env.JIRA_HOST;

  const path = `${HOST}/rest/dev-status/1.0/issue/details?issueId=${issueId}&applicationType=github&dataType=pullrequest`;
  const data = await get(path);

  if (data.detail.length == 0) {
    return [];
  }

  const repositories = data.detail[2].repositories.map((repository: { name: string; }) => {
    return repository.name.replaceAll('atlastechnol/', '');
  });

  return repositories.filter((value: string, index: number, self: String[]) => {
    return self.indexOf(value) === index
  });
}

export async function getIssueData(issueId: number|string) {
  const HOST = process.env.JIRA_HOST;

  const path = `${HOST}/rest/api/2/issue/${issueId}`;
  const data = await get(path);

  return data;
}