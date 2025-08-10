export async function getEmbedding(text: string): Promise<number[]> {
  // Use OpenAI embedding API
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-ada-002",
    }),
  });

  const data = await res.json();
  return data.data[0].embedding;
}
