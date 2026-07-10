# Gravity Protocol

Gravity Protocol is a decentralized finance (DeFi) landing page application designed for autonomous, on-chain mutual funds built on the Stellar network using Soroban smart contracts.

The interface presents a premium, dynamic web experience showcasing protocol architecture, live NAV tracking simulations, and automated portfolio rebalancing concepts. 

## 🚀 Features

- **Premium Design System**: Built with Tailwind CSS and Framer Motion for smooth, high-fidelity micro-interactions and scroll animations.
- **Interactive Dashboards**: Features a live simulated NAV tracking dashboard that visualizes portfolio rebalancing between assets (e.g., XLM and USDC).
- **Integrated Waitlist API**: Includes a functional Early Access waitlist modal that securely saves submissions directly to a local `waitlist.json` using a custom injected Vite middleware backend.
- **DeFi Architecture Flow**: Visual breakdowns of smart contract processes including Deposit & Mint, NAV Calculation, and Automated Rebalancing.
- **Responsive Architecture**: Fully mobile-optimized layouts using modern CSS grids and flexbox.

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Local API**: Express (injected via Vite dev server plugin)

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server:

```bash
npm run dev
```

This will spin up the Vite development server on `http://localhost:3000`. The server also includes the custom Express middleware which handles the `/api/waitlist` POST requests, saving data directly to `waitlist.json` without needing a separate backend instance.

### Build for Production

To create an optimized production build:

```bash
npm run build
```

You can preview the built static site using:

```bash
npm run preview
```

## 📂 Project Structure

```text
├── src/
│   ├── assets/          # Custom AI-generated DeFi aesthetics
│   ├── components/      # React functional components
│   │   ├── Navbar.tsx
│   │   ├── InteractiveDashboard.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── BigPicture.tsx
│   │   ├── WhyChooseArea.tsx
│   │   ├── Testimonial.tsx
│   │   ├── MapSuccess.tsx
│   │   ├── ContactModal.tsx
│   │   └── Footer.tsx
│   ├── App.tsx          # Main entry and Hero Section
│   ├── main.tsx         # React root rendering
│   └── index.css        # Core Tailwind imports and custom fonts
├── waitlist.json        # Output for early access submissions
├── vite.config.ts       # Vite config + Express backend plugin
└── package.json         # Project dependencies
```

## 📝 License
This project is open-source and available under the MIT License.
