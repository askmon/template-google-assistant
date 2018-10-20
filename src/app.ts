import { dialogflow } from 'actions-on-google';
import { buscaIntent, ingredientIntent, recipeIntent, resultIntent } from '~/intent';

export function app() {
  const dialog = dialogflow({ debug: false });

  dialog.intent(buscaIntent.name, buscaIntent.handler);
  dialog.intent(ingredientIntent.name, ingredientIntent.handler);
  dialog.intent(recipeIntent.name, recipeIntent.handler);
  dialog.intent(resultIntent.name, resultIntent.handler);

  return dialog;
}
