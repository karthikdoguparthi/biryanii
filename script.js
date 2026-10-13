/**
 * BIRYANI WARS - The Ultimate Hyderabadi Showdown
 * Logic: Live Voting, Distance/Radius filtering, Dynamic Spin Wheel,
 * Secret Underground Addas (AI Doesn't Know), and Hyderabadi Street Slang Rule Engine!
 */

// 1. Secret list of authentic local Hyderabadi biryani addas
// Includes classic underground gems, late night gullies, and spice monsters
const INITIAL_BIRYANI_SPOTS = [
  {
    id: "spot_1",
    name: "Mohd 6 Biryani Point (Al-Makarim Adda)",
    area: "Old City",
    location: "Moghulpura near Charminar Galli",
    distanceKm: 4.2,
    spiceLevel: "Aag Laga Dega (5/5)",
    spiceScore: 5,
    specialty: "Pure Kali Mirch Mutton Dum & Tala Hua Gosht with Khatti Dal",
    priceForTwo: "₹380",
    timing: "1:00 PM - 3:30 AM (Midnight rush)",
    tags: ["Secret Cult Spot", "Mutton Dum Specialist", "Late Night 2AM"],
    votes: 42,
    isUnderground: true,
    warning: "Parking bole toh bhool jao ustaad! Auto bhi fas jaata, activa galli mein chupa ke aao.",
    slangQuote: "AI ko Shadab maloom, Mohd 6 khaye toh dimaag ki batti jal jaati!"
  },
  {
    id: "spot_2",
    name: "Peshawar Hotel & Biryani",
    area: "Lakdikapul / Abids",
    location: "Malakpet Fire Station Lane",
    distanceKm: 7.5,
    spiceLevel: "Zabardast Teekha (4/5)",
    spiceScore: 4,
    specialty: "Afghani Mutton Dum Biryani + Mirchi Ka Salan (Extra thick)",
    priceForTwo: "₹450",
    timing: "12:00 PM - 1:30 AM",
    tags: ["Mutton Dum Specialist", "Secret Cult Spot"],
    votes: 38,
    isUnderground: true,
    warning: "Malakpet signal pe 15 minute ka jam lagta, bhuk se chidchid mat karo.",
    slangQuote: "Nalli nikaal ke daalte miyan, haath dho ke khao!"
  },
  {
    id: "spot_3",
    name: "Shah Ghouse Cafe & Restaurant",
    area: "Tolichowki / Mehdipatnam",
    location: "Tolichowki Main Road",
    distanceKm: 9.8,
    spiceLevel: "Full Masaledar (4.5/5)",
    spiceScore: 4.5,
    specialty: "Special Mutton Dum Biryani + Bheja Fry starter",
    priceForTwo: "₹550",
    timing: "11:30 AM - 2:00 AM",
    tags: ["Mutton Dum Specialist", "Late Night 2AM"],
    votes: 56,
    isUnderground: false,
    warning: "Tolichowki flyover ke neeche u-turn maarte waqt police wale challan kaat rahe, helmet daalo!",
    slangQuote: "Ghee aur zafraan ki khushboo se Rethi Bowli tak janta kheench aati!"
  },
  {
    id: "spot_4",
    name: "Nawaab's Restaurant",
    area: "Gachibowli / Madhapur",
    location: "Gachibowli Flyover Corner",
    distanceKm: 18.0,
    spiceLevel: "Balanced Hyderabadi (3.5/5)",
    spiceScore: 3.5,
    specialty: "Nawaabi Mutton Dum & Chicken 65 (Wet Gravy Style)",
    priceForTwo: "₹650",
    timing: "12:00 PM - 11:30 PM",
    tags: ["Zafrani Royal", "Mutton Dum Specialist"],
    votes: 35,
    isUnderground: false,
    warning: "Cyberabad IT crowd ki line lagti weekend pe, table milne 45 min wait time hai.",
    slangQuote: "Techie log coding chodh ke line mein khade rehte!"
  },
  {
    id: "spot_5",
    name: "Grand Hotel (1935 Heritage Spot)",
    area: "Lakdikapul / Abids",
    location: "Abids Opposite Taj Mahal Hotel",
    distanceKm: 6.0,
    spiceLevel: "Classic Old School Dum (4/5)",
    spiceScore: 4,
    specialty: "Nizami Mutton Dum Biryani with double masala on request",
    priceForTwo: "₹420",
    timing: "6:00 AM - 1:00 AM (Biryani starts 11:30 AM)",
    tags: ["Zafrani Royal", "Secret Cult Spot"],
    votes: 31,
    isUnderground: true,
    warning: "Car park karne Abids mein jagah nahi hai, Metro se utar ke seedha ghuso.",
    slangQuote: "Dada ke zamane ki biryani, rice ka har daana khula khula!"
  },
  {
    id: "spot_6",
    name: "Hotel Shadab",
    area: "Old City",
    location: "Madina Circle, High Court Road",
    distanceKm: 5.1,
    spiceLevel: "Heavy Spice Punch (4.5/5)",
    spiceScore: 4.5,
    specialty: "Mutton Dum Biryani + Paye Nihari + Zafrani Chai",
    priceForTwo: "₹500",
    timing: "5:30 AM - 2:00 AM",
    tags: ["Mutton Dum Specialist", "Late Night 2AM"],
    votes: 61,
    isUnderground: false,
    warning: "Nayapul bridge pe traffic jam lag gaya toh biryani thandi ho jaati miyan!",
    slangQuote: "Biryani ke baad ustaad se 'double meetha' nahi manga toh paap lagta!"
  },
  {
    id: "spot_7",
    name: "Mandi @ 36 & Grill",
    area: "Banjara / Jubilee",
    location: "Road No. 36, Jubilee Hills",
    distanceKm: 14.5,
    spiceLevel: "Mild Zafrani Rich (3/5)",
    spiceScore: 3,
    specialty: "Mutton Juicy Mandi & Barkas Style Dum Rice",
    priceForTwo: "₹850",
    timing: "12:00 PM - 12:30 AM",
    tags: ["Zafrani Royal"],
    votes: 22,
    isUnderground: false,
    warning: "Valet parking full ho gayi toh Road 36 pe towing van khadi hai!",
    slangQuote: "Ameer logan ka adda, par mutton makkan jaisa pighal jaata!"
  },
  {
    id: "spot_8",
    name: "Meridian Cafe & Restaurant",
    area: "Banjara / Jubilee",
    location: "Panjagutta Main Circle",
    distanceKm: 10.2,
    spiceLevel: "Fiery Andhra-Hyderabadi (4.8/5)",
    spiceScore: 4.8,
    specialty: "Mutton Biryani + Extra Dahi Ki Chutney + Apollo Fish",
    priceForTwo: "₹600",
    timing: "11:30 AM - 12:30 AM",
    tags: ["Spicy Andhra-Hyderabadi", "Mutton Dum Specialist"],
    votes: 49,
    isUnderground: false,
    warning: "Extra raita maangte waqt waiter se dosti se baat karo, gusse mein aana mana hai!",
    slangQuote: "Panjagutta circle ka raja spot, spice aisi ki kaan se dhuan nikle!"
  },
  {
    id: "spot_9",
    name: "Chacha Miyan Galli Adda (Secret Karkhana)",
    area: "Secunderabad",
    location: "Behind Clock Tower, Old Galli",
    distanceKm: 12.0,
    spiceLevel: "Aag Laga Dega (5/5)",
    spiceScore: 5,
    specialty: "Pure Seena & Dast pieces Mutton Biryani (Sirf 3 Handi banti)",
    priceForTwo: "₹340",
    timing: "1:30 PM - 4:00 PM (Khatam hone tak)",
    tags: ["Secret Cult Spot", "Mutton Dum Specialist"],
    votes: 45,
    isUnderground: true,
    warning: "Sirf 3 ghante khulta hai ustaad! Late hue toh chammach chatte baithe rehna padta.",
    slangQuote: "Secunderabad station ke auto wale bhi chupke se idhar aate!"
  },
  {
    id: "spot_10",
    name: "Bawarchi (Authentic RTC X Roads Only)",
    area: "Lakdikapul / Abids",
    location: "RTC X Roads, Beside Sandhya Theatre",
    distanceKm: 8.8,
    spiceLevel: "Masala Heavy (4.2/5)",
    spiceScore: 4.2,
    specialty: "Mutton Biryani + Boti Kabab + Tangdi Kabab",
    priceForTwo: "₹480",
    timing: "11:30 AM - 11:30 PM",
    tags: ["Mutton Dum Specialist"],
    votes: 52,
    isUnderground: false,
    warning: "Duplicate Bawarchi bohot hain sheher mein! Sandhya theatre wala hi asli baap hai, bhatko mat!",
    slangQuote: "Cinema chodh ke interval mein biryani pack karwane jaate public!"
  },
  {
    id: "spot_11",
    name: "Barkas Hadramout Mandi & Biryani",
    area: "Old City",
    location: "Barkas Barracks, Chandrayangutta",
    distanceKm: 16.5,
    spiceLevel: "Authentic Arabic-Hyderabadi (3.2/5)",
    spiceScore: 3.2,
    specialty: "Fahham Mutton Rice & Khouzi with Garlic Toum",
    priceForTwo: "₹550",
    timing: "1:00 PM - 2:30 AM",
    tags: ["Zafrani Royal", "Late Night 2AM", "Secret Cult Spot"],
    votes: 39,
    isUnderground: true,
    warning: "Barkas lane mein speed breaker bohot unche hain, gaadi ki chamber lag jaati sambhal ke!",
    slangQuote: "Chaap ka piece itna naram ki haddi khud alag ho jaati!"
  },
  {
    id: "spot_12",
    name: "Cafe Bahar",
    area: "Lakdikapul / Abids",
    location: "Hyderguda, Basheerbagh",
    distanceKm: 7.0,
    spiceLevel: "Full Spice Blast (4.4/5)",
    spiceScore: 4.4,
    specialty: "Special Bahar Mutton Dum + Chicken 65 Dry",
    priceForTwo: "₹520",
    timing: "11:00 AM - 12:00 AM",
    tags: ["Mutton Dum Specialist", "Spicy Andhra-Hyderabadi"],
    votes: 47,
    isUnderground: false,
    warning: "Basheerbagh flyover pe metro work aur traffic hai, bike leke aana behtar hai.",
    slangQuote: "Bahar ki chai aur biryani... Hyderabadi ka oxygen hai baap!"
  }
];

