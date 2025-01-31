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


## Get Started 🚀

A CLI todo application powered by Google's Gemini AI and PostgreSQL.

To use App follow the below steps:
1. **Create a new directory and navigate to it**:
```bash
mkdir my-todo-app
cd my-todo-app
```
2. **Create a `.env` file**:
```bash
echo "GOOGLE_API_KEY=your-gemini-api-key-here" > .env
echo "DATABASE_URL=your-postgresql-url-here" >> .env

```
3. **Install and run the packages**:
```bash
npm i ai-todo-app
npx ai-todo-app

or 

#you can install package globally
npm i -g ai-todo-app
ai-todo-app
```
Or run it directly with environment variables:
```bash
GOOGLE_API_KEY=your-gemini-api-key-here DATABASE_URL=your-postgresql-url-here npx ai-todo-app
```

### Getting the Required Keys

1. **Gemini API Key**: Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. **PostgreSQL Database URL**: You can either:
   - Use a local PostgreSQL installation: `postgresql://username:password@localhost:5432/database_name`
   - Use a cloud service like Supabase, Railway, or Render
   - Format: `postgresql://username:password@host:port/database_name`


## CLI Output will look like this:
```bash
>> hey who are you?
🤖: Hello! I am your Personal TODO Handler.  How can I help you today?
>> can you tell me any todo left for me to do?
🤖: Currently, there are no tasks in your to-do list.
>> can you add one task as i have to debug the code for AI.
🤖: The task "debug the code for AI" has been added to your to-do list.
>> can i see the list of all my tasks
🤖: Your to-do list:

- debug the code for AI
>> ohk thank you!
🤖: You're welcome! Is there anything else I can assist you with?
```

Now you can start interacting with the AI-powered TODO app!

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