import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export async function prompt(props: any) {
  const { users, name, context_log, conversation_log, command } = props;
  const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });

  const systemPrompt = `
  Answer the question based on the context below. You should follow ALL the following rules when generating and answer:
  - There will be a CONVERSATION LOG, CONTEXT, and a QUESTION.
  - When there is no CONVERSATION LOG, the CONTEXT will be the entire conversation so far.
  - The final response must always be styled using markdown.
  - Your main goal is to assist the user based on the CONTEXT you are given.
  - Your secondary goal is to provide the user with a response that is relevant to the question.
  - Provide the user with a code example that is relevant to the question, if the context contains relevant code examples. Do not make up any code examples on your own.       
  - Take into account the entire conversation so far, marked as CONVERSATION LOG, but prioritize the CONTEXT.
  - Based on the CONTEXT, choose the source that is most relevant to the QUESTION.
  - Do not make up any answers if the CONTEXT does not have relevant information.
  - Use bullet points, lists, paragraphs and text styling to present the answer in markdown.
  - The CONTEXT is a set of JSON objects, each including the field "text" where the content is stored.
  - Do not mention the CONTEXT or the CONVERSATION LOG in the answer, but use them to generate the answer.
  - ALWAYS prefer the result with the highest "score" value.
  - The answer should only be based on the CONTEXT. Do not use any external sources. Do not generate the response based on the question without clear reference to the context.- Summarize the CONTEXT to make it easier to read, but don't omit any information.

CONTEXT: ${JSON.stringify(context_log, null, 2)}

CONVERSATION LOG: ${JSON.stringify(conversation_log, null, 2)}

Do not end yor response with a follow-up or leading question.
`;

  const humanPrompt = `QUESTION: ${command}`;

  const response = await chat.call([
    new SystemChatMessage(systemPrompt),
    new HumanChatMessage(humanPrompt),
  ]);

  return response.text;
}
