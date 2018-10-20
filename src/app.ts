import { dialogflow } from 'actions-on-google';
import { buscaIntent, ingredientIntent, recipeIntent } from '~/intent';

export function app() {
  const dialog = dialogflow({ debug: false });

  dialog.intent(buscaIntent.name, buscaIntent.handler);
  dialog.intent(ingredientIntent.name, ingredientIntent.handler);
  dialog.intent(recipeIntent.name, recipeIntent.handler);

  return dialog;
}
