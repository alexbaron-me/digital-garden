---
{"dg-publish":true,"permalink":"/llm-performance-haengt-von-sprache-ab/","tags":["atomic"],"dg-note-properties":{"tags":["atomic"],"up":"[[LLM\|LLM]]","created":"2026-03-27T17:00:15+01:00","modified":"2026-04-24T08:40:16+02:00"}}
---

Die gesprochene Sprache, in der mit einer [[LLM]] interagiert wird, beeinflusst ihre Performance. Als Hauptgrund wird ein Unterschied in der Menge an [[Trainingsdaten\|Trainingsdaten]] vermutet. Beispielsweise führt das Nutzen von Deutsch (im Vergleich zu Englisch) zu Abweichungen von bis zu 25%[^1].

Was genau die Implikationen für Korrektheit & Qualität des Outputs sind, scheint noch unklar zu sein.
## Verweise
## Quellen
1.  [Language Ranker: A Metric for Quantifying LLM Performance Across High and Low-Resource Languages](https://arxiv.org/abs/2404.11553) 

> [!QUOTE] Ursprünglicher Capture
> Agent-Performance Deutsch vs. Englisch

[^1]: Gemessen wird hier das interne [[Embedding\|Embedding]] eines englischen Satzes im Vergleich zu seiner übersetzen Repräsentation.