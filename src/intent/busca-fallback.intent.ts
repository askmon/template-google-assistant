import { Carousel, CarouselOptionItem, SimpleResponse } from 'actions-on-google';
import * as rp from 'request-promise';
import { ssml } from '~/ssml';

export const buscaFallbackIntent: DialogFlowIntent = {
  name: 'busca fallback',
  handler: async (conv) => {
    console.log(conv);
    const results = await rp({
      uri: 'https://panelinha-api-server-prod.herokuapp.com/v1/search?pageType=receita&pageSize=10&title=' + conv.query,
      json: true,
    });
    const array = results.data.results;
    const itemsArray = array.map((i) => {
      return {
        title: i.slug,
        image: {
          url: i.imageUrl,
          accessibilityText: i.title,
        },
        name: i.slug,
      };
    });
    const items = {};
    itemsArray.forEach((item) => {
      items[item.name] = item;
    });
    if(itemsArray.length > 1) {
      conv.ask(new SimpleResponse({speech: '<speak><audio src="https://instaud.io/_/2PcU.mp3"/></speak>', text:'Olha o que achei pra você meu lindinho:'}));
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