// 2. Hyderabadi Street Slang Rule Engine & Error Converter
// Translates standard boring UX error messages into authentic Hyderabadi street warnings
const SLANG_TRANSLATIONS = {
  // Distance / Radius Errors
  "out_of_radius": {
    title: "Kahan jaara miyan itni door?!",
    desc: "Petrol ka paisa baap dega kya? Shamshabad airport ke paar bhejra hamare ku! Radius kam karo ustaad.",
    type: "warning",
    icon: "⛽"
  },
  "no_spots_found": {
    title: "Nakko karo aisa mazaak!",
    desc: "Ek bhi spot nahi bacha filter mein! Biryani chod ke Maggi khana hai kya? Filters reset karo jaldi!",
    type: "error",
    icon: "🤦‍♂️"
  },
  "empty_input": {
    title: "Arey ustaad, dimaag ghum gaya kya?",
    desc: "Khaali form bhejra? Adda ka naam toh daalo miyan, hawa mein biryani khate kya?",
    type: "error",
    icon: "🍲"
  },
  "duplicate_spot": {
    title: "Pehle se list mein hai baap!",
    desc: "Dobara daal ke hero banra kya? Woh spot pehle se fight mein aag laga raha hai!",
    type: "warning",
    icon: "🔥"
  },
  "vote_spam": {
    title: "Sabar karo miyan, ungli dukh jaati!",
    desc: "Ek hi spot ku 10 baar vote daalra? Election rigging karre kya Charminar mein?",
    type: "warning",
    icon: "🛑"
  },
  "parking_alert": {
    title: "Galli mein fas jaati gaadi!",
    desc: "Car nikaal rahe toh tolichowki signal pe police challan katega, helmet aur seatbelt sambhalo!",
    type: "warning",
    icon: "🚨"
  },
  "decision_locked": {
    title: "Majlis Barkhaast! Biryani Final!",
    desc: "Sab rona dhona bandh! Gaadi nikalo aur seedha pohcho, dawat on!",
    type: "success",
    icon: "🎉"
  }
};

