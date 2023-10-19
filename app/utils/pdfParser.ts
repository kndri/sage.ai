import pdf from 'pdf-parse';

const pdfParser = {
  parse: async (filePath: string): Promise<string> => {
    const data = await pdf(Buffer.from(filePath));
    return data.text;
  }
};

export default pdfParser;