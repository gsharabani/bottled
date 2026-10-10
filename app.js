// ---------- State ----------
const state = {
  qty: {},          // productId -> number
  wineTotal: 0,
  wineRed: 0,
  wineWhite: 0,
  pickup: "",
};

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const ICON_MINUS = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M5 12h14"></path></svg>`;
const ICON_PLUS = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>`;
const ICON_DOT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5 fill-primary"><circle cx="12" cy="12" r="10"></circle></svg>`;

const INPUT_CLASS = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";
const BTN_ON = "border-neutral-900 bg-neutral-900 text-white";
const BTN_OFF = "border-neutral-300 bg-white hover:border-neutral-500";

function toast(message, type) {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  $("#toaster").appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ---------- Render ----------
function renderNav() {
  $("#nav").innerHTML = NAV.map(
    (n) => `<button type="button" data-scroll="${n.id}" class="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900">${n.label}</button>`
  ).join("");
}

function renderWine() {
  const t = state.wineTotal;
  $("#wine").innerHTML = `
    <h2 class="mb-2 text-lg font-medium text-neutral-800">יין — קלאסיקו דנה</h2>
    <p class="mb-5 text-sm text-neutral-500">מבחר משובח שנבחר בפינצטה | 40₪–50₪ לבקבוק</p>
    <div class="mb-5 overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <img src="assets/wine-dana-BgkePLO9.png" alt="קלאסיקו דנה" class="h-48 w-full object-contain p-4 sm:h-64" loading="lazy" />
    </div>
    <div class="rounded-xl border border-neutral-200 bg-white p-6">
      <label class="font-medium mb-3 block text-sm">בחירה לפי ארגזים</label>
      <div class="mb-5 flex flex-wrap gap-2">
        ${WINE_BOX_OPTIONS.map((o) => `<button type="button" data-wine="${o.bottles}" class="h-9 rounded-md border px-3 text-sm transition ${t === o.bottles ? BTN_ON : BTN_OFF}">${o.label}</button>`).join("")}
      </div>
      <label class="font-medium mb-3 block text-sm">או בחירה לפי כמות בקבוקים</label>
      <div class="flex flex-wrap gap-2">
        ${WINE_BOTTLE_OPTIONS.map((n) => `<button type="button" data-wine="${n}" class="h-9 w-12 rounded-md border text-sm transition ${t === n ? BTN_ON : BTN_OFF}">${n}</button>`).join("")}
        ${t > 0 ? `<button type="button" data-wine="0" class="h-9 rounded-md px-3 text-sm text-neutral-500 hover:text-neutral-900">נקה</button>` : ""}
      </div>
      ${t > 0 ? `
        <div class="mt-6 grid grid-cols-2 gap-4">
          <div>
            <label class="font-medium mb-2 block text-sm" for="wine-red">אדום (מלבק)</label>
            <input id="wine-red" type="number" min="0" max="${t}" value="${state.wineRed}" class="${INPUT_CLASS}" />
          </div>
          <div>
            <label class="font-medium mb-2 block text-sm" for="wine-white">לבן</label>
            <input id="wine-white" type="number" min="0" max="${t}" value="${state.wineWhite}" class="${INPUT_CLASS}" />
          </div>
          <p id="wine-sum" class="col-span-2 text-xs text-neutral-500">סך הכל צריך להסתכם ב-${t} בקבוקים (כרגע: ${state.wineRed + state.wineWhite})</p>
        </div>` : ""}
    </div>`;
}

function productCard(p) {
  const n = state.qty[p.id] || 0;
  return `
    <div class="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-neutral-300">
      <div class="flex aspect-square items-center justify-center bg-neutral-50 p-3 sm:p-4">
        <img src="${p.image}" alt="${esc(p.name)}" class="h-full w-full object-contain" loading="lazy" />
      </div>
      <div class="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div class="flex-1"><h3 class="text-sm font-medium leading-snug">${esc(p.name)}</h3></div>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1 rounded-md border border-neutral-200">
            <button type="button" data-qty="${p.id}" data-delta="-1" class="grid h-9 w-9 place-items-center text-neutral-600 hover:bg-neutral-50 disabled:opacity-30" aria-label="הפחת" ${n === 0 ? "disabled" : ""}>${ICON_MINUS}</button>
            <span class="w-8 text-center text-sm tabular-nums">${n}</span>
            <button type="button" data-qty="${p.id}" data-delta="1" class="grid h-9 w-9 place-items-center text-neutral-600 hover:bg-neutral-50" aria-label="הוסף">${ICON_PLUS}</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderCategories() {
  $("#categories").innerHTML = CATEGORIES.map((c) => `
    <section id="${c.id}" class="scroll-mt-[240px]">
      <h2 class="mb-5 text-lg font-medium text-neutral-800">${c.title}</h2>
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">${c.products.map(productCard).join("")}</div>
    </section>`).join("");
}

function renderPickup() {
  $("#pickup").innerHTML = PICKUP_POINTS.map((p) => {
    const on = state.pickup === p.id;
    return `
      <label for="pickup-${p.id}" class="flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${on ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}">
        <button type="button" role="radio" aria-checked="${on}" data-pickup="${p.id}" id="pickup-${p.id}" class="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring">${on ? `<span class="flex items-center justify-center">${ICON_DOT}</span>` : ""}</button>
        <span>${p.label}</span>
      </label>`;
  }).join("");
}

// ---------- Order ----------
function orderItems() {
  const items = [];
  for (const c of CATEGORIES)
    for (const p of c.products) {
      const q = state.qty[p.id] || 0;
      if (q > 0) items.push({ name: p.name, qty: q });
    }
  if (state.wineTotal > 0)
    items.push({
      name: `יין קלאסיקו דנה — ${state.wineTotal} בקבוקים (אדום: ${state.wineRed}, לבן: ${state.wineWhite})`,
      qty: 1,
    });
  return items;
}

function updateSummary() {
  const n = orderItems().length;
  $("#summary").textContent = n === 0 ? "לא נבחרו פריטים" : `${n} פריטים בהזמנה`;
}

function submitOrder(e) {
  e.preventDefault();
  const name = $("#name").value;
  const phone = $("#phone").value;
  const notes = $("#notes").value;
  const items = orderItems();

  if (!name || !phone) return toast("נא למלא שם וטלפון", "error");
  if (!state.pickup) return toast("נא לבחור נקודת חלוקה", "error");
  if (items.length === 0) return toast("לא נבחרו פריטים", "error");
  if (state.wineTotal > 0 && state.wineRed + state.wineWhite !== state.wineTotal)
    return toast("סך האדום והלבן ביין חייב להיות שווה למספר הבקבוקים", "error");

  const pickupLabel = PICKUP_POINTS.find((p) => p.id === state.pickup)?.label ?? state.pickup;
  const lines = ["*הזמנה חדשה* 🍷", "", `*שם:* ${name}`, `*טלפון:* ${phone}`, `*נקודת חלוקה:* ${pickupLabel}`, "", "*פריטים:*"];
  for (const it of items) lines.push(`• ${it.name} × ${it.qty}`);
  if (notes.trim()) lines.push("", `*בקשות מיוחדות:* ${notes.trim()}`);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank");
  showHandoff(url);
}

// Shown after the WhatsApp chat is opened. The order is only sent once the
// customer presses Send in WhatsApp, and the link covers blocked pop-ups.
function showHandoff(url) {
  $("#handoff-link").href = url;
  $("#handoff").hidden = false;
}

// ---------- Events ----------
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close-handoff]") || e.target.id === "handoff") {
    $("#handoff").hidden = true;
    return;
  }

  const scroll = e.target.closest("[data-scroll]");
  if (scroll) return document.getElementById(scroll.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const wine = e.target.closest("[data-wine]");
  if (wine) {
    state.wineTotal = Number(wine.dataset.wine);
    state.wineRed = 0;
    state.wineWhite = 0;
    renderWine();
    return updateSummary();
  }

  const qty = e.target.closest("[data-qty]");
  if (qty) {
    const id = qty.dataset.qty;
    state.qty[id] = Math.max(0, (state.qty[id] || 0) + Number(qty.dataset.delta));
    renderCategories();
    return updateSummary();
  }

  const pickup = e.target.closest("[data-pickup]");
  if (pickup) {
    state.pickup = pickup.dataset.pickup;
    renderPickup();
  }
});

document.addEventListener("input", (e) => {
  if (e.target.id !== "wine-red" && e.target.id !== "wine-white") return;
  const v = Math.max(0, Number(e.target.value) || 0);
  if (e.target.id === "wine-red") state.wineRed = v;
  else state.wineWhite = v;
  $("#wine-sum").textContent = `סך הכל צריך להסתכם ב-${state.wineTotal} בקבוקים (כרגע: ${state.wineRed + state.wineWhite})`;
  updateSummary();
});

$("#order-form").addEventListener("submit", submitOrder);

renderNav();
renderWine();
renderCategories();
renderPickup();
