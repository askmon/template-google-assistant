import { ssml } from '~/ssml';

export const ingredientIntent: DialogFlowIntent = {
  name: 'ingrediente',
  handler: (conv) => {
    conv.data.ingredientIndex = 0;
    conv.data.ingredients = ["Uma xícara de chá de arroz", "Duas xícaras de chá de água", "Uma xícara de chá de leite", "Uma colher de sopa de manteiga", "Uma colher de chá de sal"]
    conv.ask(
      ssml`
      <speak>"${conv.data.ingredients[conv.data.ingredientIndex]}"<break time="500ms"/></speak>
      `,
    );
  },
};
