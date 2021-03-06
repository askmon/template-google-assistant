import { dialogflow } from 'actions-on-google';
import {
    buscaFallbackIntent, buscaIntent, ingredientIntent, ingredientNextIntent, ingredientPickIntent,
    recipeIntent, resultIntent,
} from '~/intent';
import { ingredientRepeatIntent } from '~/intent/ingredient-repeat.intent';
import { recipeRepeatIntent } from '~/intent/recipe-repeat.intent';

import { recipeNextIntent } from './intent/recipe-proximo.intent';

export function app() {
  const dialog = dialogflow({ debug: false });

  dialog.intent(buscaIntent.name, buscaIntent.handler);
  dialog.intent(buscaFallbackIntent.name, buscaFallbackIntent.handler);
  dialog.intent(ingredientIntent.name, ingredientIntent.handler);
  dialog.intent(ingredientNextIntent.name, ingredientIntent.handler);
  dialog.intent(recipeIntent.name, recipeIntent.handler);
  dialog.intent(resultIntent.name, resultIntent.handler);
  dialog.intent(ingredientRepeatIntent.name, ingredientRepeatIntent.handler);
  dialog.intent(ingredientPickIntent.name, ingredientPickIntent.handler);
  dialog.intent(recipeRepeatIntent.name, recipeRepeatIntent.handler);
  dialog.intent(recipeNextIntent.name, recipeIntent.handler);

  return dialog;
}
