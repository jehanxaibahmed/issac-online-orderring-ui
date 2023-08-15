FROM node:18.15

WORKDIR /app

# Update and upgrade packages 
RUN apt update && apt -y upgrade

# Install GIT
RUN apt install git -y

COPY ./package*.json /app/

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE 3000
EXPOSE 24678

ENV PATH ./node_modules/.bin/:$PATH
ENV NUXT_HOST=0.0.0.0