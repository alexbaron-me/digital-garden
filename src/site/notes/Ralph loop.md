---
{"dg-publish":true,"permalink":"/ralph-loop/","tags":["atomic"],"dg-note-properties":{"tags":["atomic"],"up":"[[LLM]]"}}
---

[[Agentic AI\|Agentic AI]]-Methode, welche in Endlosschleife einen neuen Agenten spawnt. Dieser befolgt die aktuelle Aufgabe aus der `PROMPT.md`, und gibt anschließend dem Nachfolger einen neuen Prompt. Basiert auf [[Subagent\|Subagent]]s, um Arbeit auszulagern, ohne dass [[Context Window\|Context Window]] des Hauptagenten zugemüllt wird.

```bash
while :; do cat PROMPT.md | claude-code ; done
```
## Verweise
## Quellen
1. [[meta/readwise/Geoffrey Huntley - Ralph Wiggum as a Software Engineer\|Geoffrey Huntley - Ralph Wiggum as a Software Engineer]]
2. [[meta/readwise/anthropic.com - How We Built Our Multi-Agent Research System\|anthropic.com - How We Built Our Multi-Agent Research System]]

> [!QUOTE] Ursprünglicher Capture
> Ralph loop

