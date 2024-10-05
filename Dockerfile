# Required ENV variables: VITE_ENV, VITE_FRONT_URL, VITE_BACKEND_URL, etc.
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_DEV_URL
ARG VITE_DEV_MOBILE_BACKEND_URL
ARG VITE_URL

ENV VITE_DEV_URL=$VITE_DEV_URL
ENV VITE_DEV_MOBILE_BACKEND_URL=$VITE_DEV_MOBILE_BACKEND_URL
ENV VITE_URL=$VITE_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY scripts/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
