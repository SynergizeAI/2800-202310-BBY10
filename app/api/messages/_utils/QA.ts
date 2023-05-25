import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { RetrievalQAChain } from "langchain/chains";
import { loadQAStuffChain } from "langchain/chains";

const PINECONE_API_KEY: string = process.env.PINECONE_API_KEY!;
const PINECONE_ENVIRONMENT: string = process.env.PINECONE_ENVIRONMENT!;
const PINECONE_INDEX: string = process.env.PINECONE_INDEX!;

export async function QA(query: string, conversationId: string) {
  console.log("query", query);
  const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQAStuffChain(model);
  const client = new PineconeClient();
  await client.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index(PINECONE_INDEX);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  /* Search the vector DB independently with meta filters */
  const results = await vectorStore.similaritySearch(query, 5, {
    conversationId: conversationId,
  });

  console.log("results", results)

  const res = await chain.call({
    input_documents: results,
    question: query,
  });

  console.log("response", res.text);
  return res.text;
}
