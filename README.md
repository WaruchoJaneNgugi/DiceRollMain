# 🎲 Dice Roll – Web Game (React + TypeScript)
A real-time dice betting game built with React, TypeScript, WebSockets, and Canvas animations. Players predict whether the sum of three dice will be Over 7.5 or Under 7.5 with an immersive 3D dice rolling experience.

## 🎮 Live Demo
https://dice-roll-main-zeta.vercel.app/

## 📸 Preview
https:///src/assets/rpsGame.png

## ✨ Features
- 3D Dice Animation: Realistic 3D dice rolling with Canvas rendering

- Real-time Betting: Live WebSocket communication for instant results

- Betting System: Preset amounts (20, 50, 100, 500, 1000) with manual controls

- Dynamic Progress Bar: Visual representation of Over/Under prediction

- Sound Effects: Immersive audio for dice rolling, wins, and losses

- Game History: Track previous outcomes and bet history

- Responsive UI: Clean, modern interface with gradient effects

- Settings & Help: Customizable sound settings and comprehensive game instructions

## 🎯 Game Rules
- Objective: Predict whether the sum of three six-sided dice will be Over 7.5 or Under 7.5

### Winning Conditions:

- Over 7.5: Wins if total sum is 8-18

- Under 7.5: Wins if total sum is 3-7

- Bet Range: 20 - 1000 KSH

- Payouts: Based on probability-based multipliers

## 🏗️ Project Structure
src/
├── components/
│   ├── MainDice.tsx              # Main game controller and container
│   ├── DiceBetControls.tsx       # Bet amount controls and Over/Under selection
│   ├── DiceBetHistory.tsx        # Bet history display (placeholder for API integration)
│   ├── DiceCanvas.tsx            # 3D dice animation canvas
│   ├── DicePopUp.tsx            # Win/Loss result popup
│   ├── DiceRollHowToPlay.tsx    # Game instructions overlay
│   ├── DiceRollSettingsDialog.tsx # Sound and help settings
│   └── ProgressBar.tsx          # Visual Over/Under progress indicator
├── hooks/
│   ├── useCanvasImages.ts       # Image preloading for Canvas
│   ├── useDiceCanvasLogic.ts    # 3D dice rendering logic
│   ├── useDiceSound.ts          # Audio control hook
│   └── useDiceWebSocket.ts      # WebSocket connection management
├── utils/
│   └── types.ts                 # TypeScript type definitions
└── assets/
├── img/                     # Game images and dice faces
└── dice-styles.css          # Game-specific styles

# 🚀 Quick Start
## Prerequisites
Node.js 18+
WebSocket backend connection

## Installation
``` bash
git clone <repo-url>
cd dice-roll-game
npm install
npm run dev
Environment Variables
Create a .env file in the root directory:

text
VITE_WS_URL=wss://your-websocket-endpoint
```

## 📜 Available Scripts
```bash
npm run dev 

npm run build 

npm run lint 

npm test 
```

## 🎮 Game Flow
- Set Bet Amount: Choose from preset buttons or use +/- controls

- Make Prediction: Select "Over 7.5" or "Under 7.5"

- Roll Dice: System rolls three virtual dice

- Calculate Result: Sum is calculated and compared to prediction

- Show Outcome: Animated dice reveal with result popup

- Update Balance: Winnings added or bet amount deducted

- Reset: Game resets for next round

## 📄 Component Documentation
### MainDice.tsx
- Primary game controller

#### Responsibilities:

- Manages game state (active, spinning, outcomes)

- Handles WebSocket communication

- Controls audio playback

- Manages UI state (popups, settings, help)

- Tracks game history and balance

- Key State Variables:

##### diceGameActive: 
  - Whether a game round is in progress

##### diceIsSpinning: 
- Dice animation state

##### DiceOutcomeSum:
- Total sum of three dice

##### diceOutcome: 
- Individual dice values array

##### balance: 
- Current player balance

### DiceCanvas.tsx
- 3D dice animation component

### Features:

- Canvas
-- based 3D dice rendering

- Animated spinning and settling effects

- Dynamic lighting and gradient effects

- Real-time dice face mapping

- Machine visual states (active/inactive)

#### Props:

##### diceGameActive: 
- Controls machine visual state

##### diceIsSpinning: 
- Triggers spinning animation

##### DiceOutcomeSum: 
- Displays total in center

##### diceOutcome: 
- Array of dice face values

### DiceBetControls.tsx
- Bet management interface

#### Features:

- Preset bet amount buttons

- Manual +/- controls with validation

- Over/Under selection buttons

- Bet history integration

#### Props:

- OnChangeBetAmount: Bet amount setter

- diceBetAmount: Current bet value

- OnSetGame: Game start handler

#### DiceBetHistory.tsx
#### Bet history display

##### Features:

- Configurable history display (0/3/5 entries)

- Placeholder for API integration

- Table-based history presentation

#### DiceRollHowToPlay.tsx
- Interactive game instructions

#####  Content:

- Step-by-step gameplay guide

- Rules and winning conditions

- Payout explanations

- Support information

#### DiceRollSettingsDialog.tsx
- Game settings panel

##### Features:

- Sound toggle (ON/OFF)

- Help panel launcher

- Click-outside-to-close behavior

#### ProgressBar.tsx
- Visual prediction indicator

##### Features:

- Dynamic gradient based on selection

- Value markers (3, 7.5, 18)

- Active state highlighting

- 🔊 Audio System
Custom Hook: useDiceAudioControl(isMuted, loopEnabled)

##### Sound Types:

- playDiceLoop(): Continuous dice rolling sound

- playDiceSound("WinSnd"): Win celebration

