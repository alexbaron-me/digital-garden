---
{"dg-publish":true,"permalink":"/harness/","tags":["atomic"],"dg-note-properties":{"tags":["atomic"],"up":"[[LLM|AI]]","created":"2026-04-01T15:39:02+02:00","modified":"2026-04-24T08:40:12+02:00"}}
---

> “The model contains the intelligence and the harness is the system that makes that intelligence useful” ~[[meta/readwise/LangChain Blog - The Anatomy of an Agent Harness\|LangChain Blog - The Anatomy of an Agent Harness]]

Sämtlicher Code, welcher gemeinsam mit einem [[LLM-Modell\|LLM-Modell]] einen [[Agent\|Agent]] bildet – gewissermaßen die Infrastruktur. Dabei kann es sich um “simple” Chat-Harnesses wie die typischen Web-UIs handeln, aber auch komplexe Software, welche viele Handlungsmöglichkeiten bietet. Die meisten Harnesses bauen im Mindesten eine Chat-Funktionalität ein, denn das Modell selber ist stateless.
In-House-Lösungen wie ChatGPT Codex oder Claude Code werden wohl auch beim Post-Training der Modelle berücksichtigt – hierdurch entsteht gerne ein starkes Overfitting auf existente Harnesses.

![Pasted image 20260401155727.png](/img/user/Pasted%20image%2020260401155727.png)
<small>LangChain Blog - The Anatomy of an Agent Harness</small>

Mögliche Aufgaben einer Harness beinhalten:
- Wissens-Management:
	- [[Context Injection\|Context Injection]] von Wissen, welches nach Trainings-Cutoff entstanden ist
	- System Prompt bereitstellen
	- Erinnerungs-System
- Interaktion mit Umgebung:
	- MCP-Server
	- Tools (File System, Web Request, …)
	- Skills
- Orchestration (Subagents etc.)
- Sandboxing

In der Praxis werden Harnesses oft mit Zugang zu einer (logischen) Bash-Shell umgesetzt, da die Modelle gut darin trainiert sind, Shell-Skripte zu schreiben.

##  Verweise
- [[ReAct Loop\|ReAct Loop]]
## Quellen
- [[meta/readwise/LangChain Blog - The Anatomy of an Agent Harness\|LangChain Blog - The Anatomy of an Agent Harness]]