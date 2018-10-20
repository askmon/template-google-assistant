import { ssml } from '~/ssml';

export const recipeIntent: DialogFlowIntent = {
  name: 'receita',
  handler: (conv) => {
    conv.data.recipeIndex = 0;
    conv.data.recipe = ["Coloque a água numa panela média e leve ao fogo alto.", "Assim que ferver, junte o sal, o arroz e misture.", "Abaixe o fogo e tampe parcialmente a panela.", "Deixe cozinhar por cerca de 12 minutos, até o arroz absorver toda a água - para verificar, espete os grãos com um garfo até conseguir ver o fundo da panela.", "Assim que o arroz estiver cozido, junte a manteiga e o leite.", "Mexa por mais 5 minutos até o arroz ficar cremoso - não deixe o leite secar completamente; o arroz deve ficar bem úmido, como um risoto."];
    conv.ask(
      ssml`
        <speak>"${conv.data.recipe[conv.data.recipeIndex]}"<break time="500ms"/></speak>
      `,
    );
  },
};
