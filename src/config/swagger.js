const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Home Hub',
      version: '1.0.0',
      description: "<div>O escopo deste documento tem como objetivo apresentar de maneira detalhada todas as APIs " +
                                    "para integração Projeto Home Hub.<br/>" +
                                    "<br/>" +
                                    "<strong>Tecnologias / Ferramentas utilizadas</strong><br/><br/>" +
                                    "- Node JS<br/> " +
                                    "- Next JS<br/><br/><div/>" +
                                    "<br/>" +
                                    "Qualquer dúvida ou problema favor entrar em contato com Jonathan e Luiz.<br/>",
      contact: {
        name: 'Seu Nome',
        email: 'seuemail@dominio.com',
        
      },
      servers: [
        {
          url: 'http://localhost:3000', // Substitua pela URL do seu servidor
        },
      ],
    },
  },
  apis: ['./src/app/user/*.ts'], // Para incluir todos os arquivos TypeScript
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
