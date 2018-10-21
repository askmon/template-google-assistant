import { ssml } from '~/ssml';

export const recipeNextIntent: DialogFlowIntent = {
  name: 'receita - proximo',
    handler: (conv) => {
    // tslint:disable-next-line:no-string-literal
    conv.data['recipeIndex'] = conv.data['recipeIndex'] ? conv.data['recipeIndex']:0;
    // tslint:disable-next-line:no-string-literal
    if (conv.data['recipeIndex'] < conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>${conv.data['recipes'][conv.data['recipeIndex']]}<break time="500ms"/></speak>
        `,
      );
    } else if (conv.data['recipeIndex'] == conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>E finalmente <break time="1000ms"/> ${conv.data['recipes'][conv.data['recipeIndex']]}<break time="500ms"/>
               Gostaria de ouvir novamente o preparo ou gostaria de seguir para os ingredientes?<break time="500ms"/></speak>
        `,
      );
    } else {
      conv.ask(
        ssml`
        <speak>"Oxi, tivemos algum problema aqui!"<break time="500ms"/></speak>
        `,
      );
    }
    conv.data['recipeIndex'] = conv.data['recipeIndex'] + 1;
  },
};