// Hyderabadi Street Audio-Like Taunts for Gang
const GANG_TAUNTS = [
  { text: "Khaate ki maarte?!", sub: "Group fight final decider" },
  { text: "Paradise bolte chappal padti!", sub: "No generic tourist biryani" },
  { text: "Double Masala le miyan!", sub: "Extra spicy punch" },
  { text: "Dahi ki chutney daal!", sub: "Raita lovers anthem" },
  { text: "Baap ku mat sikhao!", sub: "When friend acts like food critic" },
  { text: "Challan katega helmet daal!", sub: "Traffic police reality check" }
];

// App State
let spots = [];
let currentZone = "all";
let maxDistance = 25;
let currentTag = "all";
let searchQuery = "";
let currentSort = "votes";
let isLocked = false;
let userVoteHistory = {};

// Load stored spots or fallback
function loadSpots() {
  const saved = localStorage.getItem("biryani_wars_spots");
  if (saved) {
    try {
      spots = JSON.parse(saved);
    } catch (e) {
      spots = [...INITIAL_BIRYANI_SPOTS];
    }
  } else {
    spots = [...INITIAL_BIRYANI_SPOTS];
  }
}

function saveSpots() {
  localStorage.setItem("biryani_wars_spots", JSON.stringify(spots));
}

