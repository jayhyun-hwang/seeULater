FROM ubuntu:20.04
VOLUME ["/opt/seeulater"]
ADD /webApp/ /opt/seeulater
RUN apt update; \
    apt install -y nodejs npm; \