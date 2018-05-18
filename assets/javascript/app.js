// ===========================================================================
// VARIABLES, OBJECTS, & ARRAYS
// ===========================================================================

var correct;
var wrong;
var unanswered;
var questionNum = 0;

var clock = {
    time: 10,
    clockRunning: false,
    intervalId: null,
    reset: function() {
        clock.time = 10;
        clock.intervalId = null;
        clock.running = false;
    },
    start: function() {
        if (!clock.clockRunning) {
            clock.intervalId = setInterval(clock.count, 1000)
            clock.clockRunning = true;
        };
    },
    stop: function() {
        if(clock.clockRunning) {
            clock.reset();
        }
    },
    count: function() {
        clock.time--;
        var converted = clock.timeConverter(clock.time);
        $('#display').text(converted);
    },
    timeConverter: function(t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes === 0) {
            minutes = '00';
        }
        else if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return minutes + ':' + seconds;
    }
};

var questions = [
    {q: 'What was the name of Malcom Reynold\'\s ship in the TV series Firefly?', a: 'Serenity', b: 'Enterprise', c: 'Firefly', d: 'Defiant'},
    {q: 'In the movie Back to the Future Part II, what toy company was credited with creating the infamous hoverboard?', a: 'Mattel', b: 'Fisher Price', c: 'Nerf', d: 'Hasbro'},
    {q: 'In Star Trek: The Next Generation, Brent Spiner was called upon to play multiple roles. Which of the following was not one of them?', a: 'Admiral Haden', b: 'Lt. Commander Data', c: 'Lore', d: 'Dr. Noonien Soong'},
    {q: 'In the remake of Battlestar Galactica, which saying, ad-libbed by Edward James Olmos, was liked so much that they continued to use it throughout the series?', a: 'So Say We All', b: 'Frak', c: 'Skin Job', d: 'Jock Smock'},
    {q: 'In the original Blade Runner, what creature was left behind by Gaff in the form of origami in the ending sequence?', a: 'Unicorn', b: 'Chicken', c: 'Human', d: 'Dog'}
]

var newArr = [
    questions[questionNum].a,
    questions[questionNum].b,
    questions[questionNum].c,
    questions[questionNum].d
]

// ===========================================================================
// FUNCTIONS
// ===========================================================================

function gameStart() {
    correct = 0;
    wrong = 0;
    unanswered = 0;
    test();
    populateText();
}

function stats() {
    return '<p>Correct: ' + correct + '<p>' +
    '<p>Wrong: ' + wrong + '<p>' +
    '<p>Unanswered Questions: ' + unanswered + '<p>';
}

function gameOver() {
    hide();
    $('#results').show();
    document.querySelector('#results').innerHTML = stats();
}

function hide() {
    $('#workArea').hide();
    $('#display').hide();
}

function test() {
    var newIndex, tempHolder, i;
    for (i = newArr.length - 1; i > 0; i--) {
        newIndex = Math.floor(Math.random() * (i + 1));
        tempHolder = newArr[i];
        newArr[i] = newArr[newIndex];
        newArr[newIndex] = tempHolder;
    }
    return newArr;
}

function populateText() {
    if (questionNum <= (questions.length - 1)) {
        $('#question').text(questions[questionNum].q);
        $('#optionOne').text(newArr[0]);
        $('#optionTwo').text(newArr[1]);
        $('#optionThree').text(newArr[2]);
        $('#optionFour').text(newArr[3]);
    }
    else {
        gameOver();
        $('#start').show();
    }
}

// ===========================================================================
// GAME
// ===========================================================================

hide();

$(document).ready(function() {
    
    $('#start').click(function() {
        questionNum = 0;
        gameStart();
        test();
        populateText();
        $('#start').hide();
        $('#workArea').show();
        $('#results').hide();
    });

    $('.multiChoice').click(function() {
        // not registering the selection of 'a' as bing the correct answer
        if (this.click == questions[questionNum].a) {
            correct++;
        }
        else {
            // as things lie, everything is being considered to fall into this rule
            // wrong++;
            // $('button').attr('disabled', true);
            // $('#display').show();
            // clock.wrongGuess();
            // // need to add feature to highlight correct option
            //     // rule not working
            //     if (time == 0) {
            //         // clock will not stop counting down
            //         // locks code at this point
            //         clock.stop();
            //         clock.reset();
            //         $('button').attr('disabled', false);
            // }

        }
        console.log(questionNum);
        questionNum++;
        console.log(questionNum);
        test();
        populateText();
        console.log(stats());
    })
    
})