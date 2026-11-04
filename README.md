# LiFE Flex League — Community Energy Relays Web Application

**LiFE Flex League** is an interactive multi-page web application inspired by **Mission LiFE (Lifestyle for Environment)**. It empowers residential housing societies, apartment towers, and schools to coordinate flexible appliance habits through timed, shared **Energy Relays**.

---

## 🌟 Product Concept & Vision

Traditional residential sustainability applications focus almost exclusively on individual carbon guilt, kilowatt charts, or isolated tracking. **LiFE Flex League** shifts the dynamic from individual guilt to **neighbourhood teamwork and collective demand flexibility**:

1. **Community Teams**: Residents join their housing society, apartment complex, or school league.
2. **Timed Energy Relays**: During grid stress periods (e.g., evening dinner peaks) or abundant solar hours (midday), relays open for a 2-3 hour window.
3. **Flexible Habit Coordination**: Households choose an action suitable to their comfort and schedule (e.g., shifting washing machine cycles to daytime solar hours, nudging AC to 26°C with ceiling fans, rescheduling geyser heating, or sweeping idle standby power).
4. **Shared Community Unlocks**: When the community participation target is met, a shared neighbourhood reward (such as automated solar pathway lanterns for the society garden or an energy audit) unlocks for the common benefit.

---

## 🧭 Multi-Page Navigation Structure

The application features 8 complete, responsive pages with client-side hash routing and browser back/forward support:

1. **Home (`#home`)**: Cinematic renewable energy hero, value proposition, live relay preview card, 3-step explanation, weekly challenge spotlight, and quick links.
2. **How It Works (`#how-it-works`)**: Step-by-step breakdown of community energy coordination, comfort-first rules, and transparent distinction between self-reported participation and measured utility meter savings.
3. **Live Energy Relay (`#relay`)**: The core interactive product page with real-time participation meter, flexible action selectors, immediate join/completion controls, live neighbourhood activity feed, and reward unlock threshold.
4. **Challenges (`#challenges`)**: Current, Upcoming, and Past relays with time windows, eligibility criteria, flex point credits, verification methods, and household safety guidelines.
5. **Leaderboard & Rewards (`#leaderboard`)**: Switchable individual resident and community society standings with transparent scoring rules and a sample reward catalogue (LED conversion kits, BRTS transit passes, solar lanterns).
6. **Solar Explorer (`#solar`)**: Interactive rooftop solar readiness calculator estimating kWp capacity, monthly generation, bill savings, roof area needs, and central PM Surya Ghar Muft Bijli Yojana subsidies for Gujarat homes.
7. **Join a Community (`#communities`)**: Search and filter Gujarat societies (Ahmedabad, Surat, Vadodara, Rajkot, Gandhinagar) with instant team switching and local persistence.
8. **About & Partners (`#about`)**: Mission LiFE alignment details, guidelines for ethical sponsor partnerships, and a society coordinator pilot registration form.

---

## 🛠️ Architecture Overview

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with glassmorphism utilities (`glass-panel`, `glass-nav`), deep teal/forest green/sky blue/warm amber palette, and responsive mobile drawers.
- **State & Routing**: Custom `AppContext` providing stateful client routing (`#hash` navigation), community selection, relay participation state, activity feed management, and toast notifications.
- **Local Persistence**: Browser `localStorage` maintains user participation status, completed actions, flex points, and selected active community across page reloads.
- **Deterministic Pure Logic**:
  - `src/utils/solarCalculator.ts`: Pure solar generation & subsidy calculation based on Western India regional solar irradiance factors (~4.2 kWh/kWp/day) and PM Surya Ghar benchmark slabs.
  - `src/utils/relayLogic.ts`: Relay progress percentage math, community reward unlock evaluation, and activity chain stream formatting.
- **Testing**: Deterministic unit tests written with `node:test` and `node:assert/strict`, executed via `npx --yes tsx --test`.

---

## 🚀 Setup & Development Instructions

### Prerequisites
- Node.js 20+ installed

### Development Server
```bash
# Install dependencies
npm install

# Start Vite development server on port 3000
npm run dev
```

### Running Unit Tests
```bash
# Execute pure logic unit tests
npx --yes tsx --test src/utils/*.test.ts
```

### Production Build
```bash
# Build optimized static distribution
npm run build
```

---

## 🔍 Prototype Limitations & Future Integrations

1. **Self-Reported Coordination vs. Smart Meter Telemetry**:
   - *Current Prototype*: Uses self-attested participation to coordinate social habits.
   - *Future Roadmap*: Integration with Advanced Metering Infrastructure (AMI) smart meter APIs from Gujarat DISCOMs (UGVCL, Torrent Power) or consumer CT clamps for verified demand response settlement.
2. **Community Authentication**:
   - *Current Prototype*: Lightweight simulated unit reference (e.g. "Flat A-102") with zero collection of personal identity.
   - *Future Roadmap*: RWA verified resident onboarding via WhatsApp OTP or society management software (e.g., MyGate / NoBrokerHood webhooks).
3. **Sponsor & Reward Fulfillment**:
   - *Current Prototype*: Explicitly marked as sample demo rewards with no confirmed commercial contracts.
   - *Future Roadmap*: Integration with municipal public transport ticketing APIs (Ahmedabad Janmarg BRTS) and verified eco-friendly retailers.
