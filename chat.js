const API_URL = "http://127.0.0.1:1337/v1/chat/completions";
const MODEL = "janhq\\Jan-v3-4b-base-instruct-Q4_K_XL";

const messages = [];

async function ask(prompt) {
  messages.push({ role: "user", content: prompt });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: false,
    }),
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;
  messages.push({ role: "assistant", content: reply });
  return reply;
}

console.log("CLI Chat - Tippe 'exit' zum Beenden\n");

process.stdout.write("Du: ");
for await (const line of console) {
  const input = line.trim();
  
  if (!input || input.toLowerCase() === "exit") {
    console.log("Tschüss!");
    break;
  }

  const response = await ask(input);
  console.log(`Bot: ${response}\n`);
  process.stdout.write("Du: ");
}
