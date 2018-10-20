import { dialogflow } from 'actions-on-google';
import { buscaIntent } from '~/intent';

export function app() {
  const dialog = dialogflow({ debug: false });

  dialog.intent(buscaIntent.name, buscaIntent.handler);

  return dialog;
}
