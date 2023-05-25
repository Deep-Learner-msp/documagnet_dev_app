import { ChatOpenAI } from "langchain/chat_models/openai";
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { RetrievalQAChain } from 'langchain/chains';

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to give an answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {query}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new ChatOpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: "api-key",
    azureOpenAIApiInstanceName: "openai-ss",
    azureOpenAIApiDeploymentName: "ss-gpt-32k",
    azureOpenAIApiVersion: "2023-03-15-preview",
  });
  const chain = RetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      returnSourceDocuments: true,
    }
  );
  return chain;
};
