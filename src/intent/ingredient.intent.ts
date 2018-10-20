import { ssml } from '~/ssml';

export const ingredientIntent: DialogFlowIntent = {
  name: 'ingrediente',
  handler: (conv) => {
    // tslint:disable-next-line:no-string-literal

    conv.data['ingredientIndex'] = conv.data['ingredientIndex'] ? conv.data['ingredientIndex']:0;
    // tslint:disable-next-line:no-string-literal
    conv.data['ingredients'] = ['Uma xícara de chá de arroz',
                                'Duas xícaras de chá de água',
                                'Uma xícara de chá de leite',
                                'Uma colher de sopa de manteiga',
                                'Uma colher de chá de sal'];

    if (conv.data['ingredientIndex'] < conv.data['ingredients'].length - 1) {
      conv.ask(
        ssml`
        <speak>"${conv.data['ingredients'][conv.data['ingredientIndex']]}"<break time="500ms"/></speak>
        `,
      );
    } else if (conv.data['ingredientIndex'] == conv.data['ingredients'].length - 1) {
      conv.ask(
        ssml`
        <speak>"E por último ${conv.data['ingredients'][conv.data['ingredientIndex']]}"<break time="500ms"/>
               "Gostaria de ouvir novamente as receitas ou gostaria de seguir para os ingredientes?"<break time="500ms"/></speak>
        `,
      );
    } else {
      conv.ask(
        ssml`
        <speak>"Oxi, tivemos algum problema aqui!"<break time="500ms"/></speak>
        `,
      );
    }

    conv.data['ingredientIndex'] = conv.data['ingredientIndex'] + 1;


  },
};
