// =====================================================================
// DrinkDrop settings — everything you may want to change lives in this file.
// Products, images, wine options, pickup points and the WhatsApp number.
// =====================================================================

const CATEGORIES = [
  {
    id: "whisky", title: "וויסקי",
    products: [
      { id: "jw-black", name: "ג'וני ווקר בלאק לייבל (ליטר)", image: "assets/jw-black-BAlRk7A8.avif" },
      { id: "jw-blue", name: "ג'וני ווקר בלו לייבל (ליטר)", image: "assets/jw-blue-DCqdeAKF.avif" },
      { id: "glen-12", name: "גלנפידיך 12 שנים", image: "assets/glenfiddich-12-lKwLdR4W.avif" },
      { id: "glen-15", name: "גלנפידיך 15 שנים", image: "assets/glenfiddich-15-BpeEbNSm.avif" },
      { id: "glen-18", name: "גלנפידיך 18 שנים", image: "assets/glenfiddich-18-Ba4snCEQ.avif" },
      { id: "hibiki", name: "וויסקי היביקי הרמוניה יפנית", image: "assets/hibiki-CUs3aBuJ.jpg" },
    ],
  },
  {
    id: "arak", title: "ערק / אוזו",
    products: [
      { id: "polamri", name: "פולאמרי (ליטר)", image: "assets/polamri-CPG7XfYk.jpg" },
      { id: "ouzo-mitilini", name: "אוזו אווה מיטיליני (כשר)", image: "assets/ouzo-mitilini-Dp5VRRRH.png" },
      { id: "ouzo-7", name: "אוזו 7", image: "assets/drink2-DZWfbSjp.avif" },
      { id: "ouzo-12", name: "אוזו 12", image: "assets/drink1-pKXJJe47.avif" },
    ],
  },
  {
    id: "rum", title: "רום",
    products: [{ id: "bacardi", name: "בקרדי", image: "assets/bacardi-BFpy4Oj0.avif" }],
  },
  {
    id: "sangria", title: "סנגריה / קאווה",
    products: [
      { id: "sangria-don-simon", name: "דון סימון סנגריה 1.5 ליטר", image: "assets/sangria-red-CYDWsN39.avif" },
      { id: "cava", name: "קאווה", image: "assets/drink1-pKXJJe47.avif" },
    ],
  },
];

const NAV = [
  { id: "wine", label: "יין" },
  { id: "whisky", label: "וויסקי" },
  { id: "arak", label: "ערק / אוזו" },
  { id: "rum", label: "רום" },
  { id: "sangria", label: "סנגריה" },
];

const WINE_BOTTLE_OPTIONS = [4, 6, 8, 10, 12];
const WINE_BOX_OPTIONS = [
  { bottles: 6, label: "ארגז אחד (6 בקבוקים)" },
  { bottles: 12, label: "שני ארגזים (12 בקבוקים)" },
  { bottles: 18, label: "שלושה ארגזים (18 בקבוקים)" },
];

// Orders are sent to this WhatsApp number (international format, digits only, no "+")
const WHATSAPP_NUMBER = "972543131973";

const PICKUP_POINTS = [
  { id: "lachish", label: "משלוח לבית הלקוח (רק בלכיש)" },
  { id: "dana-sela", label: "דנה סלע" },
];
