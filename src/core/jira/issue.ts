import { get } from './request';

export async function getReadyForDeployIssues(board: string, sprint: Number, status: string) {
  const HOST = process.env.JIRA_HOST;
  const STATUS = status
    .replaceAll('"', "%22")
    .replaceAll(" ", "%20");

  const path = `${HOST}/rest/api/2/search/?jql=project%3D${board}%20AND%20status%20in%20(${STATUS})%20AND%20Sprint%20%3D%20${sprint}`;

  const data = await get(path);

  let issues = [];

  data.issues.forEach(issue => {
    issues.push({
      id: issue.id,
      title: issue.key,
      description: issue.fields.description,
      priority: issue.fields.priority.name,
      assignee: {
        name: issue.fields.assignee.displayName,
        image: issue.fields.assignee.avatarUrls["48x48"]
      }
    });
  });

  return issues;
}