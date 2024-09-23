# Medium Blog

A responsive blog platform inspired by Medium, built with a modern tech stack for scalability and performance. Users can create, view, edit, and delete posts, while developers can contribute using a well-defined API.

![Screenshot of Medium Blog](./path-to-your-screenshot.png)

## Tech Stack

- **Backend**: [Hono](https://hono.dev/)
- **Database**: [Prisma](https://www.prisma.io/) with [Cloudflare Workers](https://workers.cloudflare.com/)
- **Connection Pooling**: [Prisma Accelerate](https://www.prisma.io/docs/concepts/prisma-accelerate)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: [Zod](https://zod.dev/)
- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Rich Text Editor**: [Quill](https://quilljs.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Deployment**: Avian on Cloudflare Workers

## Features

- **Create, Edit, and Delete Posts**: Users can manage their posts using a rich text editor.
- **User Authentication**: Secure user authentication with JWT.
- **Responsive Design**: Fully responsive layout for an optimal experience on mobile, tablet, and desktop.
- **API Routes**: Well-structured RESTful APIs for user and blog management.

## Screenshots

### Home Page
![Home Page](./path-to-your-homepage-screenshot.png)

### Post Page
![Post Page](./path-to-your-postpage-screenshot.png)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12+)
- [npm](https://www.npmjs.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Prisma](https://www.prisma.io/docs/getting-started)
- [Hono](https://hono.dev/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hanuchaudhary/medium-blog.git
    cd medium-blog
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Prisma:

    ```bash
    npx prisma generate
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory with the following:

    ```bash
    DATABASE_URL=your_cloudflare_worker_database_url
    JWT_SECRET=your_jwt_secret_key
    ```

5. Deploy on Cloudflare Workers:

    Follow [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) to deploy.

6. Start the development server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:3000`.

### API Routes

#### User Routes (`api/v1/user/...`)

- `POST /api/v1/user/signup`: Register a new user.
- `POST /api/v1/user/login`: Log in an existing user.
- `GET /api/v1/user/me`: Get the authenticated user's profile.

#### Blog Routes (`api/v1/blogs/...`)

- `GET /api/v1/blogs`: Retrieve all blog posts.
- `GET /api/v1/blogs/:id`: Retrieve a specific post by ID.
- `POST /api/v1/blogs`: Create a new blog post (JWT required).
- `PUT /api/v1/blogs/:id`: Update an existing blog post (JWT required).
- `DELETE /api/v1/blogs/:id`: Delete a blog post (JWT required).

### PR Route

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Open a pull request (PR) describing your modifications.

### Responsive Design

This project is optimized for:

- Mobile devices
- Tablets
- Desktop screens

## Contributing

We welcome contributions! Please ensure your code passes all tests and follows the coding guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---
