FROM ubuntu:16.04

WORKDIR /imageBuilder
COPY imageBuilder.js .
RUN apt update && \
    apt install -y docker.io && \
    apt install npm -y && \
    apt install curl -y && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    apt install -y nodejs && \
    npm install && \
    apt-get purge -y --auto-remove curl && \
    rm -rf /var/lib/apt/lists/*
CMD ["node", "imageBuilder.js"] 

