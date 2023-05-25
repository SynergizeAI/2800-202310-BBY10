import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { format } from "date-fns";

const PINECONE_API_KEY: string = process.env.PINECONE_API_KEY!;
const PINECONE_ENVIRONMENT: string = process.env.PINECONE_ENVIRONMENT!;
const PINECONE_INDEX: string = process.env.PINECONE_INDEX!;

export async function upsert(
  message: string,
  newMessageId: string,
  conversationId: string,
  sender: string | null
) {
  const embeddings = new OpenAIEmbeddings();
  const client = new PineconeClient();
  await client.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });

  const docs = [
    new Document({
      metadata: {
        sender: sender,
        timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        conversationId: conversationId,
        text: message,
      },
      pageContent: message,
    }),
  ];

  // const vector = await embeddings.embedQuery(message);

  const pineconeIndex = client.Index(PINECONE_INDEX);

  // const upsertRequest = {
  //   vectors: [
  //     {
  //       id: newMessageId,
  //       values: vector,
  //       metadata: {
  //         sender: sender,
  //         timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
  //         conversationId: conversationId,
  //         text: message,
  //       },
  //     },
  //   ],
  // };

  // await pineconeIndex
  //   .upsert({ upsertRequest })
  //   .then(() => console.log("Successfully upserted to Pinecone"));

  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex,
  }).then(() => console.log("Successfully upserted to Pinecone"));
}