// Hyderabadi Slang Toast Notification Trigger
function showSlangToast(errorKey, customText = null) {
  const container = document.getElementById("slangToastContainer");
  const slangObj = SLANG_TRANSLATIONS[errorKey] || {
    title: "Arey ustaad!",
    desc: customText || "Kuch toh gadbad ho gayi!",
    type: "warning",
    icon: "⚠️"
  };

  const toast = document.createElement("div");
  toast.className = `slang-toast ${slangObj.type}`;
  toast.innerHTML = `
    <span class="toast-icon">${slangObj.icon}</span>
    <div class="toast-body">
      <h5>${slangObj.title}</h5>
      <p>${customText || slangObj.desc}</p>
    </div>
  `;

  container.appendChild(toast);

  // Play subtle sound vibration/synth
  playSlangBeep(slangObj.type);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

// Simple Web Audio API Synthesizer for Hyderabadi Sound Feedback
function playSlangBeep(type = "normal") {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "success") {
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.25); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === "error" || type === "warning") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    }
  } catch (err) {
    // Ignore audio restriction if user hasn't interacted
  }
}

// Render Filtered Spots
function renderSpots() {
  const grid = document.getElementById("spotsGrid");
  const visibleCountEl = document.getElementById("visibleSpotsCount");
  
  // Filter by zone
  let filtered = spots.filter(item => {
    if (currentZone !== "all" && item.area !== currentZone) return false;
    if (item.distanceKm > maxDistance) return false;
    if (currentTag !== "all" && !item.tags.includes(currentTag)) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchArea = item.area.toLowerCase().includes(q);
      const matchSpecialty = item.specialty.toLowerCase().includes(q);
      const matchWarning = item.warning.toLowerCase().includes(q);
      if (!matchName && !matchArea && !matchSpecialty && !matchWarning) return false;
    }
    return true;
  });

  // Sorting
  if (currentSort === "votes") {
    filtered.sort((a, b) => b.votes - a.votes);
  } else if (currentSort === "spice") {
    filtered.sort((a, b) => b.spiceScore - a.spiceScore);
  } else if (currentSort === "distance") {
    filtered.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (currentSort === "stealth") {
    filtered.sort((a, b) => (b.isUnderground ? 1 : 0) - (a.isUnderground ? 1 : 0));
  }

  visibleCountEl.innerText = filtered.length;

  // Check if zero spots found -> trigger Hyderabadi error slang!
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🤦‍♂️</div>
        <h3 style="font-size: 1.5rem; color: #ffb703; margin-bottom: 0.5rem;">"Arey ustaad! Sab filter laga ke bhatak gaye kya?!"</h3>
        <p style="color: #94a3b8; max-width: 500px; margin: 0 auto 1.5rem;">
          Itna strict filter lagaye toh pure Hyderabad mein sirf rumaali roti bachegi! Radius badhao ya "Sab Chalega" select karo!
        </p>
        <button id="btnResetFilters" class="btn-neon-action" style="margin: 0 auto;">
          <span>🔄 Filters Hatado Ustaad</span>
        </button>
      </div>
    `;
    document.getElementById("btnResetFilters")?.addEventListener("click", () => {
      currentZone = "all";
      maxDistance = 25;
      currentTag = "all";
      searchQuery = "";
      document.getElementById("maxDistanceRange").value = "25";
      document.getElementById("distVal").innerText = "25 km";
      document.getElementById("searchInput").value = "";
      document.querySelectorAll(".zone-pill").forEach(p => p.classList.toggle("active", p.dataset.zone === "all"));
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.toggle("active", c.dataset.tag === "all"));
      renderSpots();
    });
    updateLeaderBanner(null);
    return;
  }

  // Find max votes for leader tag
  const topSpot = [...spots].sort((a, b) => b.votes - a.votes)[0];
  updateLeaderBanner(topSpot);

  // Render cards
  grid.innerHTML = filtered.map(spot => {
    const isLeader = topSpot && spot.id === topSpot.id && spot.votes > 0;
    return `
      <article class="spot-card ${isLeader ? 'leader' : ''}" data-id="${spot.id}">
        <div class="spot-card-header">
          <div>
            <h3 class="spot-name">${spot.name}</h3>
            <div class="spot-sub-area">
              <span>📍 ${spot.location} (${spot.area})</span>
            </div>
          </div>
          <div>
            ${spot.isUnderground 
              ? `<span class="badge-underground">🤫 AI-FREE ADDA</span>` 
              : `<span class="badge-legend">👑 SHAHI DUM</span>`}
          </div>
        </div>

        <div class="spot-body">
          <div class="spot-badges-row">
            <span class="pill-info pill-dist">🚗 ${spot.distanceKm} km dur</span>
            <span class="pill-info pill-spice-high">🌶️ ${spot.spiceLevel}</span>
            <span class="pill-info">💰 ${spot.priceForTwo} for 2</span>
            <span class="pill-info">🕒 ${spot.timing}</span>
          </div>

          <div class="spot-specialty">
            <strong>Asli Item:</strong> ${spot.specialty}
          </div>

          <div class="spot-warning-box">
            <span>🚨</span>
            <div><strong>Galli Warning:</strong> ${spot.warning}</div>
          </div>

          <div style="font-size: 0.75rem; color: #a0a0b2; font-style: italic;">
            "${spot.slangQuote}"
          </div>
        </div>

        <div class="spot-footer">
          <div class="vote-counter-box">
            <span class="vote-digit" id="voteCount-${spot.id}">${spot.votes}</span>
            <span class="vote-label">BIRYANI VOTES</span>
          </div>
          <div class="vote-actions-pair">
            <button class="btn-vote-up" data-id="${spot.id}" title="Vote for this Biryani spot">
              <span>🔥 Khaana Hai!</span>
            </button>
            <button class="btn-vote-down" data-id="${spot.id}" title="Downvote / Discard spot">
              <span>👎 Nakko</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  attachVoteEvents();
}

