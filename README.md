# LifeOS: Your Learning Companion for Quizzes, Insights, and Roadmaps

**LifeOS** is a comprehensive learning platform designed to make the learning process interactive, personalized, and efficient. Whether you're preparing for an exam, building new skills, or simply exploring new knowledge, LifeOS empowers you with advanced tools to generate quizzes, organize resources, and map out your learning journey.

# Key Features:

1. **Generate Quizzes from Various Sources**: 
   - With LifeOS, you can create personalized quizzes in seconds from various sources like a **prompt**, **YouTube videos**, **articles**, or **documents**. Simply input the content, and LifeOS will automatically generate quiz questions tailored to your needs.
  
2. **Take Interactive Tests**: 
   - After generating quizzes, you can take them right within the platform. **LifeOS scores your performance** and helps you track your progress over time, allowing you to improve and retain knowledge more effectively.

3. **Build Personalized Learning Roadmaps**: 
   - LifeOS helps you **design custom learning roadmaps** based on your specific goals, topics of interest, or skills you want to develop. Whether you're a student or a lifelong learner, these roadmaps provide structured guidance to navigate complex topics.

4. **Save Articles and Videos for Later**: 
   - Easily **save articles or videos** to revisit later. LifeOS organizes your resources and provides **readable formats** for articles so that you can focus on learning, without distractions.

5. **Summaries and Key Insights**: 
   - Save time by getting concise **summaries** and **key insights** from long articles. LifeOS distills important information, helping you grasp the essential concepts quickly.

## Who is LifeOS For?

LifeOS is designed with learners in mind. Whether you're a student preparing for an exam, a professional upskilling, or someone curious to explore new topics, LifeOS provides the tools to turn content into interactive learning experiences. By merging quiz generation, resource management, and personalized learning paths, LifeOS makes it easier for you to stay organized and achieve your educational goals.

