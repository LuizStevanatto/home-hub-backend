import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './domain/exceptions/all-exceptions.filter';

async function bootstrap() {
  const port = process.env.PORT || 3333;

  // Cria a aplicação NestJS
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  // Configuração do Swagger com suporte para autenticação Bearer
  const config = new DocumentBuilder()
    .setTitle('API Home Hub') // Título da API
    .setDescription("<div>O escopo deste documento tem como objetivo apresentar de maneira detalhada todas as APIs " +
      "para integração Projeto Home Hub.<br/>" +
      "<br/>" +
      "<strong>Tecnologias / Ferramentas utilizadas</strong><br/><br/>" +
      "- Node JS<br/> " +
      "- Nest JS<br/> " +
      "- Postegre SQL<br/> " +
      "- TypeORM<br/><br/><div/>" +
      "<br/>" +
      "<strong>Contatos:</strong><br/>" +
      "Jonathan Kopezky: <a href='mailto:jonathan.kopezky@gmail.com'>jonathan.kopezky@gmail.com</a><br/>" +
      "Luiz Stevannato: <a href='mailto:luizstevanatto@hotmail.com'>luizstevanatto@hotmail.com</a><br/>" +
      "<br/>" +
      "Qualquer dúvida ou problema favor entrar em contato.<br/>") 
    .setVersion('1.0') 
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Formato do token JWT
      },
      'access-token', // Nome do esquema de segurança
    )
    .build();
  
  // Criação do documento Swagger
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Rota para acessar a documentação

  app.enableCors(); // Habilita CORS

  // Configuração de filtros e pipes globais
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  try {
    // Inicia o servidor
    await app.listen(port);
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err); // Log de erro mais claro
  }
}

bootstrap();
