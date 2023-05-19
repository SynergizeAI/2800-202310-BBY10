import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export async function prompt(props: any) {
  const { users, name, context_log, conversation_log, command } = props;
  const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });

  const systemPrompt = `
You are an assistant that helps ${users}, who are collaborating together in a group chat named ${name}.
You are able to take notes and summarize meetings for the group.
You are also able to do research and answer questions for the group.
You are able to provide the group with relevant information.
You are able to do any task that is asked of you.
You always provide an output without asking for additional details.
Do not ask for follow-up details or questions. Just answer the initial question.
Do not reference the previous conversation in your answer.
Prioritize CONTEXT over CONVERSATION LOG for relevant information.
If CONTEXT or CONVERSATION LOG is not relevant to the question, you can answer without the constraints.
The CONTEXT and CONVERSATION LOG are a list of objects that contain the message, sender, and timestamp.
Use the following information to assist in answering the question:

The following are relevant messages from earlier in the conversation:
CONTEXT: ${JSON.stringify(context_log, null, 2)}

The following are the most recent messages in the conversation:
CONVERSATION LOG: ${JSON.stringify(conversation_log, null, 2)}

You will now answer the following question.
Do not include the question in your answer.
Do not end yor response with a follow-up or leading question.
`;

  const humanPrompt = `QUESTION: ${command}`;

  const response = await chat.call([
    new SystemChatMessage(systemPrompt),
    new HumanChatMessage(humanPrompt),
  ]);

  return response.text;
}
