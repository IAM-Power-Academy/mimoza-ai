# Mimoza AI: shërbimi i modelit (Cloudflare Worker)

1. Hap dash.cloudflare.com > Workers & Pages > Create > Create Worker, emri `mimoza-ai`, kliko Deploy.
2. Kliko Edit code, fshi gjithçka, ngjit përmbajtjen e `worker.js`, kliko Deploy.
3. Settings > Variables and Secrets > Add > lloji **Secret**, emri `ANTHROPIC_API_KEY`, vlera është çelësi nga console.anthropic.com > API Keys. Ruaje.
4. Kopjo adresën e Worker-it (p.sh. https://mimoza-ai.EMRI.workers.dev) dhe vendose te `CONFIG.endpoint` në `mimoza-ai.js`.
5. Te console.anthropic.com vendos një kufi shpenzimi mujor (Limits), që asnjëherë të mos kalohet buxheti.

Modeli ndryshohet me variablën `MODEL` (p.sh. `claude-haiku-5-5` për kosto më të ulët).
