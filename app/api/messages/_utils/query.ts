import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const PINECONE_API_KEY: string = process.env.PINECONE_API_KEY!;
const PINECONE_ENVIRONMENT: string = process.env.PINECONE_ENVIRONMENT!;
const PINECONE_INDEX: string = process.env.PINECONE_INDEX!;

export async function query(message: string, conversationId: string) {
  const embeddings = new OpenAIEmbeddings();
  const client = new PineconeClient();
  await client.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });

  const pineconeIndex = client.Index(PINECONE_INDEX);
  const queryMessage = await embeddings.embedQuery(message);

  const queryResponse = await pineconeIndex.query({
    queryRequest: {
      vector: queryMessage,
      topK: 15,
      includeMetadata: true,
      filter: {
        conversationId: conversationId,
      },
    },
  });

  // console.log("queryResponse", queryResponse)

  return queryResponse.matches;
}
