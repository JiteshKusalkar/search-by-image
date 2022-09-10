# Project Setup

## Description

The app allows uploading an image of dog which it uses to determine its breed
shows it in a preview. Furthermore, it searches for the images of the dogs
matching the breed of the dog in the uploaded image

## Requirements and Setup

### Prerequisite

**Node**: 12 **npm**: >=6.13.4

### Setup

- Create `.env.development` file in the root directory with the following
  environment variables:

```
NODE_ENV=development
BASE_URL=https://dog.ceo/api
```

- On root directory, run command `npm run start` to start the app.
- To run the test suite, run command `npm run test`.

## Tech stack

- React: Main library
- React Query: To handle async calls via hooks
- Axios: To consume async APIs
- Tensorflow: AI model to predict the contents of an image
- React window: To lazy load images only in rendered window.
