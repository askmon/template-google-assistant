import { ssml } from '~/ssml';

export const ingredientIntent: DialogFlowIntent = {
  name: 'ingrediente',
  handler: (conv) => {
    // tslint:disable-next-line:no-string-literal
    conv.data['ingredientIndex'] = conv.data['ingredientIndex'] ? conv.data['ingredientIndex'] : 0;
    conv.data['lastIngredient'] = conv.data['lastIngredient'] ? conv.data['lastIngredient'] : false;
    // tslint:disable-next-line:no-string-literal
    if (conv.data['ingredientIndex'] < conv.data['ingredients'].length - 1) {
      conv.ask(
        ssml`
        <speak>${conv.data['ingredients'][conv.data['ingredientIndex']]}<break time="500ms"/></speak>
        `,
      );
      conv.data['ingredientIndex'] = conv.data['ingredientIndex'] + 1;
    } else if (conv.data['ingredientIndex'] === conv.data['ingredients'].length - 1) {
      conv.ask(
        ssml`
        <speak>E por último ${conv.data['ingredients'][conv.data['ingredientIndex']]}<break time="500ms"/></speak>
        `,
      );
      conv.data['lastIngredient'] = true;
    } else {
      conv.ask(
        ssml`
        <speak>"Oxi, tivemos algum problema aqui!"<break time="500ms"/></speak>
        `,
      );
    }
  },
};
