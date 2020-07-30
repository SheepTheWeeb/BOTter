const JiraWebhookHandler = require('./handlers/JiraWebhookHandler');

module.exports = (router, client) => {
  router.post('/jira/' + process.env.JIRA_SECRET, (req, res) =>
    JiraWebhookHandler.handle(req, res, client)
  ),
  router.get('/test', (req, res) => {
    res.send('hij doet het');
  })

  return router;
}