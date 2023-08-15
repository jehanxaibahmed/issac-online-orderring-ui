#!/usr/bin/env sh
# abort on errors
set -e

echo 'Company Name' $1

#Throw an error if no company name was supplied
if [ $# -eq 0 ]
  then
    echo "No arguments supplied, please enter the company name to initialise"
    exit 1
fi

git pull origin master

#install dependencies
npm install

# Build your application to production in universal mode
npm run build

# Nuxt 3
pm2 start 'node .output/server/index.mjs' --name "$1-cp3-fe-1"
pm2 save
pm2 start $1-cp3-fe-1