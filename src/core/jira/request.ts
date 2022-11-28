import axios from 'axios';

export async function get(path: string) {
  const token = new Buffer(process.env.JIRA_USERNAME + ':' + process.env.JIRA_TOKEN).toString('base64');

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + token
    }
  };

  const data = fetch(path, options).then(response => response.json());

  return data;
}