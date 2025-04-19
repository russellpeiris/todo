### Tech Stack:
- Vite + React + Typescript on the Frontend, 
- Node.js + Express.js + Typescript on the Backend 
- PostgreSQL as the Database
- Jest for testing
- Vitest for UI testing
- Docker for containerization
- TypeORM for ORM

# Kubernetes Configuration Guide

This guide provides essential tips for correctly setting up Kubernetes YAML files for production environments.

## Key Points

1. **Use an Ingress for Production**  
    - An ingress is crucial for mapping a domain name to the ingress external IP address.
    - It allows you to configure routing, prefixes, and other settings for your services.

2. **Common Issues and Solutions**  
    - **Path Rewrite**: Ensure the path rewrite is correctly configured in the ingress to avoid routing issues.  
    - **Service Name**: Double-check that the service name is correctly specified in the deployment YAML file to ensure proper connectivity.

By following these guidelines, you can avoid common pitfalls and ensure a smooth deployment process in Kubernetes.


### How to run the project on Docker:

Prerequisites:
- Docker

1. Clone the repository
```bash
git clone https://github.com/russellpeiris/todo.git
```
2. Run `docker-compose up --build` on the root folder

```bash	
├── backend
├── frontend
├── docker-compose.yml
└── README.md
```

3. Access `http://localhost:5173/` on your browser

### Ant Design was used for the Frontend components

![image](https://github.com/user-attachments/assets/42b4b6ec-a6cf-4e70-8adc-abf5132466fb)
