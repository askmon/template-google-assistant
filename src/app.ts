import { dialogflow } from 'actions-on-google';

import { ssml } from './ssml';

export function app() {
  const dialog = dialogflow({ debug: false });

  dialog.intent('example-intent', (conv, params, argument, status) => {
    const resp = ssml`
      <speak>This is an example.</speak>
    `;
    conv.ask(resp);
  });

  return dialog;
}