// Update Top Consensus Banner
function updateLeaderBanner(topSpot) {
  const nameEl = document.getElementById("winnerSpotName");
  const metaEl = document.getElementById("winnerMeta");
  const badgeEl = document.getElementById("winnerVotesBadge");

  if (!topSpot || topSpot.votes === 0) {
    nameEl.innerText = "No Clear Winner Yet!";
    metaEl.innerText = "Gang mein voting shuru karo miyan! Consensus nahi bana abhi.";
    badgeEl.innerText = "0 VOTES";
    return;
  }

  nameEl.innerText = `👑 ${topSpot.name}`;
  metaEl.innerText = `📍 ${topSpot.location} • 🌶️ ${topSpot.spiceLevel} • Asli: ${topSpot.specialty}`;
  badgeEl.innerText = `${topSpot.votes} VOTES`;
}

// Vote Button Event Bindings
function attachVoteEvents() {
  document.querySelectorAll(".btn-vote-up").forEach(btn => {
    btn.onclick = (e) => {
      const id = btn.dataset.id;
      handleVote(id, 1);
    };
  });

  document.querySelectorAll(".btn-vote-down").forEach(btn => {
    btn.onclick = (e) => {
      const id = btn.dataset.id;
      handleVote(id, -1);
    };
  });
}

// Vote Handlers with Hyderabadi Feedback
function handleVote(spotId, delta) {
  const target = spots.find(s => s.id === spotId);
  if (!target) return;

  target.votes = Math.max(0, target.votes + delta);
  saveSpots();

  // Micro animation on vote count
  const counterEl = document.getElementById(`voteCount-${spotId}`);
  if (counterEl) {
    counterEl.innerText = target.votes;
    counterEl.style.transform = "scale(1.3)";
    counterEl.style.color = delta > 0 ? "#10b981" : "#ef4444";
    setTimeout(() => {
      counterEl.style.transform = "scale(1)";
      counterEl.style.color = "var(--primary-gold)";
    }, 250);
  }

  // Update overall leader
  const topSpot = [...spots].sort((a, b) => b.votes - a.votes)[0];
  updateLeaderBanner(topSpot);

  if (delta > 0) {
    playSlangBeep("success");
    const compliments = [
      `"${target.name}" ku vote pad gaya miyan! Taste toh ek number hai!`,
      `Sahi pakde ustaad! ${target.name} ka duma-dum biryani scene on!`,
      `Zabardast choice! Dahi ki chutney extra maangna bhoolna mat!`
    ];
    const rand = compliments[Math.floor(Math.random() * compliments.length)];
    showSlangToast("custom", rand);
  } else {
    playSlangBeep("normal");
    showSlangToast("custom", `"${target.name}" ku nakko bole? Theek hai, dusra spot dekho!`);
  }
}

