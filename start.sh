#!/bin/bash

sed -i "s^__NODE_ENV__^$NODE_ENV^g" /open311/config.json
sed -i "s^__DATABASE_HOST__^$DATABASE_HOST^g" /open311/config.json
sed -i "s^__DATABASE_NAME__^$DATABASE_NAME^g" /open311/config.json
sed -i "s^__DATABASE_USER__^$DATABASE_USER^g" /open311/config.json
sed -i "s^__DATABASE_PASSWORD__^$DATABASE_PASSWORD^g" /open311/config.json
sed -i "s^__DATABASE_PORT__^$DATABASE_PORT^g" /open311/config.json
sed -i "s^__DATABASE_DIALECT__^$DATABASE_DIALECT^g" /open311/config.json
sed -i "s^__DATABASE_STORAGE__^$DATABASE_STORAGE^g" /open311/config.json
sed -i "s^__LOGGING__^$LOGGING^g" /open311/config.json
sed -i "s^__SYSTEM_EMAIL__^$SYSTEM_EMAIL^g" /open311/config.json
sed -i "s^__REMOTE_PORT__^$REMOTE_PORT^g" /open311/config.json

sed -i "s^__SMTP_HOST__^$SMTP_HOST^g" /open311/config.json
sed -i "s^__SMTP_PORT__^$SMTP_PORT^g" /open311/config.json
sed -i "s^__SMTP_USER__^$SMTP_USER^g" /open311/config.json
sed -i "s^__SMTP_PASSWORD__^$SMTP_PASSWORD^g" /open311/config.json
sed -i "s^__SMTP_CERT_CHECK__^$SMTP_CERT_CHECK^g" /open311/config.json
sed -i "s^__SMTP_DEBUG__^$SMTP_DEBUG^g" /open311/config.json
sed -i "s^__SEARCH_TOLERANCE_M__^$SEARCH_TOLERANCE_M^g" /open311/config.json

cd /open311
npm start
