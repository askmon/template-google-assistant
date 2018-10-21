import { Carousel, CarouselOptionItem, SimpleResponse } from 'actions-on-google';
import * as rp from 'request-promise';
import { ssml } from '~/ssml';

export const buscaIntent: DialogFlowIntent = {
  name: 'busca',
  handler: async (conv) => {
    const results = await rp({
      uri: 'https://panelinha-api-server-prod.herokuapp.com/v1/search?pageType=receita&pageSize=10&title=' + conv.parameters.busca,
      json: true,
    });
    const array = results.data.results;
    const itemsArray = array.map((i) => {
      return {
        title: i.title,
        image: {
          url: i.imageUrl,
          accessibilityText: i.title,
        },
        name: i.slug,
      };
    });
    conv.data['resultados'] = itemsArray
    const items = {};
    itemsArray.forEach((item) => {
      items[item.name] = item;
    });
    if(itemsArray.length > 1) {
      const a = Math.round(Math.random())
      console.log(a);
      if (a === 0) {
        conv.ask(new SimpleResponse({speech: '<speak><audio src="https://instaud.io/_/2PcU.mp3"/></speak>', text:'Então vamos preparar os ingredientes?'}));
      } else {
        conv.ask(new SimpleResponse({speech: '<speak><audio src="https://instaud.io/_/2Pph.mp3"/></speak>', text:'Esse prato deixa todo mundo feliz, até o cozinheiro'}));
      }
      conv.ask(new Carousel({
        items,
      }));
    } else {
      conv.ask(ssml`
      <speak>Vigi, não tem nada com esse termo aqui. Procura outra coisa.<break time="500ms"/></speak>
      `);
    }
  },
};
