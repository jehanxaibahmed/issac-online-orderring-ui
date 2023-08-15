#!/usr/bin/env sh
# Abort on errors
set -e

echo 'Company Name' $1

# Throw an error if no company name was supplied
if [ $# -eq 0 ]
  then
    echo "No arguments supplied, please enter the company name to initialise"
    exit 1
fi

# Stop our current site
pm2 stop $1-cp3-fe-1

# Pull the changes
git pull origin master

# Install our dependencies
npm install

# Build the application to production in universal mode
npm run build

# Nuxt 3
pm2 start $1-cp3-fe-1