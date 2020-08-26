import JiraWebhookHandler from './handlers/JiraWebhookHandler';
import Discord from 'discord.js';
import { Router, Request, Response } from 'express';

export default (router: Router, client: Discord.Client) => {
  router.post(`/jira/${process.env.JIRA_SECRET}`, (req: Request, res: Response) => {
    JiraWebhookHandler.handle(req, res, client);
  });

  router.get('/test', (req: Request, res: Response) => {
    res.send('hij doet het');
  });

  return router;
};
