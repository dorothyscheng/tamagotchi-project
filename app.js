class Tamagotchi {
    constructor(name) {
        this.name=name;
        this.age=1;
        this.hunger=5;
        this.sleepiness=2;
        this.boredom=2;
        this.hungerInterval;
        this.sleepinessInterval;
        this.boredomInterval;
        this.ageInterval;
        Tamagotchi.player=this;
    }
    static player={};
}
// UPDATE STAT DISPLAYS
// Age increases every 1 minute
function updateAge() {
    const player=Tamagotchi.player;
    const ageText=$('#age-text');
    let  currentAge=player.age;
    Tamagotchi.player.ageInterval=setInterval(()=>{
        currentAge++;
        Tamagotchi.player.age=currentAge;
        ageText.text(currentAge);
    },60000);
};
function updateHunger() {
    const $hungryBars=$('#hungry-bar-head').children();
    const player=Tamagotchi.player;
    for (let i=0; i<$hungryBars.length; i++) {
        const $currentBar=$hungryBars.eq(i);
        const index=$currentBar.attr('id').charAt(6);
        if (player.hunger>index) {
            $currentBar.addClass('filled');
        } else {
            $currentBar.removeClass('filled');
        };
    };
}
function updateSleepiness() {
    const $sleepyBars=$('#sleepy-bar-head').children();
    const player=Tamagotchi.player;
    for (let i=0; i<$sleepyBars.length; i++) {
        const $currentBar=$sleepyBars.eq(i);
        const index=$currentBar.attr('id').charAt(6);
        if (player.sleepiness>index) {
            $currentBar.addClass('filled');
        } else {
            $currentBar.removeClass('filled');
        };
    };
}
function updateBoredom() {
    const $boredBars=$('#bored-bar-head').children();
    const player=Tamagotchi.player;
    for (let i=0; i<$boredBars.length; i++) {
        const $currentBar=$boredBars.eq(i);
        const index=$currentBar.attr('id').charAt(5);
        if (player.boredom>index) {
            $currentBar.addClass('filled');
        } else {
            $currentBar.removeClass('filled');
        };
    };
}
function updateGameMessage() {
    $('#game-message').addClass('reveal');
    setTimeout(()=>$('#game-message').removeClass('reveal'),5000);
}

// INCREMENT STATS
// Hunger increases every 30 seconds
function increaseHunger() {
    Tamagotchi.player.hungerInterval=setInterval(()=>{
        Tamagotchi.player.hunger++;
        updateHunger();
        if (Tamagotchi.player.hunger>10) {
            endGame();
        };
    },30000);
}
// Sleepiness increases every 30 seconds
function increaseSleepiness() {
    Tamagotchi.player.sleepinessInterval=setInterval(()=>{
        Tamagotchi.player.sleepiness++;
        updateSleepiness();
        if (Tamagotchi.player.sleepiness>10) {
            endGame();
        };
    },30000);
}
// Boredom increases every 20 seconds
function increaseBoredom() {
    Tamagotchi.player.boredomInterval=setInterval(()=>{
        Tamagotchi.player.boredom++;
        updateBoredom();
        if (Tamagotchi.player.boredom>10) {
            endGame();
        };
    },20000);
}

