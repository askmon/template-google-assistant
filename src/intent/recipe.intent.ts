import { ssml } from '~/ssml';

export const recipeIntent: DialogFlowIntent = {
  name: 'receita',
    handler: (conv) => {
    // tslint:disable-next-line:no-string-literal
    conv.data['recipeIndex'] = conv.data['recipeIndex'] ? conv.data['recipeIndex']:0;
    // tslint:disable-next-line:no-string-literal
    conv.data["recipes"] = ['Coloque a água numa panela média e leve ao fogo alto.',
                            'Assim que ferver, junte o sal, o arroz e misture.',
                            'Abaixe o fogo e tampe parcialmente a panela.',
                            'Deixe cozinhar por cerca de 12 minutos, até o arroz absorver toda a água - para verificar, espete os grãos com um garfo até conseguir ver o fundo da panela.',
                            'Assim que o arroz estiver cozido, junte a manteiga e o leite.',
                            'Mexa por mais 5 minutos até o arroz ficar cremoso - não deixe o leite secar completamente; o arroz deve ficar bem úmido, como um risoto.'];
    if (conv.data['recipeIndex'] < conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>"${conv.data['recipes'][conv.data['recipeIndex']]}"<break time="500ms"/></speak>
        `,
      );
    } else if (conv.data['recipeIndex'] == conv.data['recipes'].length - 1) {
      conv.ask(
        ssml`
        <speak>"E finalmente <break time="1000ms"/> ${conv.data['recipes'][conv.data['recipeIndex']]}"<break time="500ms"/>
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
    conv.data['recipeIndex'] = conv.data['recipeIndex'] + 1;
  },
};
