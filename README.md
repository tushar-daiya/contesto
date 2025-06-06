# Contesto
**Contesto** is a web app that brings together all coding contests from Codeforces, CodeChef, and LeetCode in one unified platform. Whether you're a competitive programmer or just starting out, Contesto helps you stay updated, bookmark your favorite contests, and even set Google Calendar reminders — all from a single dashboard.


## 🚀 Features
📅 All Upcoming Contests in One Place
View upcoming contests from Codeforces, CodeChef, and LeetCode with all relevant details like duration, start time, and platform.

🔖 Bookmark Contests
Save contests you're interested in with a single click and access them easily from your bookmarks section.

⏰ Google Calendar Reminders
Never miss a contest! Add any contest to your Google Calendar directly from the app.

📚 Past Contests Archive
Explore past contests fetched from official APIs of each platform for practice and analysis.

## 🧰 Tech Stack
**Frontend & Backend**: Next.js

**Database:** PostgreSQL using Prisma ORM

**Authentication**: Better Auth

**Deployment**: Vercel

CRON Job: Scheduled to run daily at 8:00 AM to fetch and update upcoming contests from all platforms.

## 🔄 Data Source & Updates
Upcoming Contests: Automatically fetched daily via a cron job at 8:00 AM and stored in the database.

Past Contests: Pulled from public APIs of Codeforces, CodeChef, and LeetCode during initial setup.

## 🛠 Setup & Installation
1. Clone the Repository
```
git clone https://github.com/your-username/contesto.git
cd contesto
```
2. Install Dependencies
```
pnpm install
```
3. Set Up Environment Variables
Create a .env file and include necessary values:
```env

DATABASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

4. Push Database Schema
```bash
pnpm run prisma:migrate
pnpm run prisma:generate
```

5. Run the Development Server
```bash
pnpm run dev
```
Open http://localhost:3000 to see the app.


## Contact
For any issues, suggestions, or contributions, feel free to open an issue or submit a pull request on GitHub.