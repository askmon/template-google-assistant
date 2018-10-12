import { DialogflowIntentHandler, Parameters, Contexts, DialogflowConversation } from 'actions-on-google';

declare global {
  type DialogFlowHandler<
      TConvData = {},
      TUserStorage = {},
      TContexts extends Contexts = Contexts,
      TConversation extends DialogflowConversation<TConvData, TUserStorage, TContexts> = DialogflowConversation<TConvData, TUserStorage, TContexts>,
      TParameters extends Parameters = Parameters,
      Argument = Argument,
  > = DialogflowIntentHandler<TConvData, TUserStorage, TContexts, TConversation, TParameters, Argument> | string;

  interface DialogFlowIntent { name: string, handler: DialogFlowHandler }
}
