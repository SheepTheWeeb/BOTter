# BOTter
This is a Discord bot for Otter's server. It contains some random commands like "!rood" to punish people for their bad jokes. It also keeps track of a leaderboard of who made the most bad jokes/puns.

## Requirements
- Latest version of [Node and npm](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

## Recommended
- [Visual Studio Code](https://code.visualstudio.com/)

## Setup
1. Clone the project.
- Open your command prompt (cmd).
- Navigate to the place where you would like to clone the project.
```
cd to/a/directory/that/you/like/
```
- Clone the project.
```
git clone git@github.com:SheepTheWeeb/BOTter.git
```

2. Create an environment variables file.
- Go to the root folder of the BOTter project.
- Create a file called '.env'.
- Put in the following variables and replace it with your own credentials:
```
DISCORD_TOKEN=<YOUR_DISCORD_TOKEN>
PREFIX=!
DB_HOST=<YOUR_HOSTNAME>
DB_DATABASE=<YOUR_DATABASE_NAME>
DB_USERNAME=<YOUR_USERNAME>
DB_PASSWORD=<YOUR_PASSWORD>
```
- Save the file.

3. Install the dependencies.
- Open your command prompt (cmd).
- Navigate to the root of the BOTter project.
- Install the dependencies.
```
npm install
```

## Running the project
- Go to the root of the BOTter project with the terminal or command prompt.
- Run the following command:
```
npm run start
```
### Useful pm2 commands
[PM2](https://pm2.keymetrics.io/) is a manager for node applications.
- Starting BOTter.
```
pm2 start npm --name "BOTter" -- start
```
- Stopping BOTter.
```
pm2 stop BOTter
```
- Removing BOTter from PM2 listing.
```
pm2 delete BOTter
```
- Show running applications.
```
pm2 list
```
- Opening terminal BOTter.
```
pm2 logs BOTter
```

## Help
When using the bot, use '!help' to get a listing of all the available commands.

## Technologies
The technologies used for the bot are:
- Programming language : JavaScript
- Dependency Manager : Node Package Manager (NPM)
- Database : MySQL

## Dependencies
Most important dependencies:
- [Discord js](https://discord.js.org/#/)
- [Sequelize](https://sequelize.org/)

## Design patterns
- Factory Pattern

## Version control
- [Github](https://github.com/)
- [Sourcetree](https://www.sourcetreeapp.com/)

## Credits
- **Developer**: Sheep
- **SQL guy**: Rick
- **Advisor**: Saber
- **Mental support**: Otter
- **Pog**: Sheep's oom