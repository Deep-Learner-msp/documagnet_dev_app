import { ChatOpenAI } from "langchain/chat_models/openai";
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { RetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from "langchain/prompts";


const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to give an answer the question at the end.
Try to answer general questions as well. and if you get any source links makesure you give them as a clickable markdown links but only provide it for all State Street related questions, for the rest dont provide a markdown link like all generalised ones. and while providing the link please dont hallucinate, only provide factual links that you obtained from the answer.
{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new ChatOpenAI({
    temperature: 0,
    azureOpenAIApiKey: "",
    azureOpenAIApiInstanceName: "openai-ss",
    azureOpenAIApiDeploymentName: "ss-gpt-32k",
    azureOpenAIApiVersion: "2023-03-15-preview",
  });
  const chain = RetrievalQAChain.fromLLM(
    model,
    
    
    vectorstore.asRetriever(),

    {
      prompt: PromptTemplate.fromTemplate(QA_PROMPT),

    
      returnSourceDocuments: true,
    },
  );
  return chain;
};
