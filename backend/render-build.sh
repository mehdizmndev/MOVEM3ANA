#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Building project..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

echo "Running migrations..."
php artisan migrate --force

echo "Optimizing..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
