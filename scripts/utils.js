// Storage utility functions
const QuizStorage = {
    // Quiz related methods
    getQuizzes() {
        return JSON.parse(localStorage.getItem('quizzes')) || [];
    },

    saveQuiz(quiz) {
        const quizzes = this.getQuizzes();
        quizzes.push(quiz);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
    },

    deleteQuiz(quizId) {
        let quizzes = this.getQuizzes();
        quizzes = quizzes.filter(quiz => quiz.id !== quizId);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        
        // Also delete related results
        this.deleteQuizResults(quizId);
    },

    getQuizById(quizId) {
        const quizzes = this.getQuizzes();
        return quizzes.find(quiz => quiz.id === quizId);
    },

    // Results related methods
    getResults() {
        return JSON.parse(localStorage.getItem('quizResults')) || [];
    },

    saveResult(result) {
        const results = this.getResults();
        results.push(result);
        localStorage.setItem('quizResults', JSON.stringify(results));
        localStorage.setItem('currentResult', JSON.stringify(result));
    },

    deleteQuizResults(quizId) {
        let results = this.getResults();
        results = results.filter(result => result.quizId !== quizId);
        localStorage.setItem('quizResults', JSON.stringify(results));
    },

    // Current quiz state
    setCurrentQuiz(quizId) {
        localStorage.setItem('currentQuizId', quizId);
    },

    getCurrentQuiz() {
        const quizId = localStorage.getItem('currentQuizId');
        return this.getQuizById(quizId);
    }
};

// UI utility functions
const UIUtil = {
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type} fade-in`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    },

    confirm(message) {
        return window.confirm(message);
    },

    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        return loader;
    },

    showLoader(parentElement) {
        const loader = this.createLoader();
        parentElement.appendChild(loader);
        return loader;
    },

    hideLoader(loader) {
        if (loader && loader.parentElement) {
            loader.remove();
        }
    }
};

// Form validation utility
const FormUtil = {
    validateRequired(value, fieldName) {
        if (!value || value.trim() === '') {
            throw new Error(`${fieldName} is required`);
        }
        return value.trim();
    },

    validateMinLength(value, fieldName, minLength) {
        if (value.length < minLength) {
            throw new Error(`${fieldName} must be at least ${minLength} characters long`);
        }
        return value;
    },

    validateArray(array, fieldName) {
        if (!Array.isArray(array) || array.length === 0) {
            throw new Error(`${fieldName} must not be empty`);
        }
        return array;
    }
};

// Date formatting utility
const DateUtil = {
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

// Export utilities for use in other files
window.QuizApp = {
    storage: QuizStorage,
    ui: UIUtil,
    form: FormUtil,
    date: DateUtil
};