- playDiceSound("LoseSnd"): Loss indication

##### Implementation:

- Uses Web Audio API for precise timing

- Supports loop and one-shot sounds

- Respects mute toggle from settings

### 🌐 WebSocket Communication
Outgoing Data
typescript
interface DiceSendData {
msisdn: string;      // Player identifier
option: "OVER" | "UNDER";  // Player prediction
amount: number;      // Bet amount
}
Incoming Response
typescript
interface DiceResultsData {
dices: number[];     // Array of three dice values [1-6]
diceTotal: number;   // Sum of dice values
option: string;      // Player's chosen option
outcome: string;     // Actual outcome
winnings: string;    // Amount won
Multiplier: number;  // Payout multiplier
Balance: string;     // Updated balance
}
### Connection Flow
- Connect: DiceConnectSocket() establishes WebSocket connection

- Send: sendDiceData() transmits bet data

- Receive: Message listener processes server response

- Update: UI updates based on response data

- Disconnect: Cleanup on component unmount

### 🎨 Animation System
- 3D Dice Rendering
- Technique: 2D Canvas with simulated 3D projection

- Rotation: X and Y axis rotation for realistic rolling

- Textures: Preloaded dice face images for each side

- Lighting: Gradient overlays and glow effects

- Visual States
- Idle: Static dice with sum display

- Spinning: Animated rotation with blur effect

- Settling: Final rotation to show outcome

- Result: Plus signs between dice showing sum

### Canvas Layers
- Background: Machine base image

- Lights: Animated glow effects

- Dice: 3D cubes with textures

- Overlays: Gradient fills and text

- Machine State: Active/inactive machine visuals

### 🧠 Game Logic
Dice Calculation
javascript
``` bash 
// Three dice values between 1-6
const diceValues = [random(1,6), random(1,6), random(1,6)];
const total = diceValues.reduce((a, b) => a + b, 0);

// Determine outcome
const outcome = total >= 8 ? "OVER" : "UNDER";
const playerWins = playerPrediction === outcome;
Multiplier System
Under 7.5: Higher multipliers (less probable)

Over 7.5: Lower multipliers (more probable)

Exact Values: Special multipliers for specific totals

Bet Validation
Minimum bet: 20 KSH

Maximum bet: 1000 KSH

Step increment: 10 KSH

Balance validation before game start
```

### 🎨 Styling System
- CSS Architecture
- Component-scoped: Each component has dedicated CSS

- CSS Variables: Consistent color scheme via root variables

- Gradients: Dynamic gradient backgrounds for visual appeal

- Animations: CSS keyframes for smooth transitions

### Key Visual Elements
- Gradient Buttons: Over (blue gradient) vs Under (purple gradient)

- Glow Effects: Active state indicators

- Progress Bar: Visual prediction meter

- Canvas Overlays: Semi-transparent effects

### 🔧 Development Notes
- Performance Optimizations
- Image Preloading: All dice faces preloaded before rendering

- Canvas Optimization: requestAnimationFrame for smooth animations

- State Batching: Combined state updates to reduce re-renders

- WebSocket Management: Single connection with cleanup

### Extensibility Points
- New Game Modes: Add prediction options (Odd/Even, Specific Numbers)

- Enhanced History: API integration with pagination

- Themes: Multiple visual themes

- Multiplayer: Player vs Player mode

- Tournaments: Competitive leaderboards

### Known Limitations
- Mobile touch events need optimization

- High-resolution dice textures could improve visual quality

- Offline mode not supported (requires WebSocket)

- No progressive web app features

### 🧪 Testing
- Run unit tests:

``` bash
npm test
Test Coverage:

Component rendering

Game logic calculations

State management

WebSocket mock testing

Canvas rendering utilities
``` 
### 🔮 Future Enhancements
- Planned Features
- Live Leaderboards: Real-time player rankings

- Achievement System: Unlockable badges and rewards

- Social Features: Share results, challenge friends

- Advanced Statistics: Win rate, hot/cold streaks

- Custom Dice Skins: Purchasable visual themes

### Technical Improvements
- WebGL Migration: 3D rendering for better visuals

- Service Worker: Offline capability for UI

- Animation Library: GSAP for complex animations

- State Management: Zustand/Redux for complex state

### 📱 Responsive Design
#### Breakpoints:

- Desktop: 1024px+ (full canvas experience)

- Tablet: 768px-1023px (scaled canvas)

- Mobile: <768px (optimized controls, simplified canvas)

- Touch Optimizations:

- Larger touch targets for mobile

- Swipe gestures for bet adjustment

- Haptic feedback support

#### Orientation handling

##### 🔒 Security Considerations
- Input Validation: All user inputs sanitized

- WebSocket Security: WSS for production

- Balance Protection: Server-side validation

- Rate Limiting: Prevents rapid betting

- Data Privacy: No personal data stored client-side

### 🚀 Deployment
- Build Process
```bash
npm run build
Output:

Optimized production build

Minified CSS and JavaScript

Compressed assets

Cache-busted file names
```
### Hosting Recommendations
- Static Hosting: Vercel, Netlify, AWS S3

- WebSocket Server: Node.js with ws library

- Database: PostgreSQL for user data

- CDN: For asset delivery

### 👥 Contributing
- Fork the repository

- Create a feature branch

- Commit changes with descriptive messages

- Push to your branch

- Submit a Pull Request

- Guidelines:

- Follow existing code style

- Add tests for new features

- Update documentation

- Ensure responsive compatibility

## 📄 License
This project is proprietary / demo-ready. Reuse or modification depends on project agreement.

## 📞 Support
For issues or questions:

- Check the How to Play section

- Review game rules

- Contact support team
0791847766

