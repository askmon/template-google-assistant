# Google Assistant Template

This is a Google Assistant template for Node + Express.

Please, be sure to read some references to have a deeper understanding of what Google Assistant is and how you can use this project.

<br/>

# Local Environment

- Use the correct node version.
  - You can use `nvm use` (or `nvm install`) to automatically switch to the correct version
- Ensure your `npm` meets the minimum version required for this project (check `package.json` to know which version)

## Best Practices

- Install [EditorConfig plugin](https://editorconfig.org/#download) to maintain consistent coding style

## Code Editor

- We highly recommend using Visual Code to develop

### Known issues

- Debugging with `ts-node-dev` doesn't kill all process, you might have to stop the debugger more then once.

<br/>

# Google Assistant Environment

- Follow the instruction in this [page](https://codelabs.developers.google.com/codelabs/actions-1/#2) to create a new Actions on Google project.
- Configure [DialogFlow Webhook](https://dialogflow.com/docs/fulfillment/configure) - this template uses `/fulfillment` as default endpoint for webhook

## Tips

### Webhook + local development

- Webhooks need to be public available. In order to expose your local server, you can use [ngrok](https://ngrok.com/).

<br/>

# Development

## Setup

- Make a copy of `sample.env` and rename it to `.env`
- Configure all variables according to your needs
- Install all dependencies by running `npm i`

## Running

### Local server

- Simply run `npm start`
- Expose the server to public access
  - If you're using `ngrok`, simply run `ngrok http 3000` (or the PORT you've set in your `.env` file)

### DialogFlow

- Open the [Actions on Google Simulator](https://console.dialogflow.com/api-client/#/assistant_preview)
- Call your project's Invocation name (which is the display name that should be configured)


## Debugging

### Local server

- Use the VSCode's built-in debugger and launch the application using the `Debug` configuration


## Coding

This project uses [`actions-on-google-nodejs`](https://actions-on-google.github.io/actions-on-google-nodejs/) library.


<br/>

# References

- [Conversation design](https://developers.google.com/actions/design/) - A MUST read guidelines to build a good conversation for Google Assistant
- [How to build apps for Google Assistant with no programming experience](https://medium.freecodecamp.org/how-to-build-apps-for-google-assistant-with-no-programming-experience-42a490d63822) - Non-programmers tutorial
- [The Full-Stack Guide to Actions for Google Assistant](https://medium.com/google-developer-experts/the-full-stack-guide-to-actions-for-google-assistant-e1765edd075b) - Very nice article, does not have code examples but it gives a good overview
- [Hands-on with Dialogflow & Google Assistant: Writing your first Conversation Agent](https://rominirani.com/hands-on-with-api-ai-google-assistant-writing-your-first-conversation-agent-a6a7dcdaba27) - As the title implies, a hands-on of Google Assistant
- [Speech Synthesis Markup Language (SSML) Reference](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html) - SSML reference, this is used to build rich responses by controlling the emulated voice
  - [SSML Examples using Node.js and Cloud Functions for Firebase](https://github.com/actions-on-google/dialogflow-ssml-nodejs) - SSML Samples
- [System Entities](https://dialogflow.com/docs/reference/system-entities) - Built-in entities