// Slang Taunts Buttons Generation
function initSlangTaunts() {
  const container = document.getElementById("slangButtons");
  container.innerHTML = GANG_TAUNTS.map(item => `
    <button class="btn-slang-taunt" data-quote="${item.text}">
      <span>🗣️ "${item.text}"</span>
      <small>${item.sub}</small>
    </button>
  `).join("");

  container.querySelectorAll(".btn-slang-taunt").forEach(btn => {
    btn.onclick = () => {
      const quote = btn.dataset.quote;
      playSlangBeep("success");
      showSlangToast("custom", `GANG ALERT: "${quote}"`);
      
      // Update Slang Ticker with immediate taunt
      const ticker = document.getElementById("slangTicker");
      ticker.innerText = `🚨 LATEST CHILLA: "${quote}" • ` + ticker.innerText;
    };
  });
}

// Add Secret Spot Form Handler
function initSecretSpotForm() {
  const form = document.getElementById("addSecretSpotForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("newSpotName").value.trim();
    const area = document.getElementById("newSpotArea").value;
    const price = document.getElementById("newSpotPrice").value.trim() || "₹350 (Full Plate)";
    const specialty = document.getElementById("newSpotSpecialty").value.trim() || "Pure Mutton Dum with Zafrani Flavour";
    const warning = document.getElementById("newSpotWarning").value.trim() || "Auto mat ghusao, bike galli mein park karo!";

    if (!name) {
      showSlangToast("empty_input");
      return;
    }

    // Check duplicate
    const exists = spots.some(s => s.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      showSlangToast("duplicate_spot");
      return;
    }

    const newSpot = {
      id: "secret_" + Date.now(),
      name: name,
      area: area,
      location: `${area} Galli Secret Point`,
      distanceKm: Math.floor(Math.random() * 12) + 3,
      spiceLevel: "Aag Laga Dega (5/5)",
      spiceScore: 5,
      specialty: specialty,
      priceForTwo: price,
      timing: "12:30 PM - 2:00 AM",
      tags: ["Secret Cult Spot", "Mutton Dum Specialist"],
      votes: 10, // starts with excitement votes
      isUnderground: true,
      warning: warning,
      slangQuote: "AI search karke thak gaya, sirf asli Hyderabadi ko maloom!"
    };

    spots.unshift(newSpot);
    saveSpots();
    renderSpots();
    form.reset();

    showSlangToast("custom", `🔥 Miyan! "${name}" add ho gaya list mein! AI ko kaano kaan khabar nahi!`);
  });
}

// Decision Wheel Implementation (Canvas Spin)
let wheelAngle = 0;
let isSpinning = false;

function initSpinWheel() {
  const btnOpenWheel = document.getElementById("btnSpinWheel");
  const modal = document.getElementById("wheelModal");
  const btnClose = document.getElementById("btnCloseWheel");
  const btnSpin = document.getElementById("btnSpinNow");
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");

  btnOpenWheel.onclick = () => {
    modal.classList.remove("hidden");
    drawWheel(ctx);
  };

  btnClose.onclick = () => {
    modal.classList.add("hidden");
  };

  btnSpin.onclick = () => {
    if (isSpinning) return;
    spinWheel(ctx);
  };

  document.getElementById("btnAcceptWheel")?.addEventListener("click", () => {
    modal.classList.add("hidden");
    const topSpot = [...spots].sort((a, b) => b.votes - a.votes)[0];
    triggerLockDecision(topSpot);
  });
}

function getWheelItems() {
  // Top 6 active spots
  const topSpots = [...spots].sort((a, b) => b.votes - a.votes).slice(0, 6);
  return topSpots;
}

