var baseURL = "https://timeline-guess-api.herokuapp.com";

// Routes
var Login = {
    template: '#Login',
    beforeRouteEnter: function(to, from, next) {
        if (localStorage.getItem('api-token')) {
            next({ path: "play" });
        } else {
            next();
        }
    },
    methods: {
        authenticate: function() {
            window.location.replace(baseURL + '/auth/twitter');
        }
    }
};

var Auth = {
    template: '<div></div>',
    created: function() {
        this.saveToken();
    },
    methods: {
        saveToken: function() {
            var token = this.$route.query.token;
            localStorage.setItem('api-token', token);
            router.push('play');
        }
    }
};

var Game = {
    template: '#Game',
    beforeRouteEnter: function(to, from, next) {
        if (localStorage.getItem('api-token')) {
            next();
        } else {
            next({ path: "home" });
        }
    },
    data: function() {
        return {
            questions: null,
            currentIndex: null,
            profileVisible: null,
            isLoading: true,
            stats: {}
        }
    },
    computed: {
        twitterUrl: function() {
            return "https://twitter.com/intent/tweet/?text=How well can you guess who tweeted what on your timeline? My current score is " + this.stats.correct_count + " of " + this.stats.answered_count + "&url=http://timeline.expert";
        }
    },
    created: function() {
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            var self = this;
            var options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': localStorage.getItem('api-token')
                }
            };

            self.isLoading = true;

            fetch(baseURL + '/api/quiz', options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    if (response && response.length) {
                        self.isLoading = false;
                        self.questions = response;
                        self.loadQuestion(0);
                    } else {
                        self.fetchData();
                    }
                })
                .catch(function(error) {
                    localStorage.removeItem('api-token');
                    router.push('home');
                });

            fetch(baseURL + '/api/me', options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    self.stats = response;
                })
        },
        updateCount: function(answer) {
            this.stats.answered_count++;
            if (answer.correct) this.stats.correct_count++;
        },
        loadQuestion: function(index) {
            var question = this.questions[index];
            if (question.media.length > 0) {
                this.skip(question, index);
            } else {
                this.currentIndex = index;
            }
        },
        nextQuestion: function(index) {
            index = index || (this.currentIndex + 1);
            if (index < this.questions.length) {
                this.loadQuestion(index);
            } else {
                this.fetchData();
            }
        },
        skip: function(question, index) {
            this.nextQuestion(index + 1);
            var options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': localStorage.getItem('api-token')
                }
            };

            var url = baseURL + '/api/quiz/' + question.id;
            fetch(url, options);
        },
        logout: function() {
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': localStorage.getItem('api-token')
                }
            };

            var url = baseURL + '/logout';
            fetch(url, options).then(function() {
                localStorage.removeItem('api-token');
                router.push('login');
            });
        }
    }
};

function getQuestionData() {
    return {
        isLoading: true,
        isExiting: false,
        answersVisible: false,
        isAnswered: false,
        answer: null,
        count: null
    }
}

Vue.component('question', {
    props: ['index', 'data'],
    data: getQuestionData,
    template: '#Question',
    computed: {
        question: function() {
            return this.data[this.index];
        }
    },
    created: function() {
        this.showOptionsAfterDelay();
    },
    methods: {
        showOptionsAfterDelay: function(delay) {
            var self = this;
            var delay = self.question.body.length / 140 * 3000;

            setTimeout(function() {
                self.answersVisible = true;
            }, delay);
        },
        formatTime: function(time) {
            return moment(time).format('MMMM Do YYYY, h:mm:ss a');
        },
        choose: function(option, event) {
            var self = this;
            if (self.isAnswered) return;

            self.isAnswered = true;
            self.answer = option;

            var options = {
                method: 'POST',
                body: JSON.stringify({
                    'answer': option.username
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': localStorage.getItem('api-token')
                }
            };

            var url = baseURL + '/api/quiz/' + self.question.id + '/answer';
            fetch(url, options).then(function() {
                self.$emit('answered', option);
            });

            self.count = 3;
            var countdown = setInterval(function() {
                self.count--;
                if (self.count == 0) {
                    clearInterval(countdown);
                    self.next();
                }
            }, 1000);
        },
        next: function() {
            var self = this;
            self.isLoading = false;
            self.isExiting = true;

            setTimeout(function() {
                self.$emit('next');
                self.answersVisible = false;
            }, 400);

            setTimeout(function() {
                Object.assign(self.$data, getQuestionData());
                self.showOptionsAfterDelay();
            }, 700);
        }
    }
});

var router = new VueRouter({
    routes: [
        { name: 'play', path: '/play', component: Game },
        { name: 'auth', path: '/authenticate', component: Auth },
        { name: 'home', path: '/', component: Login },
        { path: '*', redirect: '/' }
    ]
});

// Filters

Vue.prototype.filters = {
    percentage: function(value) {
        value = (value || 0) * 100;
        value = Math.round(value * Math.pow(10, 1)) / Math.pow(10, 1);
        value = value + '%';
        return value;
    },
    decode: function(encoded) {
        var elem = document.createElement('textarea');
        elem.innerHTML = encoded;
        return elem.value;
    }
}

// Initialize Vue

var app = new Vue({ router: router }).$mount('#app');
