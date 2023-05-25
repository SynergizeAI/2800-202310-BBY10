import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import fetch from "node-fetch";
import { Blob } from "fetch-blob";

const PINECONE_API_KEY: string = process.env.PINECONE_API_KEY!;
const PINECONE_ENVIRONMENT: string = process.env.PINECONE_ENVIRONMENT!;
const PINECONE_INDEX: string = process.env.PINECONE_INDEX!;

export const run = async (pdfUrl: string, conversationId: string) => {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    const blob = await response.blob();

    const loader = new PDFLoader(blob as unknown as Blob);

    const rawDocs = await loader.load();
    rawDocs.forEach((doc) => {
      doc.metadata["conversationId"] = conversationId;
      // console.log("doc", doc);
    });

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log("split docs", docs);

    const embeddings = new OpenAIEmbeddings();
    const client = new PineconeClient();
    await client.init({
      apiKey: PINECONE_API_KEY,
      environment: PINECONE_ENVIRONMENT,
    });

    console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const index = client.Index(PINECONE_INDEX);

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: "text",
    });

    console.log("successfully ingested your data")
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
};
