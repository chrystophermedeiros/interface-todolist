<p align="center">
  <a href="https://nextjs.org/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="120" alt="Next.js Logo" />
  </a>
</p>

<p align="center">Um framework <a href="https://nodejs.org" target="_blank">Node.js</a> moderno e poderoso para criar aplicações web rápidas e escaláveis.</p>

<p align="center">Documentação do <a href="https://nextjs.org/docs" target="_blank">Next.js</a>.</p>



# 📌 Interface To-Do List

A interface da To-Do List foi projetada para proporcionar uma experiência intuitiva e eficiente na organização de tarefas diárias. Com um design minimalista e responsivo, ela permite que os usuários adicionem, editem e removam tarefas com facilidade.

## 🚀 Instalação e Configuração

### 1️⃣ Instalação do Node.js

Para executar a Interface To-Do List, é necessário ter o Node.js instalado na versão **18 ou superior**. Siga os passos abaixo para instalar o Node.js no seu sistema:

1. **Baixar o Instalador**:
   - Acesse a [página de download do Node.js](https://nodejs.org/en/download/) e escolha a versão recomendada para a maioria dos usuários (LTS) ou a versão mais recente.

2. **Executar o Instalador**:
   - Após o download, execute o instalador e siga as instruções na tela. Certifique-se de marcar a opção que adiciona o Node.js ao PATH.

3. **Verificar a Instalação**:
   - Após a instalação, abra o terminal ou Prompt de Comando e execute os seguintes comandos para verificar se o Node.js e o npm (gerenciador de pacotes do Node.js) foram instalados corretamente:
     ```bash
     node -v
     npm -v
     ```

### 2️⃣ Clonar ou Download do Repositório  
```bash
$ git clone https://github.com/chrystophermedeiros/interface-todolist.git


Depois que clonar digite interface-todolist para entrar na pasta: 
```bash
$ cd interface-todolist
```

```bash
$ cd interface-todolist
```

Download:
```bash
$ https://github.com/chrystophermedeiros/interface-todolist/archive/refs/heads/main.zip
```

Depois que baixar extrai o arquivo na pasta desejada e logo em seguida abra com VSCode

### 3️⃣ Instalar as Dependências
```bash
$ npm install
```

### 5️⃣ Configurar Variáveis de Ambiente
Renomeie o arquivo `.env.example` para `.env`:
```bash
$ mv .env.example .env
```
O arquivo já contém os valores de exemplo para facilitar a configuração ou se desejar pode ficar a vontade para modificar.


### 6️⃣ Rodar Aplicação  
```bash
# Modo desenvolvimento
$ npm run dev

# Modo de produção
$ npm run build
$ npm start

```

## Testes Automatizados

Será adcionado posteriomente


## 📚 Documentação notion

Para mais detalhes sobre a Interface To-Do List, consulte a documentação completa disponível no Notion:

[Documentação da Interface To-Do List](https://www.notion.so/To-Do-List-1a1970cffeb88074ba67ce0fe4c85fa8?pvs=4)

## 📖 Documentação da Interface To-Do List  

A interface da To-Do List foi projetada para proporcionar uma experiência intuitiva e eficiente na organização de tarefas diárias. Com um design minimalista e responsivo, ela permite que os usuários adicionem, editem e removam tarefas com facilidade. A documentação inclui as seguintes seções:  

- **Jornada do Usuário**: Descrição das interações do usuário com a interface da aplicação, incluindo o fluxo de tarefas: adicionar, editar, marcar como concluída e remover.  
- **Requisitos Funcionais (RF's)**:  
  - Adicionar uma nova tarefa.  
  - Editar uma tarefa existente.  
  - Remover tarefas.  
  - Marcar tarefas como concluídas.  
  - Filtra tarefa por nome ou status.  
- **Regras de Negócio (RN's)**:  
  - Uma tarefa deve ser única e não pode ser duplicada por usuario.  
  - Uma tarefa concluída deve ser destacada de forma diferente na interface.  
  - As tarefas devem ser exibidas de forma clara e acessível em dispositivos móveis e desktops.  
- **Requisitos Não Funcionais (RNF's)**:  
  - A interface deve ser responsiva e se adaptar a diferentes tamanhos de tela.  
  - A aplicação deve ter um tempo de carregamento rápido para garantir uma boa experiência do usuário.  
  - A interface deve ser acessível, com contraste adequado e navegação facilitada para usuários com necessidades especiais
  - Tema para alterna entre modeo claro e escuro.  
- **Design da Interface**:  
  - **Estrutura**:  
    - Tela principal exibe a lista de tarefas com opções de adicionar, editar, concluir e remover tarefas.  
    - Filtros para visualizar tarefas concluídas, pendentes e todas.  
  - **Componentes Visuais**:  
    - Botões para adicionar, editar e remover tarefas.  
    - Ícones que indicam o estado de conclusão das tarefas.  
  - **Padrões de UI/UX**:  
    - Design minimalista com foco na simplicidade e clareza.  
    - Cores suaves e ícones intuitivos para facilitar a navegação.  

Essa documentação fornece uma visão abrangente para desenvolvedores e usuários, facilitando a compreensão e utilização da interface da To-Do List.  



## 📦 Extensões do VSCode Utilizadas

Para facilitar o desenvolvimento e garantir a qualidade do código, as seguintes extensões do Visual Studio Code foram utilizadas:

- **ESLint**: Ferramenta para identificar e corrigir problemas no código JavaScript e TypeScript, ajudando a manter a consistência e a qualidade do código.
- **Prettier**: Um formatador de código que garante que o código esteja sempre formatado de maneira consistente, independentemente de quem o escreve.

Certifique-se de instalar essas extensões para um desenvolvimento mais eficiente!


## 🛠 Tecnologias Utilizadas

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-brightgreen?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Yup](https://img.shields.io/badge/Yup-00B5A6?style=for-the-badge&logo=yup&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![React-Toastify](https://img.shields.io/badge/React--Toastify-FF7B00?style=for-the-badge&logo=react&logoColor=white) ![React-Form](https://img.shields.io/badge/React--Form-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Cookies](https://img.shields.io/badge/Cookies-FFE600?style=for-the-badge&logo=react&logoColor=white)



## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](https://github.com/chrystophermedeiros/interface-todolist/blob/main/LICENSE) para mais detalhes.

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/chrystopher-medeiros/" title="Linkedin">
        <img src="https://avatars.githubusercontent.com/u/91420438?v=4" width="100px;" alt="Foto do Chrystopher Medeiros no GitHub"/><br>
        <sub>
          <b>Desenvolvedor Front-End</b>
          <br>
          <b>Chrystopher Medeiros</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


