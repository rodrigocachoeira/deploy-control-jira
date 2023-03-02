import { get } from './request';

export async function getActiveSprintOfBoard(boardId: number) {
  const HOST = process.env.JIRA_HOST;

  const path = `${HOST}/rest/agile/1.0/board/${boardId}/sprint?state=active&maxResults=1`;
  
  const data = await get(path);
  const sprint = data.values.pop();

  return sprint.id;
}