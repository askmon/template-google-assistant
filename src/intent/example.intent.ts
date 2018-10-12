import { ssml } from '~/ssml';

export const exampleIntent: DialogFlowIntent = {
  name: 'example',
  handler: (conv) => {
    conv.ask(
      ssml`
        <speak>This is an example.</speak>
      `,
    );
  },
};
