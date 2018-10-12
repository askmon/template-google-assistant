import { dialogflow } from 'actions-on-google';

import { exampleIntent } from '~/intent';

export function app() {
  const dialog = dialogflow({ debug: false });

  dialog.intent(exampleIntent.name, exampleIntent.handler);

  return dialog;
}
