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

await Bun.write(Bun.stdout, "CLI Chat - Tippe 'exit' zum Beenden\n");

await Bun.write(Bun.stdout, "Du: ");
for await (const line of console) {
  const input = line.trim();
  
  if (!input || input.toLowerCase() === "exit") {
    await Bun.write(Bun.stdout, "Tschüss!");
    break;
  }

  await Bun.write(Bun.stdout, "Thinking...");
  const response = await ask(input);
  await Bun.write(Bun.stdout, `\x1b[2K\rBot: ${response}\n`);
  await Bun.write(Bun.stdout, "Du: ");
}
