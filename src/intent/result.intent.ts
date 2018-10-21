import * as curry from 'lodash.curry';
import * as defaults from 'lodash.defaults';
import * as get from 'lodash.get';
import * as orderBy from 'lodash.orderby';
import * as rp from 'request-promise';
import { ssml } from '~/ssml';
import * as striptags from 'striptags'
import {AllHtmlEntities}  from 'html-entities'

export const resultIntent: DialogFlowIntent = {
  name: 'resultado',
  handler: async (conv) => {
    const results = await rp({
      uri: 'https://panelinha-api-server-prod.herokuapp.com/v1/receita/' + conv.input.raw,
      json: true,
    });
    const ingredients = results.data.content.recipeSteps[0].ingredients.map((step) => {
      let i = results.data.ingredients.find(x => x.id === step.ingredientId);
      if(!i) {
        i = {
          title: ''
        }
      }
      const m = results.data.measures.find(x => x.id === step.measureId)
      return `${step.quantity} ${m.title} ${step.connector} ${i.title}`
    });
    conv.data['ingredients'] = ingredients;
    const parseRecipeStep = () => {
      const entities = new AllHtmlEntities;
      const recipe = results.data.content.recipeSteps[0].body;
      console.log(recipe);
      let recipeClean = entities.decode(recipe);
      recipeClean = striptags(recipeClean);
      recipeClean = recipeClean.replace(/\n/g, '');
      console.log(recipeClean);
      let receitaParsed = recipeClean.split(".");
      console.log(receitaParsed);
      let finalRecipeArray = [];
      receitaParsed.map(item => {
        if(item.match(/^[0-9]*$/gm)) {

        }
      });
      conv.data['recipes'] = receitaParsed;
    }
    parseRecipeStep();
    conv.data['recipeString'] = results.data.content.recipeSteps[0].body;
    conv.ask(
      ssml`
      <speak>"${results.data.description}"<break time="500ms"/></speak>
      `,
    );
    conv.ask(
      ssml`
      <speak>"Seu bonitão, lindo, maravilhoso!"<break time="500ms"/></speak>
      `,
    );
    // // tslint:disable-next-line:no-string-literal
    // conv.data['ingredientIndex'] = conv.data['ingredientIndex'] ? conv.data['ingredientIndex'] : 0;
    // // tslint:disable-next-line:no-string-literal
    // conv.data['ingredients'] = ['Uma xícara de chá de arroz',
    //                             'Duas xícaras de chá de água',
    //                             'Uma xícara de chá de leite',
    //                             'Uma colher de sopa de manteiga',
    //                             'Uma colher de chá de sal'];

    // if (conv.data['ingredientIndex'] < conv.data['ingredients'].length - 1) {
    //   conv.ask(
    //     ssml`
    //     <speak>"${conv.data['ingredients'][conv.data['ingredientIndex']]}"<break time="500ms"/></speak>
    //     `,
    //   );
    //   conv.data['ingredientIndex'] = conv.data['ingredientIndex'] + 1;
    // } else if (conv.data['ingredientIndex'] === conv.data['ingredients'].length - 1) {
    //   conv.ask(
    //     ssml`
    //     <speak>"E por último ${conv.data['ingredients'][conv.data['ingredientIndex']]}"<break time="500ms"/></speak>
    //     `,
    //   );
    // } else {
    //   conv.ask(
    //     ssml`
    //     <speak>"Oxi, tivemos algum problema aqui!"<break time="500ms"/></speak>
    //     `,
    //   );
    // }
  },
};