# System Architecture
![System Architecture](https://github.com/user-attachments/assets/f91593e4-dcdd-4e60-acbf-d3ccdb2b46f2)
## LifeOS Microservice Architecture Overview

The backend of **LifeOS** is built using a microservice-based architecture in Spring Boot, ensuring modularity and scalability. Here’s a brief overview of each service:

1. **API Gateway**: Handles incoming client requests, routing, and security, acting as the entry point to all services.
2. **Service Registry**: Manages service discovery, enabling dynamic communication between microservices.
3. **Load Balancer**: Distributes traffic across multiple service instances to ensure availability and optimal performance.
4. **AI Service**: Generates quizzes, insights, and summaries from prompts, YouTube videos, and articles.
5. **User Service**: Manages user data, authentication, and profile preferences.
6. **Quiz Service**: Handles quiz generation, storage, and scoring.
7. **Pathways Service**: Builds personalized learning roadmaps based on user goals.
8. **Resource-Loader Service**: Processes external resources like articles and videos and stores them in the Chroma Vector Database.
9. **Feed Service**: Provides users with a dynamic feed of articles, videos, and learning materials.
10. **Database Layer**: All microservices share the same database instance, This approach simplifies database configuration and centralizes data, but it also introduces tighter coupling between services and can limit individual database scaling or isolation. the **Chroma Vector Database** handles vectorized data for advanced search.

### Advantages of Microservices and Spring Boot:
- **Scalability**: Each service can scale independently based on its own demand.
- **Resilience**: Service failures are isolated, preventing system-wide crashes.
- **Flexibility**: Faster deployment and technology variation per service are possible with Spring Boot's lightweight and modular framework.

## LifeOS Authentication Overview

LifeOS uses **JWT-based authentication** to manage user sessions securely. The process includes issuing short-lived **JWT tokens** and longer-lived **refresh tokens** for seamless user experience.

### Authentication Flow:
![Authentication](https://github.com/user-attachments/assets/6378c5d7-118f-4d23-8cc5-2525af9858d3)

1. **Login Request**:
   - The **client** sends a login request to the **API Gateway** with credentials.
   - The **API Gateway** forwards it to the **User Service**, which verifies the credentials with the **Database**.
   - If valid, a **JWT token** and a **refresh token** are issued.

2. **Token Storage**:
   - Both tokens are stored in **HTTP-only cookies** to enhance security.
   - The user is redirected to the app after login, with tokens in the cookies.

3. **Accessing Protected Routes**:
   - The **API Gateway** validates the **JWT token** from the cookie when accessing protected routes.
   - If valid, the user proceeds to the requested service.

4. **Token Expiration and Refresh**:
   - If the **JWT token** expires, the client automatically requests a new one using the **refresh token**.
   - The **User Service** validates the **refresh token** and issues a new **JWT token**, which is set in the cookie.

5. **Token Revocation**:
   - On logout, the **refresh token** is invalidated, preventing further token generation until the user logs in again.

### Benefits of JWT-based Authentication:

- **Stateless**: No need for session data on the server, as all info is in the token.
- **Secure**: Tokens stored in **HTTP-only cookies** prevent client-side tampering.
- **Seamless User Experience**: Automatic token refresh without re-authentication.

# LifeOS Content Generation Architecture
![ETL pipeline](https://github.com/user-attachments/assets/4805fa29-9701-4189-b9e1-a697904aaefa)

LifeOS leverages **RAG-based (Retrieval-Augmented Generation)** methods combined with **Google Cloud's Vertex AI** and **Spring AI** to generate quizzes, summaries, and key insights from user-provided content, such as YouTube videos, articles, and documents.

### Key Components:
- **Quiz Service**: Receives user prompts, URLs (YouTube, Articles), and other resources through the quiz creation form and forwards them to the **AI Service**.
  
- **AI Service**: Handles content generation by orchestrating the interaction between the quiz service, vector similarity search, and Google Cloud’s Vertex AI. It retrieves relevant chunks from the vector store to generate meaningful responses based on the user's input.
  
- **Resource Loader Service**: 
  - Parses various resources (YouTube transcripts, articles, documents).
  - Runs an **ETL Pipeline** to load, split, and embed content into a **Chroma vector store** for efficient retrieval during content generation.
  
- **Vector Similarity Search**: Retrieves the most relevant chunks based on user prompts, ensuring high-quality quiz questions or summaries are created.

### RAG-Based Approach:
1. **Content Processing**: User-provided content is parsed and split into manageable chunks via the **ETL pipeline**.
2. **Embedding and Storing**: The chunks, along with metadata, are embedded and stored in the **Chroma vector store** for future retrieval.
3. **Content Generation**: When generating quizzes or summaries, the AI service retrieves the most relevant chunks from the vector store and feeds them to the **chat model** in Vertex AI, allowing it to augment the generation process with real data.

### Vertex AI and Spring AI Integration:
- **Google Cloud's Vertex AI (Gemini Model)**: Handles the actual generation of quizzes, summaries, and insights. The system uses the **gemini-pro-1.5** model to process user prompts and produce highly contextual content.
- **Spring AI**: Facilitates the connection between microservices and the AI models, ensuring smooth communication and result handling.

### Advantages of the Approach:
- **RAG-Based Generation**: Improves the accuracy and relevance of generated content by grounding it in the user's actual data.
- **Scalable Microservices**: Each service in the architecture is independently scalable, allowing better performance and resource management.
- **Efficient Search and Retrieval**: Using a vector store ensures quick retrieval of the most relevant content chunks, optimizing the generation process.

# Technologies and Dependencies
| **Component**        | **Technology/Dependency**                                                                                             | **Description**                                                                                  |
|----------------------|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Frontend**          | [Next.js](https://nextjs.org/)                                                                                        | React framework for building server-rendered or statically generated web applications.           |
| **Backend**           | [Spring Boot](https://spring.io/projects/spring-boot)                                                                 | Framework for building stand-alone, production-grade Spring applications.                        |
|                      | [Spring Cloud Eureka](https://spring.io/projects/spring-cloud-netflix)                                                 | Service discovery tool using Netflix Eureka.                                                     |
|                      | [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)                                                | API Gateway for routing and load balancing requests in a microservices architecture.             |
|                      | [Spring Security](https://spring.io/projects/spring-security)                                                          | Security framework providing authentication, authorization, and other security features.         |
|                      | [Spring Data JPA](https://spring.io/projects/spring-data-jpa)                                                          | Simplifies data access using JPA (Java Persistence API).                                          |
|                      | [Spring AI](https://docs.spring.io/spring-ai/reference/1.0/index.html)                                                                                        | Spring framework for integrating AI services.                                                    |
|                      | [Spring Cloud OpenFeign](https://spring.io/projects/spring-cloud-openfeign)                                            | Declarative REST client for simplifying microservice communication.                              |
|                      | [ModelMapper](http://modelmapper.org/)                                                                                 | Object mapping framework to automatically map DTOs to entities and vice versa.                   |
| **Security**          | [jjwt-api](https://github.com/jwtk/jjwt)                                                                              | Java JWT (JSON Web Token) library for creating and validating JWT tokens.                        |
| **Database**          | [PostgreSQL](https://www.postgresql.org/)                                                                             | Open-source relational database management system.                                               |
|                      | [Chroma Vector Store](https://docs.trychroma.com/)                                                                     | Vector database for storing embeddings and performing similarity searches.                       |
| **AI Model**          | [Google Vertex AI Gemini-1.5 Pro](https://cloud.google.com/vertex-ai)                                                  | AI model used for text embedding and content generation.                                         |
| **Web Content Parsing** | [Readability4j](https://github.com/dankito/Readability4J)                                                        | Java library for extracting readable content from web pages.                                     |
|                      | [YouTube Transcript API](https://github.com/Thoroldvix/youtube-transcript-api)                                             | API to extract transcripts from YouTube videos.                                                  |
|                      | [jsoup](https://jsoup.org/)                                                                                            | Java library for working with real-world HTML and web scraping.                                  |
| **Markdown**          | [Flexmark-all](https://github.com/vsch/flexmark-java)                                                                  | Java library for rendering and parsing Markdown to HTML and other formats.                       |
| **CSS Framework**     | [Tailwind CSS](https://tailwindcss.com/)                                                                               | Utility-first CSS framework for rapid UI development.                                            |
| **Design Tool**       | [Figma](https://www.figma.com/)                                                                                        | Collaborative design tool for interface design and prototyping.                                  |

# Setup and run the project
## Clone the Project

1. Clone the project from the GitHub Repository:
   ```bash
   git clone <repository-url>
   ```

## Configure Environment Variables

1. Navigate to the project's root directory:
   ```bash
   cd <project-root-directory>
   ```

2. In the **client** folder, update the `.env` variables with your API keys and required variables:
   ```bash
   cd client
   nvim .env  # or use your preferred text editor
   ```

## Microservice Configuration

1. Go to the **microservice** folder:
   ```bash
   cd ../{microservice}
   ```

2. Update the secrets in the `secrets.yaml` file located in `{ServiceModule}/src/main/resources` with your own set values:
   ```yaml
   secrets:
     datasource:
       url: {database url}
       username: {database username}
       password: {database password}
   ```
   **Note:** Replace the values for `url`, `username`, and `password` with your actual database credentials.

## Vertex AI API Setup

1. To use the Vertex AI API, ensure you have a Google Cloud project set up with the Vertex AI API enabled. Follow these steps:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing project.
   - Navigate to **APIs & Services > Library**.
   - Search for **Vertex AI API** and click on it.
   - Click **Enable** to activate the API for your project.

2. Set up authentication:
   - Go to **APIs & Services > Credentials**.
   - Click on **Create Credentials** and choose **Service Account**.
   - Fill in the required details and click **Create**.
   - After the service account is created, grant it the necessary roles, such as **Vertex AI User**.
   - Click **Done**, then click on your service account to manage keys.
   - Under the **Keys** tab, click **Add Key > Create New Key** and choose **JSON**. Download the key file.

3. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to your JSON key file:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
   ```
After setting up vertex AI, change the `secrets.yaml` file of `lifeos-ai-microservice`, `lifeos-resource-loader`: 

```yaml
secrets:
  vertex-ai-project-id: lifeos-4911
  vertex-ai-location: us-central1
```

## Frontend Setup

1. Open a terminal in the **client** folder:
   ```bash
   cd client
   ```

2. Install project dependencies with:
   ```bash
   npm install
   ```

3. Start the frontend development server with:
   ```bash
   npm run dev
   ```

## Backend Setup

1. Install dependencies for the backend from the `pom.xml` file. You can use Maven:
   ```bash
   cd ./microservice
   mvn install
   ```

2. Run the main files of all modules. Consider using tools like IntelliJ for building and running the system.
