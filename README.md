## Slackbot Recipes
----------------------------
### What is it?
Just a little something that will take input from a Slack command, and add it to a Google Sheet.

### How to use it?
- Connect to slack with correct config variables.
- Once connected - Use the [Slack slash command](https://api.slack.com/interactivity/slash-commands) `/recipe`, which will prompt the user for a **title**, **link** and **category**, and if valid the bot will then input those values into a Google spreadsheet that you setup within your configuration.
