#!/usr/bin/env bash
echo "Change nvm"
source ~/.profile
nvm use || { echo "Error changing node version"; exit 1; }

npm install

echo "Starting up on http://localhost:4200/"
ng serve || { echo "Error running local web"; exit 1; }
