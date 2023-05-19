// Logging:

// - Record each user message
// - Convert the text of the message to an embedding
// - Add relevant metadata to this message:
//     - Sender
//     - Timestamp
//     - Text
//     - ConversationId
// - Store to vectore db (logs)

import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function embedMessage(message: string) {
  const embeddings = new OpenAIEmbeddings();

  const res = await embeddings.embedQuery(message);

  return res;
}

// const name = currentUser.name;
// const text = message;
// const convoId = conversationId;
// const timestamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
