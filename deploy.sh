#!/bin/bash

echo 'stopping docker container'
echo 'running: docker-compose down'
docker-compose down

echo 'building docker container'
echo 'running: docker-compose build'
docker-compose build

echo 'running docker container'
echo 'running: docker-compose up -d'
docker-compose up -d

chmod +X deploy.sh
