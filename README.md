# Project Setup

## Install dependencies
```zsh
brew install nvm
npm install --global yarn
npm i strapi -g  
```
Install doppler: https://docs.doppler.com/docs/install-cli
Install nvm: 

## Sync environment variables
```zsh
doppler login
doppler setup
```

## Configure node version
```zsh
nvm install
nvm use
```

## Populate environment variables
```zsh
yarn env #Pulls secrets from doppler
```

## Run project
```zsh
yarn install
yarn build
yarn develop
```

## Local email setup
```zsh
docker run -p 1080:1080 -p 1025:1025 maildev/maildev
```
