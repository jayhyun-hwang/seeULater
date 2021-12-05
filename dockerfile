FROM ubuntu:20.04
VOLUME ["/opt/seeulater"]
ADD . /opt/seeulater
EXPOSE 80
EXPOSE 3001
EXPOSE 3000
EXPOSE 443

# set timezone
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt update; \
    apt install -y tzdata;

# nvm, node, npm, pm2
RUN apt install -y curl; \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash; \
    . ~/.bashrc; \
    nvm install lts/gallium; \
    npm install pm2 -g; \
    pm2 install pm2-logrotate;
# etc
RUN apt install screen