const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Toni Pizzeria',
    description: 'Toni Pizzeria API'
  },
  host: 'toni-pizzeria.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
