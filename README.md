# QuizForge AI

**QuizForge AI** is an AI-powered quiz-generation web application that helps users create and take quizzes on a chosen topic or from study material. It uses Google's Gemini model to generate questions and explanations, with Supabase providing the backend infrastructure.

## Features

- **AI quiz generation** using Gemini through a Supabase Edge Function.
- **Customizable quizzes** with a topic, difficulty, and question count.
- **Study-material mode** for generating questions from supplied text.
- **Multiple-choice questions** with four options, answer keys, and explanations.
- **Quiz-taking experience** with answer selection and optional timer.
- **Results and question review** to check answers and explanations.
- **Dashboard and quiz history** supported by the app's current client-side state and storage.

> Note: Features such as persistence across devices, user accounts, and production-grade abuse protection depend on backend configuration and may not be implemented in the current version.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Supabase (Edge Functions)
- Google Gemini API
- `lucide-react` icons

## How It Works

1. The user chooses a topic or enters study material.
2. The frontend calls the Supabase Edge Function named `generate-quiz`.
3. The Edge Function sends a request to Gemini and returns structured quiz data.
4. The user takes the quiz and views the score, correct answers, and explanations.

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project
- A Google AI Studio API key with access to the configured Gemini model

### 1. Clone the repository

```bash
git clone https://github.com/AvijitBhau/Quiz_Forge.git
cd Quiz_Forge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure frontend environment variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use the values from your Supabase project's API settings. Never commit `.env.local`.

### 4. Configure the Supabase Edge Function

Deploy the `generate-quiz` Edge Function to your Supabase project. Configure the Gemini API key as an Edge Function secret named:

```text
GEMINI_API_KEY
```

Keep the Gemini key on the server side. Do not add it to a `VITE_` variable or expose it in frontend code.

The function is expected to accept a request body similar to:

```json
{
  "topic": "Basics of neural networks",
  "difficulty": "Medium",
  "questionCount": 5
}
```

It should return a quiz object containing `title`, `topic`, `difficulty`, `questionCount`, and a `questions` array. Each question should include `question`, `options` (four strings), `correctAnswer` (zero-based option index from 0 to 3), and `explanation`.

### 5. Run the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### 6. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The frontend can be deployed to [Vercel](https://vercel.com/).

1. Import this GitHub repository into Vercel.
2. Select **Vite** as the framework preset if it is not detected automatically.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as environment variables.
4. Deploy the project.
5. If direct refreshes on React Router routes return 404, add a `vercel.json` rewrite to serve `/index.html` for application routes.

The Supabase Edge Function must be deployed separately and correctly configured.

## Security Notes

- Never commit `.env.local` or publish API secrets.
- Keep `GEMINI_API_KEY` in Supabase Edge Function secrets.
- Never expose a Supabase service-role key in browser code.
- Before public production use, configure authentication, request validation, rate limiting, and suitable database Row Level Security (RLS) policies.
- The current app may store quiz and attempt data in browser storage; verify database persistence separately if required.

## Project Structure

The repository's exact structure may evolve, but the main areas include:

```text
src/
  components/     Reusable UI components
  context/        React context and app state
  data/           Mock/sample quiz data
  lib/            Utilities and Supabase client
  pages/          Application pages
```

## Contributing

Contributions and suggestions are welcome. For changes:

1. Create a branch.
2. Make and test your changes.
3. Open a pull request describing the change.

## License

No license has been specified yet. Add a `LICENSE` file before distributing the project under an open-source license.