// PLAYER ACTIONS
function feedPet() {
    if (Tamagotchi.player.hunger>0) {
        Tamagotchi.player.hunger--;
        updateHunger();
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't hungry!`);
        updateGameMessage();
    };
}
function toggleLights() {
    const $petSection=$('#pet-section');
    const $lightsIndicator=$('#lights-indicator')
    $petSection.toggleClass('lights-off');
    if ($petSection.hasClass('lights-off')) {
        $lightsIndicator.text('On');
        sleep();
    } else {
        $lightsIndicator.text('Off');
        $('#feed-button').off();
        $('#play-button').off();
        $('#feed-button').on('click',feedPet);
        $('#play-button').on('click',togglePlay);
        clearInterval(Tamagotchi.player.sleepinessInterval);
        setTimeout(increaseSleepiness,5000);
    };
};
function sleepMessage() {
    $('#game-message').text(`${Tamagotchi.player.name} is trying to sleep!`);
    updateGameMessage();
}
// Sleeping for 10 seconds subtracts 1 sleepiness
function sleep() {
    if (Tamagotchi.player.sleepiness>0) {
        clearInterval(Tamagotchi.player.sleepinessInterval);
        $('#feed-button').off();
        $('#play-button').off();
        $('#feed-button').on('click',sleepMessage);
        $('#play-button').on('click',sleepMessage);
        Tamagotchi.player.sleepinessInterval=setInterval(()=>{
            Tamagotchi.player.sleepiness--;
            updateSleepiness();
            if (Tamagotchi.player.sleepiness<=0) {
                $('#game-message').text(`${Tamagotchi.player.name} is awake!`);
                toggleLights();
                updateGameMessage();
            };
        },10000);
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't sleepy!`);
        toggleLights();
        updateGameMessage();
    };
}
function togglePlay() {
    const $playButton=$('#play-button');
    $playButton.toggleClass('play-on');
    if (!$playButton.hasClass('play-on')) {
        $('#rps-container').slideUp();
        $('#feed-button').on('click',feedPet);
        $('#lights-button').on('click',toggleLights);
    } else {
        $('#feed-button').off();
        $('#lights-button').off();
        playRPS();
    }
};
function playRPS() {
    const options=[
        {object: 'Rock',src: 'https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9ja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
        {object: 'Paper',src: 'https://images.unsplash.com/photo-1496262967815-132206202600?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
        {object: 'Scissors',src:'https://images.unsplash.com/photo-1610434538996-232c255e67de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'}
    ];
    const petChoice=options[Math.floor(Math.random()*options.length)];
    const $petChoiceImage=$('#pet-choice-image');
    const $petChoiceText=$('#pet-choice-text');
    $petChoiceImage.attr('src',petChoice.src);
    $petChoiceImage.attr('alt',petChoice.object);
    $petChoiceText.text(petChoice.object);
    $('#rps-container').slideDown();
    $('.rps-image').on('click',resolveRPS);
};
function resolveRPS(e) {
    $('#play-button').off();
    $('.rps-image').off();
    const player=Tamagotchi.player;
    const playerChoice=$(e.target).attr('id');
    const petChoice=$('#pet-choice-text').text().toLowerCase();
    const $rpsMessage=$('#rps-message');
    $('#pet-choice').toggleClass('reveal');
    if (playerChoice===petChoice) {
        $rpsMessage.text('You tied!');
    } else if (petChoice==='rock') {
        if (playerChoice==='paper') {
            $rpsMessage.text('You won!');
        } else if (playerChoice==='scissors') {
            $rpsMessage.text('You lost!');
        };
    } else if (petChoice==='paper') {
        if (playerChoice==='rock') {
            $rpsMessage.text('You lost!');
        } else if (playerChoice==='scissors') {
            $rpsMessage.text('You won!');
        };
    } else if (petChoice==='scissors') {
        if (playerChoice==='rock') {
            $rpsMessage.text('You won!');
        } else if (playerChoice==='paper') {
            $rpsMessage.text('You lost!');
        };
    };
    decreaseBoredom();
    setTimeout(()=>{
        togglePlay();
    },2000);
    setTimeout(()=>{
        $('#play-button').on('click',togglePlay);
        $('#pet-choice').toggleClass('reveal');
        $rpsMessage.text('Click to play');
    },2200);
};
function decreaseBoredom() {
    if (Tamagotchi.player.boredom>0) {
        Tamagotchi.player.boredom--;
        updateBoredom();
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't bored!`);
        updateGameMessage();
    };
};

function startGame() {
    const player=Tamagotchi.player;
    $('#start-screen').fadeOut();
    $('#title').fadeOut();
    $('#title').hide().text(player.name).fadeIn();
    setTimeout(()=>{
        $('#play-screen').fadeIn();
        updateHunger();
        updateSleepiness();
        updateBoredom();
        updateAge();
        increaseHunger();
        increaseBoredom();
        increaseSleepiness();
        $('#feed-button').on('click',feedPet);
        $('#lights-button').on('click',toggleLights);
        $('#play-button').on('click',togglePlay);
    },1000);
};
function namePet(name) {
    new Tamagotchi(name);
    startGame();
}
function endGame() {
    clearInterval(Tamagotchi.player.boredomInterval);
    clearInterval(Tamagotchi.player.hungerInterval);
    clearInterval(Tamagotchi.player.sleepinessInterval);
    clearInterval(Tamagotchi.player.ageInterval);
    $('#play-screen').fadeOut();
    $('body').removeClass('animate-color');
    $('#end-message').hide().text(`${Tamagotchi.player.name} died from neglect...`);
    setTimeout(()=>{
        $('#end-message').fadeIn();
    },1000);
}
// EVENT LISTENERS
$('#pet-name').on('click',()=>$('#pet-name').val(''));
$('#submit-button').on('click',(e)=>{
    e.preventDefault();
    if ($('#pet-name').val().trim()) {
        namePet($('#pet-name').val().trim());
    };
});