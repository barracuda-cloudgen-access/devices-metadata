
FROM node:lts-stretch

ARG DUMB_INIT_VERSION=1.2.1
ARG USER=user
ARG GROUP=user
ARG UID=1100
ARG GID=1100

ENV PATH /home/user/node_modules/.bin:$PATH
ENV FORCE_COLOR 1
ENV DEBIAN_FRONTEND noninteractive

RUN set -eux && \
    apt-get update && \
    apt-get install -y \
    default-jre &&\
    rm -rf /var/lib/apt/lists/* && \
    curl -L -o /usr/bin/dumb-init \
    https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 && \
    chmod +x /usr/bin/dumb-init && \
    groupadd -g $GID $GROUP && \
    useradd -d /home/user -m -u $UID -g $GID -s /bin/bash user

# -- yarn install in context
USER user

RUN set -eux && \
    mkdir -p /home/user/app

WORKDIR /home/user/app

COPY --chown=user:user yarn.lock package.json /home/user/app/

RUN set -eux && \
    echo "--modules-folder /home/user/node_modules" >> /home/user/app/.yarnrc && \
    yarn install

COPY --chown=user:user . /home/user/app/
