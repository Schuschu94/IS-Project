#!/bin/bash
# Hyperledger Prerequisits installieren
curl -O https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh
chmod u+x prereqs-ubuntu.sh
./prereqs-ubuntu.sh

# Development Environment installieren
npm install -g composer-cli@0.20
npm install -g composer-rest-server@0.20
npm install -g generator-hyperledger-composer@0.20
npm install -g yo
npm install -g composer-playground@0.20
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./downloadFabric.sh
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh

# Installiere Network
cd $HOME
cd IS-Project/oshealthrec-network
composer archive create -t dir -n .
composer network install --card PeerAdmin@hlfv1 --archiveFile oshealthrec-network@0.0.1.bna
composer network start --networkName oshealthrec-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card

# REST Server einrichten
npm install -g passport-github
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "2e80edb9aac1beb5e0cf",
    "clientSecret": "19409ed971477475776611a5079a34d2ca0cc360",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "http://34.67.49.75?loggedIn=true",
    "failureRedirect": "/"
  }
}'

# Webserver installieren und einrichten
sudo apt install apache2
sudo apt-get install screen
cd $HOME/IS-Project
sudo cp -a oshealthrec-website/public/. /var/www/html
