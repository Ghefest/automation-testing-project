# Use the official Node.js 20 image with Playwright dependencies
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /app

COPY package.json package-lock.json* tsconfig.json vitest.config.ts playwright.config.ts ./
COPY ./src ./src
COPY ./tests ./tests

RUN npm install

EXPOSE 5050

CMD ["npm", "run", "test:e2e"]