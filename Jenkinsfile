pipeline {
    agent any
    
    stages {
        stage('Fetch Code from GitHub') {
            steps {
                script {
                    git url: 'https://github.com/your-username/your-repository.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build Docker image using Dockerfile
                script {
                    docker.build("your-docker-image:latest", "-f Dockerfile .")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker registry
                    docker.withRegistry('https://your.docker.registry', 'docker-registry-credentials') {
                        // Push Docker image to registry
                        docker.image("your-docker-image:latest").push()
                    }
                }
            }
        }
    }
}
