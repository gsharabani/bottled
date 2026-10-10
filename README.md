# DrinkDrop

A one-page drinks order form. The customer picks items, fills in name, phone and
pickup point, and the order opens as a ready-to-send WhatsApp message to the supplier.

There is no server and no database. The order exists only when the customer presses
**Send** in WhatsApp.

## Files
| File | What it is |
|---|---|
| `config.js` | **All the settings**: products, images, wine options, pickup points, WhatsApp number |
| `index.html` | Page structure |
| `app.js` | Behavior (cart, validation, WhatsApp message) |
| `styles.css`, `app.css` | Styling |
| `assets/` | Product images and the logo |

## Common changes (all in `config.js`)
- **WhatsApp number**: change `WHATSAPP_NUMBER` (international format, digits only, e.g. `972501234567`).
- **Add a product**: add a line to a category's `products` list and put the image in `assets/`.
- **Pickup points**: edit `PICKUP_POINTS`.
- **Wine price range**: edit `WINE_SUBTITLE`.

## Run locally
```bash
python3 -m http.server 5173
```
Open http://localhost:5173

## Publish
Push to GitHub and turn on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
