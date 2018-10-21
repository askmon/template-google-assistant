import { SimpleResponse, Suggestions } from 'actions-on-google';
import { ssml } from '~/ssml';

export const recipeIntent: DialogFlowIntent = {
  name: 'receita',
    handler: (conv) => {
    // tslint:disable-next-line:no-string-literal
    conv.data['recipeIndex'] = conv.data['recipeIndex'] ? conv.data['recipeIndex']:0;
    // tslint:disable-next-line:no-string-literal
    if (conv.data['recipeIndex'] < conv.data['recipes'].length - 1) {
      conv.ask(new SimpleResponse({speech: '<speak>hashtag como faz</speak>', text:'#comofaz'}));
    }
    if (conv.data['recipeIndex'] < conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>${conv.data['recipes'][conv.data['recipeIndex']]}<break time="500ms"/></speak>
        `,
      );
      conv.ask(new Suggestions(['próximo', 'repetir']));
    } else if (conv.data['recipeIndex'] === conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>
        <prosody rate="fast" pitch="1st">
            <emphasis level="strong">E finalmente </emphasis>
        </prosody><break time="1000ms"/> ${conv.data['recipes'][conv.data['recipeIndex']]}<break time="500ms"/>

        <prosody rate="fast" pitch="1st">
            <emphasis level="strong">Gostaria de ouvir novamente o preparo<break time="150ms"/> ou gostaria de seguir para os ingredientes?</emphasis><break time="500ms"/>
        </prosody>
            </speak>
        `,
      );
      const a = Math.round(Math.random())
      console.log(a);
      if (a === 0) {
        conv.ask(new SimpleResponse({speech: '<speak><audio src="https://instaud.io/_/2Ppi.mp3"/></speak>', text:'Olha que beleza!'}));
      } else {
        conv.ask(new SimpleResponse({speech: '<speak><audio src="https://instaud.io/_/2PpK.mp3"/></speak>', text:'Dá pra comer uma travessa disso!'}));
      }

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
