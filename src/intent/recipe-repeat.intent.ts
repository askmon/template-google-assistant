import { Suggestions } from 'actions-on-google';
import { ssml } from '~/ssml';

export const recipeRepeatIntent: DialogFlowIntent = {
  name: 'receita - repeat',
    handler: (conv) => {
    // tslint:disable-next-line:no-string-literal
    conv.data['recipeIndex'] = conv.data['recipeIndex'] ? conv.data['recipeIndex']:0;
    // tslint:disable-next-line:no-string-literal
    conv.data['recipeIndex'] = conv.data['recipeIndex'] - 1;
    if (conv.data['recipeIndex'] < conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>${conv.data['recipes'][conv.data['recipeIndex']]}<break time="500ms"/></speak>
        `,
      );
      conv.ask(new Suggestions(['próximo', 'repetir']));
    } else if (conv.data['recipeIndex'] == conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>E finalmente <break time=1000ms"/> ${conv.data['recipes'][conv.data['recipeIndex']]}<break time="500ms"/>
               Gostaria de ouvir novamente as receitas ou gostaria de seguir para os ingredientes?<break time="500ms"/></speak>
        `,
      );
      conv.ask(new Suggestions(['sobremesa', 'doce', 'sorvete']));
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
