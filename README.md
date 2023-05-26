
<div align="center">
<h1 align="center">
<img src="https://github.com/SynergizeAI/2800-202310-BBY10/blob/main/public/images/logo2.png?raw=true" width="100" />
<br>
Synergize.ai
</h1>
<h3 align="center">🚀 Developed with the software and tools below:</h3>
<p align="center">

<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white" alt="Axios" />
<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=OpenAI&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=for-the-badge&logo=Lodash&logoColor=white" alt="Lodash" />
<img src="https://img.shields.io/badge/Pusher-300D4F.svg?style=for-the-badge&logo=Pusher&logoColor=white" alt="Pusher" />
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Pinecone-ff6900.svg?style=for-the-badge&logo=Pinecone&logoColor=white" alt="Pinecone"/>
<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC.svg?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white" alt="TailwindCSS"/>
<img src="https://img.shields.io/badge/Next.JS-000000.svg?style=for-the-badge&logo=Next.js&logoColor=white" alt="Next.JS"/>
</p>

</div>

---

## 📚 Table of Contents
- [Table of Contents](#-table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [AI Implementation](#ai-implementation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#-contributing)
- [License](#-license)

---


## Overview

The Synergize.ai GitHub project is a ChatGPT-powered academic collaboration platform, designed to enhance communication, productivity, and prompt engineering in group projects. 

This user-focused tool has been constructed with technologies such as Next.js, React, and Typescript, ensuring a robust and prompt user experience. The project also furnishes an array of APIs and hooks for interface customization, accompanied by a comprehensive set of user-interface design components.

---

## Features

### Core Capabilities

1.  **User-Centric Design:** Our project emphasizes an intuitive user experience. The design is responsive, adapting effortlessly across different devices for a consistent, easy-to-navigate interface.
2.  **Flexible Architecture:** The project's architecture is modular and scalable, providing a suite of deployable features that cater to a diverse set of use cases, from individual chats to group discussions.
3.  **Secure Authentication:** We've implemented a robust authentication system to safeguard user data, complemented by a convenient password reset feature, to ensure utmost user security.
4.  **Comprehensive API Integration:** Our project integrates an array of APIs, equipping developers with potent tools for managing data, including a specific API designed for managing conversation threads effectively.
5.  **Embedded Chatbot:** We've incorporated a chatbot within the app. This chatbot enables users to ask questions relating to the chat history or any uploaded PDF file, enhancing interactivity and user engagement.
6.  **Efficient Data Management:** Our project uses a vector DB for efficient data collection and storage, handling data from various sources, be it external APIs or internal databases.
7.  **Smart Data Filtering:** The vectorDB also allows for advanced filtering mechanisms that streamline the sorting of large data volumes and ensure controlled access to databases, thereby protecting sensitive data.
8.  **Real-Time Updates:** Our project delivers up-to-the-minute information through real-time updates and supports push notifications for important event alerts, keeping users well-informed.
9.  **Adaptable Styling:** We've included a global styling library to facilitate rapid application customization by developers. This library also includes a dark mode feature, offering users a choice between light and dark themes.
10.  **Cross-Platform Compatibility:** The project is platform-agnostic, enabling seamless integration with a variety of systems. It supports a wide range of operating systems, browsers, and devices, ensuring hassle-free user access.

---


## AI Implementation

In our project, we've employed AI in a couple of crucial ways. Here, we'll specifically outline the AI services and products we used and how they've been utilized.

Our key approach to employing AI revolves around Language Learning Models (LLMs), focusing on the method known as "Retrieval Augmented Generation". This methodology enables the LLM to interact with documents that it has not been trained on directly.

Retrieval Augmented Generation consists of two major steps:

1.  Ingestion of documents into a queriable format
2.  Retrieval augmented generation chain

### Ingestion

To facilitate interaction between our LLM and your data, we first needed to transform the data into a suitable format - an Index. Creating an Index makes data more accessible and easier to interact with for any downstream tasks. We primarily used a Vectorstore Index in our application.

The ingestion process involved these steps:

1.  **Load Documents:** We utilized a Document Loader to pull in the required documents.
2.  **Split Documents:** A Text Splitter was used to break down the documents into manageable pieces.
3.  **Create Embeddings:** We then generated document embeddings with a Text Embedding Model.
4.  **Store Documents and Embeddings:** Finally, the documents and their corresponding embeddings were stored in a Vectorstore.

### Generation

Having our data in an Index format allows us to generate responses to user queries based on the available information. This process included these steps:

1.  **Receive User Question:** We first take in the user's query.
2.  **Lookup Relevant Documents:** We then query the index to find documents relevant to the user's question.
3.  **Construct a PromptValue:** Using a PromptTemplate, we assemble a PromptValue from the question and any relevant documents.
4.  **Pass the PromptValue to a Model:** We then feed this PromptValue into our LLM.
5.  **Return Results to the User:** Finally, the result is returned to the user.

This process makes it possible for the LLM chatbot within our app to handle user queries accurately and efficiently, providing valuable insights from the chat history or uploaded PDF files.

---

## Project Structure

<details closed><summary>Tree</summary>

```bash
.
├── app
│   ├── _actions
│   │   ├── getConversationById.ts
│   │   ├── getConversations.ts
│   │   ├── getCurrentUser.ts
│   │   ├── getMessages.ts
│   │   ├── getSession.ts
│   │   └── getUsers.ts
│   ├── (site)
│   │   ├── components
│   │   │   └── AuthenticationForm.tsx
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   ├── reset-password
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   │       └── route.ts
│   │   ├── conversations
│   │   │   ├── [conversationId]
│   │   │   │   ├── seen
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── forgot-password
│   │   │   └── route.ts
│   │   ├── messages
│   │   │   ├── _utils
│   │   │   │   ├── embedding.ts
│   │   │   │   ├── ingest.ts
│   │   │   │   ├── prompt.ts
│   │   │   │   ├── QA.ts
│   │   │   │   ├── query.ts
│   │   │   │   └── upsert.ts
│   │   │   └── route.ts
│   │   ├── register
│   │   │   └── route.ts
│   │   ├── reset-password
│   │   │   └── route.ts
│   │   └── settings
│   │       └── route.ts
│   ├── components
│   │   ├── inputs
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── Select.tsx
│   │   ├── sidebar
│   │   │   ├── DesktopSidebar.tsx
│   │   │   ├── MobileFooter.tsx
│   │   │   ├── NavItem.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── ActiveStatus.tsx
│   │   ├── Avatar.tsx
│   │   ├── AvatarGroup.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingModal.tsx
│   │   └── Modal.tsx
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── ToasterContext.tsx
│   ├── conversations
│   │   ├── [conversationId]
│   │   │   ├── components
│   │   │   │   ├── Body.tsx
│   │   │   │   ├── ConfirmModal.tsx
│   │   │   │   ├── Form.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── ImageModal.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── MessageBox.tsx
│   │   │   │   ├── MessageInput.tsx
│   │   │   │   └── ProfileDrawer.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── ConversationBox.tsx
│   │   │   ├── ConversationList.tsx
│   │   │   └── GroupChatModal.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── hooks
│   │   ├── useActiveChannel.ts
│   │   ├── useActiveList.ts
│   │   ├── useConversation.ts
│   │   ├── useOtherUser.ts
│   │   └── useRoutes.ts
│   ├── libs
│   │   ├── prismadb.ts
│   │   └── pusher.ts
│   ├── types
│   │   └── index.ts
│   ├── users
│   │   ├── components
│   │   │   ├── UserBox.tsx
│   │   │   └── UserList.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── button.tsx
│   ├── globals.css
│   └── layout.tsx
├── components
│   └── ui
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       └── dialog.tsx
├── lib
│   └── utils.ts
├── pages
│   └── api
│       └── pusher
│           └── auth.ts
├── prisma
│   └── schema.prisma
├── public
│   ├── images
│   │   ├── flo.png
│   │   ├── logo.png
│   │   └── placeholder.png
│   ├── next.svg
│   └── vercel.svg
├── .eslintrc.json
├── .gitignore
├── blueprint.md
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json

```
</details>

---


## Getting Started

### Prerequisites

Before you begin, ensure that you have completed the following prerequisites:
> * You have installed the latest version of [Node.js](https://nodejs.org/en/download/).
> * You have filled out the `.env.example` file and renamed it to `.env`.

### Installation

1. Clone the 2800-202310-BBY10 repository:
```sh
git clone https://github.com/SynergizeAI/2800-202310-BBY10
```

2. Change to the project directory:
```sh
cd 2800-202310-BBY10
```

3. Install the dependencies:
```sh
npm install
```

### Build the app

```sh
npm run build && node dist/main.js
```

### Run as dev
```sh
npm run dev
```

<hr />

---

## 🤝 Contributing
Contributions are always welcome! Please follow these steps:
1. Fork the project repository. This creates a copy of the project on your account that you can modify without affecting the original project.
2. Clone the forked repository to your local machine using a Git client like Git or GitHub Desktop.
3. Create a new branch with a descriptive name (e.g., `new-feature-branch` or `bugfix-issue-123`).
```sh
git checkout -b new-feature-branch
```
4. Make changes to the project's codebase.
5. Commit your changes to your local branch with a clear commit message that explains the changes you've made.
```sh
git commit -m 'Implemented new feature.'
```
6. Push your changes to your forked repository on GitHub using the following command
```sh
git push origin new-feature-branch
```
7. Create a pull request to the original repository.
Open a new pull request to the original project repository. In the pull request, describe the changes you've made and why they're necessary.
The project maintainers will review your changes and provide feedback or merge them into the main branch.

---

## 🪪 License

This project is licensed under the MIT License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.

---

