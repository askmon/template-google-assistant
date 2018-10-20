import { Carousel, CarouselOptionItem, SimpleResponse } from 'actions-on-google';
import * as rp from 'request-promise';

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
    const items = {};
    itemsArray.forEach((item) => {
      items[item.name] = item;
    });
    console.info(items);
    // const item1: CarouselOptionItem = {
    //   title: 'Arroz de leite',
    //   description: 'BLVVLABLA',
    //   image: {
    //     url: 'https://panelinha-sitenovo.s3-sa-east-1.amazonaws.com/receita/1493746003533-_AY_9463.jpg',
    //     accessibilityText: 'arroz feio pra cara',
    //   },
    // };
    // const item2: CarouselOptionItem = {
    //   title: 'Arroz de leite bom',
    //   description: 'fmiefenfoewfn',
    //   image: {
    //     url: 'https://panelinha-sitenovo.s3-sa-east-1.amazonaws.com/receita/1493746003533-_AY_9463.jpg',
    //     accessibilityText: 'vai se deliciar',
    //   },
    // };
    // conv.data = { step: 1 };
    conv.ask(new SimpleResponse('Olha o que achei pra você meu lindinho:'));
    conv.ask(new Carousel({
      items,
    }));
  },
};
