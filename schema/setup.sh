#!/bin/bash

clear

echo "Updating schema and seeding data..."

mysql -u root -p < setup.sql

echo "Complete..."
