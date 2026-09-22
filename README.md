# Andrea Lehmann Projektentwicklung – Website

Statische Website ohne Build-Schritt, ohne Framework, ohne externe Dienste.

```
index.html            Startseite (Onepager)
impressum.html        Impressum
datenschutz.html      Datenschutzerklärung
assets/css/style.css  Styles (Farben ganz oben unter :root)
assets/js/main.js     Menü, Slider, Scroll-Animation
assets/fonts/         Poppins, lokal (DSGVO-konform)
assets/img/           Bilder (WebP) + Social-Preview + Favicon
robots.txt, sitemap.xml
```

## Lokal ansehen

`index.html` einfach im Browser öffnen, oder mit lokalem Server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Veröffentlichen

Das Repo kann direkt deployed werden, z. B. über:

- **Netlify** oder **Cloudflare Pages**: Repo verbinden, Build-Command leer lassen, Publish-Verzeichnis `/`.
- **GitHub Pages**: Settings → Pages → Branch `main`, Ordner `/ (root)`.
- **Klassischer Webspace**: alle Dateien per FTP/SFTP ins Webroot hochladen.

Danach die eigene Domain (lehmann-andrea.de) beim Anbieter hinterlegen.

## Vor dem Livegang

- [ ] Gelb markierte Platzhalter in `impressum.html` und `datenschutz.html` ausfüllen
- [ ] Hosting-Anbieter in der Datenschutzerklärung eintragen
- [ ] Bildrechte prüfen (Stock-Lizenz, Visualisierungen) und Bildnachweis ergänzen
- [ ] Optional: eigene Akzentfarbe in `assets/css/style.css` (`--accent`)

## Bilder tauschen

Neue Bilder als WebP in `assets/img/` ablegen (max. ~1600 px Breite, < 300 KB) und in `index.html` den Dateinamen anpassen.
