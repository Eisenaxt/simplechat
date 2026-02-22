# SimpleChat

Eine einfache CLI-Chat-Anwendung, die demonstriert, wie ein KI-Chat-Client im Kern funktioniert.

## Funktionsweise

- Verbindet sich mit einem lokalen LLM-Server (z.B. Jan) auf Port 1337
- Nutzt die OpenAI-kompatible API
- Hält Chatverlauf im Speicher für Kontext

## Voraussetzungen

- Bun
- Lokaler LLM-Server (z.B. Jan oder ollama)

## Nutzung

```bash
bun run chat.js
```

## Hinweis

Dies ist eine pure JavaScript-Implementierung ohne externe Abhängigkeiten.
