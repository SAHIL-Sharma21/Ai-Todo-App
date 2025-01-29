# AI-Powered TODO CLI with Gemini 🌟🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PNPM](https://img.shields.io/badge/maintained%20with-pnpm-cc3534.svg)](https://pnpm.io/)

A smart command-line TODO list manager powered by Google Gemini AI, featuring natural language understanding and persistent storage with PostgreSQL.


## Features ✨

- 🧠 **AI-Powered Task Management** - Interact using natural language
- 📝 **CRUD Operations** - Create, Read, Update, Delete todos
- 🔍 **Smart Search** - Fuzzy search using ILIKE queries
- 💾 **Persistent Storage** - PostgreSQL database with Drizzle ORM
- 🔄 **Conversational Workflow** - PLAN → ACTION → OBSERVATION pattern
- 🛠 **Type Safe** - Built with modern Javascript practices

## Tech Stack 🛠️

| Component               | Technology                          |
|-------------------------|-------------------------------------|
| **AI Engine**           | Google Gemini 1.5 Flash             |
| **Backend**             | Node.js + Javascript                |
| **Database**            | PostgreSQL + Drizzle ORM            |
| **Package Manager**     | pnpm                                |
| **CLI Interface**       | readline-sync                       |

## Prerequisites 📋

- Node.js v18+
- PostgreSQL 14+
- Google Gemini API key
- pnpm (`npm install -g pnpm`)

## Installation ⚡

1. **Clone the repository**
```bash
git clone https://github.com/SAHIL-Sharma21/Ai-Todo-App.git
cd Ai-Todo-App
```
2. **Install dependencies**
```bash
pnpm install
```
3. **Configure environment variables**
```bash
cp .env.example .env
```
Edit the `.env` file with your Google Gemini API key.
```bash
GOOGLE_API_KEY=YOUR_API_KEY
DATABASE_URL=postgresql://user:password@localhost:5431/postgres
```
4. **Database setup**
```bash
pnpm generate
pnpm migrate
pnpm studio #to open the drizzle studio
```

## Usage 🚀

5. **Run the application**
```bash
pnpm start
```

# Example Interactions:
```bash
>> "Add buy milk to my shopping list"
🤖: Your todo has been added successfully!

>> "Show all my shopping tasks"
🤖: Here are your matching todos:
    1. [ID: 5] Buy milk for weekly shopping
    2. [ID: 8] Purchase new shopping bags

>> "Delete task number 5"
🤖: Todo ID 5 has been deleted
```

# Contributing 🤝
1. Fork the repository

2. Install dependencies with pnpm install

3. Create your feature branch (`git checkout -b feature/amazing-feature`)

4. Commit your changes

5. Push to the branch (`git push origin feature/amazing-feature`)

6. Open a Pull Request

# License 📜
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgments 🙏
- Google Gemini API team
- Drizzle ORM maintainers
- OpenAI for initial inspiration

# Contact 📧
If you have any questions or feedback, please don't hesitate to reach out to me at [SAHIL-Sharma21](https://github.com/SAHIL-Sharma21)

# Thank you for using AI-Powered TODO CLI with Gemini! 🌟🤖