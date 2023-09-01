const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Posts',
    description: 'This place has posts!',
  },
  host: '',
  schemes: [
    'http', 'http'
  ],
};

const outputFile = './src/router/swagger-output.json';
const endpointsFiles = ['./index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);