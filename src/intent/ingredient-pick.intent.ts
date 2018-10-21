import * as stringSimilarity from 'string-similarity';
import { ssml } from '~/ssml';

export const ingredientPickIntent: DialogFlowIntent = {
  name: 'ingrediente - pick',
  handler: (conv) => {
    // tslint:disable-next-line:no-string-literal
    conv.data['ingredientIndex'] = conv.data['ingredientIndex'] ? conv.data['ingredientIndex'] : 0;
    const ingredient = stringSimilarity.findBestMatch(conv.parameters.quantidade, conv.data['ingredients']).bestMatch.target

    conv.ask(
      ssml`
      <speak>${ingredient}<break time="500ms"/></speak>
      `,
    );
  },
};
