pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/dmurai01/teste-api-ebac.git'
                bat 'npm install'
            }
        }
        stage('Rodar Serverest') {
            steps {
               bat '''set NO_COLOR=1
start npx serverest'''
            }
        }
        stage('Test') {
            steps {
                bat '''set NO_COLOR=1
npx cypress run'''
            }
        }
    }
}