function drawWheel(ctx) {
  const items = getWheelItems();
  const numSlices = items.length;
  if (numSlices === 0) return;

  const sliceAngle = (2 * Math.PI) / numSlices;
  const radius = 180;
  const centerX = 190;
  const centerY = 190;

  ctx.clearRect(0, 0, 380, 380);

  const colors = ["#ff8c00", "#d90429", "#ffb703", "#7209b7", "#00b4d8", "#2a9d8f"];

  items.forEach((item, i) => {
    const startAngle = wheelAngle + i * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#16161e";
    ctx.stroke();

    // Text Label
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Space Grotesk', sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 4;
    const shortName = item.name.length > 18 ? item.name.substring(0, 16) + "..." : item.name;
    ctx.fillText(shortName, radius - 15, 5);
    ctx.restore();
  });

  // Center Hub
  ctx.beginPath();
  ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
  ctx.fillStyle = "#16161e";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffb703";
  ctx.stroke();

  ctx.fillStyle = "#ffb703";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🍗", centerX, centerY);
}

function spinWheel(ctx) {
  isSpinning = true;
  document.getElementById("wheelResult").classList.add("hidden");
  
  const items = getWheelItems();
  const numSlices = items.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  const spins = 5 + Math.random() * 4; // 5 to 9 rotations
  const targetOffset = Math.random() * Math.PI * 2;
  const totalRotation = spins * Math.PI * 2 + targetOffset;

  const duration = 4000;
  const start = performance.now();
  const initialAngle = wheelAngle;

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    wheelAngle = initialAngle + totalRotation * ease;
    drawWheel(ctx);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      // Determine chosen slice
      // Pointer is at the top (-PI / 2)
      const normalizedAngle = (2 * Math.PI - (wheelAngle % (2 * Math.PI)) + 1.5 * Math.PI) % (2 * Math.PI);
      const chosenIndex = Math.floor(normalizedAngle / sliceAngle) % numSlices;
      const winner = items[chosenIndex];

      // Give bonus vote to winner
      winner.votes += 5;
      saveSpots();
      renderSpots();

      // Show Result
      const resBox = document.getElementById("wheelResult");
      const titleEl = document.getElementById("wheelResultTitle");
      const dialogueEl = document.getElementById("wheelResultDialogue");

      titleEl.innerText = winner.name;
      dialogueEl.innerText = `Qismat ne faisla kardiya ustaad! "${winner.specialty}" khaane pohcho! Warning: ${winner.warning}`;
      resBox.classList.remove("hidden");
      playSlangBeep("success");
    }
  }

  requestAnimationFrame(animate);
}

