# QuizForge AI — Project Report & Architecture Overview

> **QuizForge AI** — Open-source AI-powered quiz generation and learning platform.  
> **Location:** `C:\Users\aviji\.gemini\antigravity\scratch\quizforge-ai`  
> **Status:** Production-ready frontend prototype with complete mock interactions, state persistence, and responsive UI.

---

## 1. Technology Stack

### Core Framework & Tooling
- **React 19 (JSX):** Modern component-based architecture using functional components and hooks (`useState`, `useEffect`, `useCallback`, `useRef`, `useContext`).
- **Vite 8:** Lightning-fast HMR, ES module bundling, and zero-config development server.
- **JavaScript (ES2022+):** Clean, standard JavaScript syntax throughout (no TypeScript overhead for fast prototyping).

### Styling & Design System
- **Tailwind CSS v4:** Modern CSS-first integration via `@tailwindcss/vite` and `@import "tailwindcss";` without legacy `tailwind.config.js` or `postcss.config.js`.
- **Theme & Colors:**
  - Background: Deep midnight navy (`#060918`)
  - Elevated surfaces: Layered card tiers (`#0b1124`, `#111827`)
  - Accent / Brand: Electric violet (`#7c3aed`, `#8b5cf6`, `#a78bfa`)
  - Secondary Highlights: Cyan (`#22d3ee`, `#67e8f9`)
  - Borders: Subdued navy-slate (`#1a2540`, `#243059`)
- **Typography:** `Inter` loaded from Google Fonts with standard 8px grid spacing, consistent radii (8px, 12px, 16px), subtle hover transitions, and custom slim scrollbars.

### Navigation & Routing
- **React Router DOM v7:** SPA routing powered by `BrowserRouter`, `Routes`, `Route`, `Outlet`, `useNavigate`, `useLocation`, and `useParams`.

### Data Visualization & Icons
- **Recharts:** Responsive SVG data charts (`LineChart`, `BarChart`, `CartesianGrid`, `Tooltip`, `ResponsiveContainer`, `Cell`).
- **Lucide React:** Consistent icon iconography throughout all navigation links, buttons, inputs, metrics, and modals.

### State & Storage
- **React Context API (`QuizContext`):** Unified reactive state for all quizzes, attempt histories, and user settings.
- **Browser LocalStorage (`storage.js`):** Fail-safe persistence layer wrapped in `try/catch` so quizzes, attempts, and configuration survive reloads.

---

## 2. Directory & File Structure

```
quizforge-ai/
├── index.html                           # HTML shell with Google Fonts (Inter)
├── vite.config.js                       # Vite configuration with Tailwind CSS v4 plugin
├── package.json                         # Dependencies & dev scripts
├── REPORT.md                            # Complete stack & feature report (this file)
└── src/
    ├── main.jsx                         # React root mount
    ├── App.jsx                          # Router configuration & QuizProvider wrapper
    ├── index.css                        # Tailwind v4 import, scrollbars & responsive CSS
    ├── context/
    │   └── QuizContext.jsx              # Global state provider for quizzes, attempts & settings
    ├── data/
    │   └── mockQuizzes.js               # Seed quizzes, question templates & activity data
    ├── lib/
    │   ├── storage.js                   # LocalStorage read/write persistence utilities
    │   └── quizUtils.js                 # Scoring algorithms, timer, ID gen & formatting
    ├── components/
    │   ├── layout/
    │   │   ├── AppShell.jsx             # Persistent responsive layout shell
    │   │   ├── Sidebar.jsx              # Active nav links, branding & GitHub links
    │   │   └── TopBar.jsx               # Breadcrumbs, notifications & profile dropdown
    │   ├── dashboard/
    │   │   ├── StatCard.jsx             # KPI metric cards with trend indicators
    │   │   ├── ActivityChart.jsx        # Recharts weekly activity bar chart
    │   │   └── RecentQuizCard.jsx       # Compact recent quiz item with status badges
    │   └── ui/
    │       ├── Button.jsx               # Reusable button with 5 variants & 4 sizes
    │       ├── Badge.jsx                # Difficulty, Subject, and Score badges
    │       ├── Card.jsx                 # Styled container card with hover states
    │       ├── Input.jsx                # Accessible labeled input with error feedback
    │       ├── Modal.jsx                # Accessible modal dialog with backdrop
    │       └── EmptyState.jsx           # Zero-data fallback component
    └── pages/
        ├── Dashboard.jsx                # Main analytics overview, KPIs & quick actions
        ├── CreateQuiz.jsx               # Quiz generator (Topic vs Study Material modes)
        ├── TakeQuiz.jsx                 # Interactive quiz player with timer & progress
        ├── Results.jsx                  # Detailed score ring, review & explanations
        ├── MyQuizzes.jsx                # Search, filter, launch, and delete quizzes
        ├── QuizHistory.jsx              # Attempts table (desktop) & cards (mobile)
        ├── Analytics.jsx                # Detailed subject breakdown & score trends
        ├── Settings.jsx                 # User profile, theme, and quiz preferences
        └── NotFound.jsx                 # 404 error page
```

---

## 3. Implemented Pages & Core Features

