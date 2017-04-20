FROM node:6

# Create open311-api directory
RUN mkdir /open311
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
ENV REMOTE_PORT 80
ENV SMTP_HOST localhost
ENV SMTP_PORT 25
ENV SMTP_USER smtpuser
ENV SMTP_PASSWORD smtppassword
ENV SMTP_CERT_CHECK false
ENV SMTP_DEBUG true
ENV SEARCH_TOLERANCE_M 10


# Install
ADD . /open311

RUN npm install .
COPY config-docker.json /open311/config.json
VOLUME /open311/media
# Add image configuration and scripts
ADD start.sh /start.sh
RUN chmod 755 /*.sh

EXPOSE 3000
CMD ["/start.sh"]
