FROM node:6

# Create open311-api directory
RUN mkdir -p /open311
WORKDIR /open311

# Variables
ENV NODE_ENV production
ENV DATABASE_HOST localhost
ENV DATABASE_NAME application
ENV DATABASE_USER root
ENV DATABASE_PASSWORD root
ENV DATABASE_PORT 3306
ENV DATABASE_DIALECT mysql
ENV DATABASE_STORAGE ./db.open311.sqlite
ENV LOGGING false
ENV SYSTEM_EMAIL open311@localhost


# Install
COPY package.json /open311
COPY gulpfile.js /open311
COPY ./src /open311/src

RUN npm install && npm run build && ./node_modules/.bin/gulp install_npm
COPY config-docker.json /open311/build/config.json
VOLUME /open311/media
# Add image configuration and scripts
ADD start.sh /start.sh
RUN chmod 755 /*.sh

EXPOSE 3000
CMD ["/start.sh"]
