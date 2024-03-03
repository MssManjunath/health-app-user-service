pipeline {
    agent any
    
    stages {
        stage('Fetch Code from GitHub') {
            steps {
                script {
                    git url: 'https://github.com/MssManjunath/health-app-user-service.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t user-service-image -f /Dockerfile .'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    // Log in to Docker registry
                    docker.withRegistry('https://your.docker.registry', 'docker-registry-credentials') {
                        // Push Docker image to registry
                        docker.image("user-service-image:latest").push()
                    }
                }
            }
        }
    }
}
