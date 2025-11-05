class QuizList {
    constructor() {
        this.quizListElement = document.getElementById('quiz-list');
        this.init();
    }

    init() {
        this.loadQuizzes();
    }

    loadQuizzes() {
        const quizzes = QuizApp.storage.getQuizzes();
        
        if (quizzes.length === 0) {
            this.displayEmptyState();
            return;
        }

        this.displayQuizzes(quizzes);
    }

    displayEmptyState() {
        this.quizListElement.innerHTML = `
            <div class="empty-state fade-in">
                <h3>No quizzes available yet</h3>
                <p>Be the first to create a quiz!</p>
                <a href="Create.html" class="button">Create New Quiz</a>
            </div>
        `;
    }

    displayQuizzes(quizzes) {
        const results = QuizApp.storage.getResults();
        
        this.quizListElement.innerHTML = quizzes.map(quiz => {
            const quizResults = results.filter(r => r.quizId === quiz.id);
            const timesCompleted = quizResults.length;
            const averageScore = this.calculateAverageScore(quizResults);

            return `
                <div class="quiz-card card fade-in" onclick="quizList.startQuiz('${quiz.id}')">
                    <h3>${quiz.title}</h3>
                    <p>${quiz.description || 'No description'}</p>
                    <div class="quiz-stats">
                        <p>Questions: ${quiz.questions.length}</p>
                        <p>Times Completed: ${timesCompleted}</p>
                        ${timesCompleted > 0 ? `<p>Average Score: ${averageScore}%</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    calculateAverageScore(results) {
        if (results.length === 0) return 0;
        const average = results.reduce((acc, r) => 
            acc + (r.score / r.totalQuestions), 0) / results.length;
        return (average * 100).toFixed(1);
    }

    startQuiz(quizId) {
        QuizApp.storage.setCurrentQuiz(quizId);
        window.location.href = 'Quiz.html';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizList = new QuizList();
});