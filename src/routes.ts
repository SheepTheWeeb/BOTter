const JiraWebhookHandler = require('./handlers/JiraWebhookHandler');

export default (router: any, client: any) => {
  router.post(`/jira/${process.env.JIRA_SECRET}`, (req: any, res: any) => {
    JiraWebhookHandler.handle(req, res, client);
  });

  router.get('/test', (req: any, res: any) => {
    res.send('hij doet het');
  });

  return router;
};
