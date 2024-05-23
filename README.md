# college-system

## Trabalho de Tópicos Especiais em Engenharia de Software

### Assuntos abordado na disciplina
Testes unitários, testes de integração e testes de sistema

### Descrição do trabalho:

- Construir um sistema de informação para cadastro, consulta, remoção e alteração de dados de acordo com o modelo abaixo.

- Desenvolver as seguintes funções de validação de dados:

  - data de nascimento do aluno: verificar se a idade está em um intervalo coerente.

  - matrícula do aluno: verificar se os 4 primeiros dígitos são coerentes com a data de matrícula na universidade.

  - data de início e fim do período: deve conter pelo menos 90 dias úteis. 

  - Cálculo do IRA total de um aluno (utilizando média ponderada onde os pesos são a carga horária da desciplina)

  - Cálculo do IRA de um período (utilizando média ponderada onde os pesos são a carga horária da desciplina)

  - (opcional) verificar se um aluno possui os pré-requisitos necessários para cursar uma disciplia. Obs.: será necessário modificar ligeiramente o modelo de dados abaixo.

### Modelo de dados:
![image](https://user-images.githubusercontent.com/49379758/218617030-dc1f8a9b-f8a0-4a8e-a4e7-40f74846dbc1.png)

### Professor
[Eduardo Kinder Almentero](https://github.com/ekalmentero)

## Inicializando a aplicação
```bash
# Clone o repostório
$ git clone <https://github.com/danvinicius/college-system>

# Entre no projeto pelo terminal
$ cd college-system

# Abra o editor de código
$ code .

# Instale as dependências
$ yarn install
or
$ npm install

# Crie um banco no MySQL chamado sistema_aluno_ufrrj

# Rode as migrations
$ npx prisma migrate dev

# Rode o script de inserção de dados de teste disponível em ./first_insertion.sql

# Inicie a aplicação em modo dev
$ yarn dev
or
$ npm run dev
