export const products = [
  // --- MACHINES ---
  {
    id: "obsidian-project",
    category: "machines",
    name: "The Obsidian Project",
    price: 99999,
    tagline: "Precision in the Shadows.",
    description: "A masterpiece of minimalist engineering. The Obsidian Project combines commercial-grade thermal stability with a sleek, matte finish that disappears into your modern kitchen until you need it.",
    colors: [
      { id: "black", name: "Matte Black", hex: "#1a1a1a", image: "/espresso_black.png" },
      { id: "white", name: "Glacial White", hex: "#f0f0f0", image: "/espresso_white.png" }
    ],
    gallery: ["/espresso_black.png", "/coffee_machine_hero.png"],
    features: ["Dual Stainless Steel Boilers", "Digital PID Temperature Control", "Volumetric Shot Control", "Cool Touch Steam Wand"],
    specs: {
      "Boiler Type": "Dual Boiler",
      "Pump Type": "Rotary Pump",
      "Water Tank": "2.5 Liters",
      "Power": "1800 Watts",
      "Heat Up Time": "3 Seconds (ThermoJet)",
      "Dimensions": "15w x 16d x 17h inches",
      "Warranty": "2 Years"
    }
  },
  {
      id: "classic-lusso",
      category: "machines",
      name: "Classic Lusso",
      price: 189999,
      tagline: "Timeless Italian Design",
      description: "A nod to the golden age of espresso. Mirror-finished chrome, manual lever control, and exposed groups make the Lusso a centerpiece for any connoisseur.",
      colors: [
           { id: "chrome", name: "Polished Chrome", hex: "#e0e0e0", image: "/espresso_chrome.png" },
      ],
      gallery: ["/espresso_chrome.png", "/machine_pro.png"],
      features: ["Manual Lever Profiling", "Exposed E61 Grouphead", "Copper Boiler", "Walnut Accents"],
      specs: {
          "Boiler Type": "Heat Exchanger",
          "Pump Type": "Vibration Pump",
          "Water Tank": "3 Liters",
          "Power": "1500 Watts",
          "Dimensions": "14w x 18d x 16h inches",
          "Warranty": "3 Years"
      }
  },
  {
      id: "white-aether",
      category: "machines",
      name: "White Aether",
      price: 119999,
      tagline: "Minimalist Perfection",
      description: "Designed for the urban minimalist. The Aether delivers professional pressure in a footprint 30% smaller than standard machines.",
      colors: [
          { id: "white", name: "Pure White", hex: "#ffffff", image: "/machine_compact.png" }
      ],
      gallery: ["/machine_compact.png"],
      features: ["Compact Footprint", "Fast Heat Up", "Simple Interface", "Eco Mode"],
      specs: {
          "Boiler Type": "Single Thermoblock",
          "Pump Type": "Vibration Pump",
          "Water Tank": "1.8 Liters",
          "Dimensions": "10w x 12d x 12h inches",
          "Warranty": "1 Year"
      }
  },
  {
      id: "grand-maestro",
      category: "machines",
      name: "Grand Maestro",
      price: 249999,
      tagline: "Dual Boiler Powerhouse",
      description: "The ultimate home machine. Dual independent boilers allow you to steam milk and pull shots simultaneously with zero temperature loss.",
      colors: [
           { id: "chrome-wood", name: "Chrome & Walnut", hex: "#5c4033", image: "/machine_pro.png" }
      ],
      gallery: ["/machine_pro.png"],
      features: ["Saturated Grouphead", "Dual PID", "Rotary Pump (Plumbable)", "Shot Timer"],
      specs: {
          "Boiler Type": "Dual Stainless Boiler",
          "Pump Type": "Commercial Rotary",
          "Water Tank": "Direct Plumb / 4L Tank",
          "Dimensions": "16w x 19d x 15h inches",
          "Warranty": "5 Years"
      }
  },

  // --- ACCESSORIES ---
  { id: 'acc-1', category: 'accessories', name: 'Walnut Precision Tamper', subheading: "Perfectly level tamping.", description: "Hand-turned walnut handle with a precision-machined 58.5mm stainless steel base to prevent channeling.", price: 9999, image: '/acc_tamper.png', gallery: ['/acc_tamper.png'] },
  { id: 'acc-2', category: 'accessories', name: 'Barista Pitcher Matte Black', subheading: "Streamline flow.", description: "Teflon-coated interior for easy cleaning and a precision spout designed for intricate latte art.", price: 3499, image: '/acc_pitcher.png', gallery: ['/acc_pitcher.png'] }, 
  { id: 'acc-3', category: 'accessories', name: 'Naked Portafilter 58mm', subheading: "Watch the extraction.", description: "Diagnose your shots instantly. Fits all E61 groupheads and comes with a triple basket.", price: 6999, image: '/acc_portafilter.png', gallery: ['/acc_portafilter.png'] },
  { id: 'acc-4', category: 'accessories', name: 'Pro Knock Box', subheading: "Clean workflow.", description: "Heavy-duty stainless steel with a shock-absorbing rubber bar. Quiet and durable.", price: 4499, image: '/acc_knockbox.png', gallery: ['/acc_knockbox.png'] },

  // --- BEANS ---
  { id: 'bean-1', category: 'beans', name: 'Ethiopian Yirgacheffe', roast: 'Light Roast', notes: 'Floral, Citrus, bright', description: "Grown at high altitudes, these beans offer a tea-like body with distinct notes of jasmine and lemon zest. Perfect for pour-over or modern espresso.", price: 1800, image: '/beans_light.png', gallery: ['/beans_light.png'] },
  { id: 'bean-2', category: 'beans', name: 'Colombian Supremo', roast: 'Medium Roast', notes: 'Caramel, Nutty, smooth', description: "The classic crowd pleaser. Balanced acidity with deep caramelized sugar sweetness and a nutty finish.", price: 1600, image: '/beans_medium.png', gallery: ['/beans_medium.png'] },
  { id: 'bean-3', category: 'beans', name: 'Sumatra Mandheling', roast: 'Dark Roast', notes: 'Earthy, Spicy, bold', description: "Low acidity and heavy body. Rich flavors of dark chocolate, cedar, and exotic spices. Great for milk-based drinks.", price: 1750, image: '/beans_dark.png', gallery: ['/beans_dark.png'] },
];

export function getProduct(id) {
    return products.find(p => p.id === id) || null;
}
