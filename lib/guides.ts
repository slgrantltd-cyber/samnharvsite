export interface GuideSection {
  title: string;
  items: { label: string; value: string }[];
}

export interface PropertyGuide {
  slug: string;
  name: string;
  strap: string;
  welcome: string;
  /** Fill these in — the page hides Wi-Fi until both are set */
  wifiName: string;
  wifiPassword: string;
  sections: GuideSection[];
  checkout: string;
}

export const GUIDES: PropertyGuide[] = [
  {
    slug: "barrows",
    name: "The Barrows House",
    strap: "Weston-super-Mare",
    welcome:
      "Welcome — we're really glad you're here. This page has everything you need for your stay. If anything at all isn't right, message or call us and we'll sort it the same day. — Samuel & Harvey",
    wifiName: "",
    wifiPassword: "",
    sections: [
      {
        title: "The essentials",
        items: [
          { label: "Parking", value: "One space right outside the front door, plus two more down the side of the house — three in total, vans welcome." },
          { label: "Wi-Fi", value: "The Virgin Media 'Scan to connect' card lives next to the router — point your phone camera at it and you're online in one tap." },
          { label: "Heating", value: "Thermostat in the hallway — set it to what you need; please turn it down when you head out." },
          { label: "Washing machine", value: "In the kitchen — detergent under the sink is yours to use." },
          { label: "Bins", value: "Black bins out Sunday evening for Monday collection; recycling in the green boxes." },
          { label: "Beds", value: "5 single beds across 3 bedrooms. Need two made into a double next visit? Just ask when booking." },
        ],
      },
      {
        title: "Around the corner",
        items: [
          { label: "Supermarket", value: "1 minute away — for everything you forgot to pack." },
          { label: "Beach & town", value: "Weston Beach, the Grand Pier and town centre are 5 minutes." },
          { label: "M5", value: "Junction is 5 minutes — Bristol is about 30 by car, ~25 by train from Weston station." },
          { label: "Takeaways", value: "Plenty within a few minutes — ask us for our honest favourites." },
        ],
      },
      {
        title: "Need us?",
        items: [
          { label: "Samuel", value: "07444 551241 — call or WhatsApp, evenings and weekends included" },
          { label: "Harvey", value: "07753 600183 — call or WhatsApp" },
          { label: "Emergencies", value: "Gas smell: call 0800 111 999 and leave the property. Urgent repairs: call us any time." },
        ],
      },
    ],
    checkout: "Check-out is 10 AM — just leave used towels in the bath, pop the keys back in the key safe, and pull the door shut. That's it.",
  },
  {
    slug: "cheddar",
    name: "The Cheddar Loft",
    strap: "Cheddar, Somerset",
    welcome:
      "Welcome — we're really glad you're here. This page has everything you need for your stay. If anything at all isn't right, message or call us and we'll sort it the same day. — Samuel & Harvey",
    wifiName: "TP-Link_5358",
    wifiPassword: "26399706",
    sections: [
      {
        title: "The essentials",
        items: [
          { label: "Parking", value: "Use the large car park on the left of the property — plenty of room, no permit needed." },
          { label: "Heating", value: "Thermostat by the door — set it to what you need; please turn it down when you head out." },
          { label: "The big window", value: "The gorge-view windows open on the latches — please close them when you go out (the weather turns fast off the hills)." },
          { label: "Bins", value: "Bin store by the entrance — collection day is on the lid." },
        ],
      },
      {
        title: "Around the corner",
        items: [
          { label: "Cheddar Gorge", value: "You're minutes from the gorge, the caves and the cliff-top walk — go early, before the coaches." },
          { label: "The village", value: "Pubs, cafés and the famous cheese shop are a short walk." },
          { label: "Further out", value: "Wells Cathedral ~20 min, Glastonbury ~30 min, Weston beach ~25 min, Bristol ~45 min." },
        ],
      },
      {
        title: "Need us?",
        items: [
          { label: "Samuel", value: "07444 551241 — call or WhatsApp, evenings and weekends included" },
          { label: "Harvey", value: "07753 600183 — call or WhatsApp" },
          { label: "Emergencies", value: "Gas smell: call 0800 111 999 and leave the property. Urgent repairs: call us any time." },
        ],
      },
    ],
    checkout: "Check-out is 10 AM — just leave used towels in the bathroom, pop the keys back in the key safe, and pull the door shut. That's it.",
  },
];