// Lock Decision & Send WhatsApp Warning
function triggerLockDecision(spot) {
  if (!spot) {
    showSlangToast("no_spots_found");
    return;
  }

  const modal = document.getElementById("lockedModal");
  const content = document.getElementById("lockedCardContent");

  content.innerHTML = `
    <h3 style="color: #ffb703; font-size: 1.4rem; margin-bottom: 6px;">${spot.name}</h3>
    <p style="color: #cbd5e1; font-size: 0.9rem; margin-bottom: 6px;">📍 <strong>Location:</strong> ${spot.location} (${spot.area})</p>
    <p style="color: #ff6b6b; font-size: 0.9rem; margin-bottom: 6px;">🌶️ <strong>Spice Level:</strong> ${spot.spiceLevel}</p>
    <p style="color: #38bdf8; font-size: 0.9rem; margin-bottom: 8px;">👑 <strong>Asli Item:</strong> ${spot.specialty}</p>
    <div style="background: rgba(239, 68, 68, 0.15); border: 1px dashed #ef4444; padding: 10px; border-radius: 8px; color: #fca5a5; font-size: 0.82rem;">
      🚨 <strong>TRAFFIC & PARKING DANGER:</strong> ${spot.warning}
    </div>
  `;

  modal.classList.remove("hidden");

  // WhatsApp Button
  const btnWA = document.getElementById("btnSendWhatsApp");
  btnWA.onclick = () => {
    const text = encodeURIComponent(
      `🍗 *HYDERABAD GROUP DECISION FINAL HO GAYA!* 🍗\n\n` +
      `*Adda:* ${spot.name}\n` +
      `*Area:* ${spot.location} (${spot.area})\n` +
      `*Khaas Item:* ${spot.specialty}\n` +
      `*Warning:* ${spot.warning}\n\n` +
      `Ustaad, 30 minute mein sab idhar pohcho! Late hue toh biryani thandi hori, baad mein rona nakko! 🚗💨`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };
}

// Setup Event Listeners
function setupControls() {
  // Zone selection
  document.querySelectorAll(".zone-pill").forEach(pill => {
    pill.onclick = () => {
      document.querySelectorAll(".zone-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentZone = pill.dataset.zone;
      renderSpots();
    };
  });

  // Distance range slider
  const distRange = document.getElementById("maxDistanceRange");
  const distVal = document.getElementById("distVal");
  const petrolWarn = document.getElementById("petrolWarning");

  distRange.oninput = (e) => {
    maxDistance = parseInt(e.target.value);
    distVal.innerText = `${maxDistance} km`;

    if (maxDistance > 22) {
      petrolWarn.innerText = `🚗 "Shamshabad airport pohcha dega kya miyan?!"`;
      petrolWarn.style.color = "#ff6b6b";
    } else if (maxDistance < 5) {
      petrolWarn.innerText = `🚶 "Chappal pehen ke paidal chala ja!"`;
      petrolWarn.style.color = "#10b981";
    } else {
      petrolWarn.innerText = `🚗 "Petrol ka paisa baap dega kya?"`;
      petrolWarn.style.color = "#f59e0b";
    }

    renderSpots();
  };

  // Tag filters
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.onclick = () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentTag = chip.dataset.tag;
      renderSpots();
    };
  });

  // Search input
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");

  searchInput.oninput = (e) => {
    searchQuery = e.target.value;
    clearSearch.classList.toggle("hidden", searchQuery.length === 0);
    renderSpots();
  };

  clearSearch.onclick = () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearch.classList.add("hidden");
    renderSpots();
  };

  // Sort dropdown
  const sortSel = document.getElementById("sortSelector");
  sortSel.onchange = (e) => {
    currentSort = e.target.value;
    renderSpots();
  };

  // Reset votes
  document.getElementById("btnResetVotes").onclick = () => {
    if (confirm("Ustaad, sab votes zero karke dubara ladayi shuru karna chahte?")) {
      spots.forEach(s => s.votes = 0);
      saveSpots();
      renderSpots();
      showSlangToast("custom", "🔄 Sab votes zero ho gaye! Ab fresh dangal shuru karo!");
    }
  };

  // Lock decision button
  document.getElementById("btnLockDecision").onclick = () => {
    const topSpot = [...spots].sort((a, b) => b.votes - a.votes)[0];
    if (!topSpot || topSpot.votes === 0) {
      showSlangToast("no_spots_found", "Arey miyan, pehle vote toh daalo! 0 votes pe kya lock karein?");
    } else {
      triggerLockDecision(topSpot);
    }
  };

  // Close locked modal
  document.getElementById("btnCloseLocked").onclick = () => {
    document.getElementById("lockedModal").classList.add("hidden");
  };

  // Share room button
  document.getElementById("btnShareRoom").onclick = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSlangToast("custom", "🔗 Link copy ho gaya ustaad! WhatsApp group pe feko jaldi!");
  };

  // Live time ticker badge
  function updateTimeBadge() {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, "0");
    const badge = document.getElementById("currentTimeBadge");
    
    let mealHint = "Dopehar ki Dum Biryani Time ☀️";
    if (hours >= 20 || hours < 4) {
      mealHint = "🌙 Raat ka 2AM Adda Time";
    }
    badge.innerText = `🕒 ${hours}:${mins} • ${mealHint}`;
  }
  updateTimeBadge();
  setInterval(updateTimeBadge, 60000);
}

// Background Spice Particles Generation
function initFloatingSpices() {
  const container = document.getElementById("spiceParticles");
  const spices = ["🌶️", "🍗", "🍚", "🍲", "🧄", "🧅", "🍋"];

  for (let i = 0; i < 16; i++) {
    const span = document.createElement("span");
    span.innerText = spices[Math.floor(Math.random() * spices.length)];
    span.style.position = "fixed";
    span.style.left = `${Math.random() * 95}vw`;
    span.style.top = `${Math.random() * 95}vh`;
    span.style.fontSize = `${Math.random() * 14 + 14}px`;
    span.style.opacity = `${Math.random() * 0.12 + 0.04}`;
    span.style.pointerEvents = "none";
    span.style.zIndex = "0";
    container.appendChild(span);
  }
}

// Init Application
document.addEventListener("DOMContentLoaded", () => {
  loadSpots();
  setupControls();
  initSlangTaunts();
  initSecretSpotForm();
  initSpinWheel();
  initFloatingSpices();
  renderSpots();
});
