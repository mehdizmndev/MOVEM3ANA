#!/bin/bash

set -e

cd backend

echo "Clearing Laravel cache..."

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "Starting Laravel..."

php artisan serve --host=0.0.0.0 --port=${PORT:-8080}