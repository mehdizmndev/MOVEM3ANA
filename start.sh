#!/bin/bash

# ─── MOVEM3ANA Full-Stack Launcher ─────────────────────────────────
# Usage: bash start.sh
# Starts both the Laravel backend and the React/Vite frontend

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🚀 MOVEM3ANA — Full-Stack Launcher${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

php artisan config:clear
php artisan cache:clear
php artisan serve --host=0.0.0.0 --port=$PORT

# ─── Cleanup function ──────────────────────────────────────────────
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    echo -e "${GREEN}✅ All servers stopped.${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# ─── Check prerequisites ──────────────────────────────────────────
echo -e "\n${YELLOW}📋 Checking prerequisites...${NC}"

if ! command -v php &> /dev/null; then
    echo -e "${RED}❌ PHP is not installed or not in PATH${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed or not in PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✅ PHP and Node.js found${NC}"

# ─── Backend setup ─────────────────────────────────────────────────
echo -e "\n${YELLOW}⚙️  Setting up backend...${NC}"

# Install composer dependencies if needed
if [ ! -d "$BACKEND_DIR/vendor" ]; then
    echo -e "${CYAN}📦 Installing Composer dependencies...${NC}"
    (cd "$BACKEND_DIR" && composer install --no-interaction --quiet)
fi

# Create .env if it doesn't exist
if [ ! -f "$BACKEND_DIR/.env" ]; then
    echo -e "${CYAN}📄 Creating .env file...${NC}"
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    (cd "$BACKEND_DIR" && php artisan key:generate --quiet)
fi

# Handle SQLite if configured
if grep -q "DB_CONNECTION=sqlite" "$BACKEND_DIR/.env"; then
    if [ ! -f "$BACKEND_DIR/database/database.sqlite" ]; then
        echo -e "${CYAN}🗄️  Creating SQLite database...${NC}"
        touch "$BACKEND_DIR/database/database.sqlite"
    fi
fi

# Run migrations
echo -e "${CYAN}🗄️  Running database migrations...${NC}"
(cd "$BACKEND_DIR" && php artisan migrate --force --quiet 2>/dev/null) || true

# Seed database (only if users table is empty)
USER_COUNT=$(cd "$BACKEND_DIR" && php artisan tinker --execute="echo \App\Models\User::count();" 2>/dev/null | tail -1)
if [ "$USER_COUNT" = "0" ] || [ -z "$USER_COUNT" ]; then
    echo -e "${CYAN}🌱 Seeding database with demo data...${NC}"
    (cd "$BACKEND_DIR" && php artisan db:seed --force --quiet 2>/dev/null) || true
fi

# Create storage link
(cd "$BACKEND_DIR" && php artisan storage:link --quiet 2>/dev/null) || true

echo -e "${GREEN}✅ Backend ready${NC}"

# ─── Frontend setup ───────────────────────────────────────────────
echo -e "\n${YELLOW}⚙️  Setting up frontend...${NC}"

if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo -e "${CYAN}📦 Installing npm dependencies...${NC}"
    (cd "$FRONTEND_DIR" && npm install --silent)
fi

echo -e "${GREEN}✅ Frontend ready${NC}"

# ─── Start servers ─────────────────────────────────────────────────
echo -e "\n${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🏁 Starting servers...${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Start Laravel backend
echo -e "${YELLOW}🔧 Starting Laravel API server on http://localhost:8000${NC}"
(cd "$BACKEND_DIR" && php artisan serve --host=127.0.0.1 --port=8000) &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 2

# Start Vite frontend
echo -e "${YELLOW}⚡ Starting Vite dev server on http://localhost:5173${NC}"
(cd "$FRONTEND_DIR" && npm run dev) &
FRONTEND_PID=$!

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅ MOVEM3ANA is running!${NC}"
echo -e "${GREEN}  🌐 Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}  🔧 Backend API: http://localhost:8000/api${NC}"
echo -e "${GREEN}  📧 Demo login: lahcen@gmail.com / 123456${NC}"
echo -e "${GREEN}  🔑 Admin login: admin@tangier-sports.com / password${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}  Press Ctrl+C to stop all servers${NC}\n"

# Wait for both processes
wait