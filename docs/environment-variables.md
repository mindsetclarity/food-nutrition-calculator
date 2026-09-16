# Environment Variables

| Variable Name | Required / Optional | Server / Client | Purpose | Example Placeholder | Notes |
|---|---|---|---|---|---|
| `USDA_API_KEY` | Required | Server | USDA FoodData Central API search | `your_usda_api_key_here` | Get this from `fdc.nal.usda.gov` |
| `LLM_PROVIDER` | Optional | Server | Chooses which LLM provider to use | `mock` | Defaults to `mock` if not set. |
| `LLM_TIMEOUT_MS`| Optional | Server | Time to wait for parser | `15000` | |
| `GEMINI_API_KEY`| Optional | Server | Gemini parsing model | `your_gemini_api_key_here` | |
| `OPENAI_API_KEY`| Optional | Server | OpenAI parsing model | `your_openai_api_key_here` | |
| `DEEPSEEK_API_KEY`| Optional | Server | Deepseek parsing model | `your_deepseek_api_key_here` | |

**Security Note:** Never commit actual API keys to GitHub. Use `.env.local` for local development.
