# Student Portfolio Frontend Setup

1. Create the app:
   - `npx create-next-app@latest portfolio-app --typescript --tailwind --app`
2. Install UI dependencies:
   - `npm install lucide-react clsx`
3. Run development server:
   - `npm run dev`
4. Backend integration note:
   - Mock data currently lives in `lib/mockData.ts`.
   - Replace mock reads/writes with API requests once the Express backend is ready.
   - Example replacement points:
     - GET portfolio by username in `app/portfolio/[username]/page.tsx`
     - POST save action in `components/PortfolioForm.tsx`