### 1. Persistent App Shell (`components/layout/`)
- **Responsive Sidebar:** Collapsible off-canvas drawer on mobile, persistent on desktop (`lg:block`), with active route indicators, brand icon, and open-source GitHub callout.
- **Top Bar:** Dynamic title based on current route, notification bell with unread indicator and flyout panel, user avatar with dropdown menu (Profile, Settings, Sign Out), and mobile drawer toggle.

### 2. Dashboard (`/`)
- Welcoming edtech header: *"Turn what you learn into what you know."*
- **4 Live KPI Cards:**
  1. *Quizzes Created* (live count)
  2. *Quizzes Completed* (total attempts)
  3. *Average Score* (dynamic weighted percentage)
  4. *Study Streak* (streak counter)
- **Weekly Activity Chart:** Interactive Recharts bar visualization showing study habits per day.
- **Quick Action Cards:** Shortcuts to generate a new quiz, review mistakes, or inspect analytics.
- **Recent Quizzes:** Instant access to recently created or attempted quizzes.

### 3. Create Quiz (`/create`)
- **Mode 1: Topic Mode:**
  - Topic text input with real-time validation.
  - Optional Subject selector (Computer Science, Mathematics, Physics, History, etc.).
  - Clickable topic recommendation chips that instantly populate the field.
- **Mode 2: Study Material Mode:**
  - Notes / lecture text area with live character counter (up to 5,000 chars).
- **Quiz Configuration:**
  - Difficulty: *Easy*, *Medium*, *Hard*.
  - Question Count: *5*, *10*, *15*, *20*.
  - Question Type: *Multiple Choice*.
  - Timer: Toggle switch to enable countdown challenges.
- **AI Generation Simulation:** 1.8-second realistic generation state with loading spinner and direct redirect to the quiz.

### 4. Take Quiz (`/quiz/:id`)
- Real-time progress bar and "Question X of Y" counter.
- Active countdown timer (when enabled) with auto-submission upon expiration.
- Single-question display with 4 selectable radio options (A, B, C, D) and check indicator.
- Previous / Next buttons preserving user answer state across navigation.
- Color-coded question navigator strip for fast jumping between answered/unanswered questions.
- Pre-submission confirmation modal showing count of unanswered questions.
- Dynamic scoring engine computing score against the answer key.

### 5. Results & Explanations (`/results/:id`)
- Circular SVG percentage score ring with dynamic stroke animation and threshold-based color coding.
- Score breakdown: Total Correct, Total Incorrect, and Elapsed Time.
- Encouraging contextual feedback (e.g., *"Outstanding!"*, *"Great Work!"*, *"Good Effort!"*).
- Full question-by-question review:
  - Green checkmark for correct, red X for incorrect.
  - Highlights correct option and user's chosen option.
  - In-depth explanation callout for every question.
- Action buttons: *Dashboard*, *Retry Quiz*, *New Quiz*.

### 6. My Quizzes (`/quizzes`)
- Search bar filtering by title and topic.
- Subject filter dropdown and Difficulty filter dropdown.
- Active filter counter with a single-click "Clear filters" action.
- Quiz cards with metadata, date, question count, and status badge.
- Actions per card: *Start / Review / Retry* and *Delete*.
- Delete confirmation modal dialog to avoid accidental removals.

### 7. Quiz History (`/history`)
- Historical attempts chronologically sorted.
- Responsive presentation: High-density data table on desktop and compact card view on mobile.
- Shows date, quiz title, subject badge, difficulty badge, score percentage, correct ratio, time spent, and a "View" button reopening the full result review.

### 8. Analytics (`/analytics`)
- High-level KPI summary (Total Attempts, Average Score, Best Score, Total Created).
- **Score Trend:** 6-week line chart visualizing score improvement over time.
- **Accuracy by Subject:** Horizontal bar chart comparing proficiency across domains.
- **Difficulty Distribution:** Color-coded distribution bar chart (Easy, Medium, Hard).
- **Study Activity:** Progress bars tracking study sessions over the past month.

### 9. Settings (`/settings`)
- **Profile:** Editable Display Name and Email address.
- **Appearance:** Dark / Light theme selection with notification on dark-first default.
- **Quiz Preferences:** Default difficulty, default question count, and default timer state.
- **Notifications:** Toggles for streak reminders and score milestones.
- **Persistence:** LocalStorage sync with animated "Saved!" confirmation banner.

---

## 4. Quality & Compliance Checklist

- [x] **Zero broken links / buttons:** Every button has an active handler or route.
- [x] **State preservation:** Navigating back and forth during a quiz retains selected answers.
- [x] **Zero console errors:** Clean build with compatible Tailwind v4 Vite setup.
- [x] **Accessible UI:** Semantic labels, `focus-visible` styling, ARIA switch and radio roles.
- [x] **Responsive design:** Tested layouts for mobile, tablet, and desktop viewports.

---

## 5. Next Steps for Backend / Supabase Integration

1. **Authentication:** Integrate `@supabase/supabase-js` for user registration, magic link, and OAuth login.
2. **Database:** Replace `localStorage` with Supabase PostgreSQL tables (`quizzes`, `questions`, `options`, `attempts`).
3. **Row Level Security (RLS):** Enforce strict user-level ownership on all quiz resources.
4. **Serverless AI Generation:** Replace `generateMockQuiz()` in `quizUtils.js` with a secure Supabase Edge Function that calls Gemini or OpenAI APIs without exposing client-side API secrets.
