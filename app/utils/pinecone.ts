/**
 * This file contains utility functions for interacting with Pinecone to process and query book data.
 * 
 * Functions:
 * - processBook: Processes a book's text, converts it to embeddings, and upserts the data into Pinecone.
 * - getMatchesFromEmbeddings: Queries Pinecone with given embeddings to retrieve matching records.
 * 
 * Types:
 * - Metadata: Defines the structure of metadata associated with each book.
 */

import { Pinecone, type ScoredPineconeRecord } from "@pinecone-database/pinecone";
import pdfParser from "./pdfParser"; 
import { getEmbeddings } from "./embeddings";

export type Metadata = {
  url: string,
  text: string,
  chunk: string,
  hash: string
}

/**
 * Processes a book, extracts its text, converts text to embeddings, and upserts the embeddings into Pinecone.
 * @param {string} bookId - The identifier of the book to be processed.
 */
export const processBook = async (bookId: string): Promise<void> => {
  const bookText = await pdfParser.parse(`./books/${bookId}.pdf`);
  const embeddings = getEmbeddings(bookText); 

  const indexName: string = process.env.PINECONE_INDEX || '';
  if (indexName === '') {
    throw new Error('PINECONE_INDEX environment variable not set');
  }

  const pinecone = new Pinecone();
  const index = pinecone!.Index<Metadata>(indexName);
  
  // Upsert the book text embeddings into Pinecone
  await index.upsert({ item: { id: bookId, vector: embeddings, metadata: { text: bookText } } });
};

/**
 * Queries Pinecone with provided embeddings to retrieve matching records.
 * @param {number[]} embeddings - The embeddings to query.
 * @param {number} topK - The number of top matches to retrieve.
 * @param {string} namespace - The namespace within the Pinecone index to query.
 */
export const getMatchesFromEmbeddings = async (embeddings: number[], topK: number, namespace: string): Promise<ScoredPineconeRecord<Metadata>[]> => {
  const pinecone = new Pinecone();
  const indexName: string = process.env.PINECONE_INDEX || '';
  if (indexName === '') {
    throw new Error('PINECONE_INDEX environment variable not set')
  }
  const index = pinecone!.Index<Metadata>(indexName);
  const pineconeNamespace = index.namespace(namespace ?? '');

  try {
    const queryResult = await pineconeNamespace.query({
      vector: embeddings,
      topK,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (e) {
    console.log("Error querying embeddings: ", e)
    throw new Error(`Error querying embeddings: ${e}`)
  }
};
