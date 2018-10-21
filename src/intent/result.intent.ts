import { SimpleResponse, Suggestions } from 'actions-on-google';
import { AllHtmlEntities } from 'html-entities';
import * as curry from 'lodash.curry';
import * as defaults from 'lodash.defaults';
import * as get from 'lodash.get';
import * as orderBy from 'lodash.orderby';
import * as rp from 'request-promise';
import * as striptags from 'striptags';
import { ssml } from '~/ssml';

export const resultIntent: DialogFlowIntent = {
  name: 'resultado',
  handler: async (conv) => {
    const slug = conv.data['resultados'].find((r) => r.title === conv.input.raw).name;
    console.log(slug);
    const results = await rp({
      uri: 'https://panelinha-api-server-prod.herokuapp.com/v1/receita/' + slug,
      json: true,
    });
    const ingredients = results.data.content.recipeSteps[0].ingredients.map((step) => {
      let i = results.data.ingredients.find(x => x.id === step.ingredientId);
      if(!i) {
        i = {
          title: ''
        }
      }
      let m = results.data.measures.find(x => x.id === step.measureId);
      if(!m || !m.title) {
        m = {
          title: ''
        }
      }
      return `${step.quantity} ${m.title} ${step.connector} ${i.title}`
    });
    conv.data['ingredientIndex'] = 0;
    conv.data['recipeIndex'] = 0;
    conv.data['ingredients'] = ingredients;
    const parseRecipeStep = () => {
      const entities = new AllHtmlEntities;
      const recipe = results.data.content.recipeSteps[0].body;
      let recipeClean = entities.decode(recipe);
      recipeClean = striptags(recipeClean);
      recipeClean = recipeClean.replace(/\n/g, '');
      let receitaParsed = recipeClean.split(".");
      let finalRecipeArray = [];
      receitaParsed.map(item => {
        let phrase = "<s>";
        phrase = phrase.concat(item);
        phrase = phrase.concat("</s>");
        finalRecipeArray.push(phrase);
      });
      conv.data['recipes'] = receitaParsed.filter((passo) => {
        if(isNaN(passo)) {
          return true;
        } else {
          return false;
        }
      });
    }
    parseRecipeStep();
    conv.data['recipeString'] = results.data.content.recipeSteps[0].body;
    conv.ask(
      ssml`
      <speak>${results.data.description}<break time="500ms"/></speak>
      `,
    );
    conv.ask(
      ssml`
      <speak><prosody rate="fast">
      <emphasis level="strong">Legal! Podemos começar?</emphasis><break time="0.6s"/>
      <emphasis level="strong"> Quer saber os ingredientes<break time="0.3s"/> ou vamos direto pro preparo?</emphasis>
      </prosody></speak>
      `,
    );
    conv.ask(new Suggestions(['ingredientes', 'preparo']));
  },
};
