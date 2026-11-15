# Mimoza AI: shërbimi i modelit (Cloudflare Worker), pa kosto

1. dash.cloudflare.com > Workers & Pages > Create > Create Worker, emri `mimoza-ai`, Deploy.
2. Edit code: fshi gjithçka, ngjit `worker.js`, Deploy.
3. Settings > Bindings > Add > **Workers AI**, emri i variablës `AI`. Ruaje.
4. Kopjo adresën e Worker-it (https://mimoza-ai.EMRI.workers.dev) dhe vendose te `CONFIG.endpoint` në `mimoza-ai.js`.

Pa çelës dhe pa kredit: Workers AI ka kufi ditor falas te Cloudflare. Pas kufirit, widget-i kalon vetë te përgjigjet me butona dhe skuadra.

Opsionale (me pagesë, cilësi më e lartë në shqip): në vend të binding-ut vendos Secret `ANTHROPIC_API_KEY`; Worker-i e përdor atë vetëm kur binding-u `AI` nuk është vendosur.
