# cashback


Projeto Nodejs construído com arquitetura [serverless da AWS](https://aws.amazon.com/pt/serverless/) usando [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html).

## A Solução
* Nodejs escrito em javascript
* Arquitetura de código [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
* DB dynamodb
* AWS Serverless components
  * API Gateway
  * Lambda functions

## Como rodar no localhost
Este projeto usa AWS SAM, que usa docker para emular o ambiente da núvem.
Alguns recursos da stack ainda não funcionam corretamente localmente.

Ao executar o script npm abaixo, será criado dinamicamente o arquivo template.yaml e iniciado o sam local
```bash
 $ npm run serve:local
```
O arquivo [cashback.postman_collection.json](./cashback.postman_collection.json) é uma collection do postman contendo exemplos das chamadas

### Problemas conhecidos do SAM rodando localhost

O SAM não sobe uma imagem dynamoDB e não cria as tabelas automaticamente, para rodar este projeto localmente é necessário subir uma imagem manualmente e criar as tabelas:

Subir imagem dynamoDB
```bash
$ docker run -p 8000:8000 amazon/dynamodb-local
```
Criar Tabelas
```bash
$ aws dynamodb create-table \
    --table-name Reseller \
    --endpoint-url http://localhost:8000\
    --attribute-definitions \
        AttributeName=ResselerId,AttributeType=S \
        AttributeName=email,AttributeType=S \
    --key-schema \
        AttributeName=ResselerId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --global-secondary-indexes \
      "[{
        \"IndexName\": \"byLogin\",
          \"KeySchema\":[
            {\"AttributeName\":\"email\", \"KeyType\": \"HASH\"}
            ],
          \"Projection\":{\"ProjectionType\": \"ALL\"},
          \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 10,
                    \"WriteCapacityUnits\": 5
                }
        }]"
```
```bash
$ aws dynamodb create-table \
    --table-name Ticket \
    --endpoint-url http://localhost:8000\
    --attribute-definitions \
        AttributeName=cpf,AttributeType=N \
        AttributeName=code,AttributeType=N \
    --key-schema \
        AttributeName=cpf,KeyType=HASH \
        AttributeName=code,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
```

## Testes
Os testes foram feitos usando [jest](https://jestjs.io/) e estão concentrados na pasta ```./__test__```, para executá-los basta rodar o comando
``` bash
 npm run test
 ```

Infelizmente não atingi coverage satisfatório nos testes pois estou com pouco tempo disponível nesses últimos dias, fiz o suficiente para mostrar que sei fazer mas... "sem desculpas, *'mea culpa'*".

## Documentação

*'My bad'* novamente, não consegui tempo para criar o swagger.
Por não ser uma aplicação Express, não foi possível usar [swagger-tools](https://www.npmjs.com/package/swagger-tools)
