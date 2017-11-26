import { ApiAiClient } from "api-ai-javascript";

import { environment } from './../../environments/environment.prod';

export const DialogFlowClient = new ApiAiClient({ accessToken: environment.apiKeys.dialogFlow });