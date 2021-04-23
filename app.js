class Tamagotchi {
    constructor(name,faveFood,body,foot,tail,background) {
        this.name=name;
        this.age=1;
        this.coins=0;
        this.hunger=5;
        this.sleepiness=4;
        this.boredom=6;
        this.faveFood=faveFood;
        this.hungerInterval;
        this.sleepinessInterval;
        this.sleepingInterval;
        this.sleepinessIntervalCheck=false;
        this.boredomInterval;
        this.ageInterval;
        this.bodyColorIndex=body;
        this.footColorIndex=foot;
        this.tailColorIndex=tail;
        this.backgroundIndex=background;
        this.bed=false;
        this.feeder=false;
        this.toy=false;
        this.hangman=false;
        Tamagotchi.player=this;
    }
    static player={};
    static colors=['#000000','#ffffff','#808080','#f5f5dc','#ffa500','#ff0000','#0066ff','#ffff00','#00ffff','#ff0066','#0D2B73','#D4D7DE','#24781B'];
    static backgrounds=[
        '',
        'https://images.unsplash.com/photo-1603033156166-2ae22eb2b7e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1913&q=80',
        'https://images.unsplash.com/photo-1568729064400-d81b375ab4ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3626&q=80',
        'https://images.unsplash.com/photo-1544612318-bcab56ed6311?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2207&q=80',
        'https://images.unsplash.com/photo-1598967460051-c2ffd802d09e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2106&q=80',
        'https://images.unsplash.com/photo-1608931394404-5bb9d8cf8b53?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2021&q=80',
        'https://images.unsplash.com/photo-1606374601055-ff7b45c448c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2203&q=80',
        'https://images.unsplash.com/photo-1611520474289-264fb8b502a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1916&q=80',
        'https://images.unsplash.com/photo-1611163647499-a2befbd8d25b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
    ];
    static words=['whale','kitten','giraffe','monkey','penguin','buffalo','crane','stork','lion','tiger','bear','gorilla','dolphin','sheep','deer','elephant','bee','turtle','dog','spider','cricket','eagle','frog','iguana','crab','kangaroo','marmot','moose','moth','shark'];
    static bodyColorIndex=0;
    static footColorIndex=2;
    static tailColorIndex=1;
    static backgroundIndex=0;
    static shopPrices={
        bed:30,
        toy:20,
        feeder:20,
        hangman:10,
    }
    static hangmanGame={
        displayWord: [],
        currentWord:'',
        strikes:0,
    }
}
// UPDATE DISPLAYS
// Age increases every 1 minute
function updateAge() {
    const player=Tamagotchi.player;
    const ageText=$('#age-text');
    let  currentAge=player.age;
    ageText.text(currentAge);
    Tamagotchi.player.ageInterval=setInterval(()=>{
        currentAge++;
        Tamagotchi.player.age=currentAge;
        ageText.text(currentAge);
    },60000);
};
function updateCoins() {
    const coinsText=$('#coins-text');
    if (Tamagotchi.player.coins<0) {
        Tamagotchi.player.coins=0;
    };
    coinsText.text(Tamagotchi.player.coins);
}
function updateHunger() {
    const $hungryBars=$('#hungry-bar-head').children();
    const player=Tamagotchi.player;
    let fillClass ='filled';
    if (player.hunger>6 && player.hunger<9) {
        fillClass='urgent';
    } else if (player.hunger>=9) {
        fillClass='final';
    };
    for (let i=0; i<$hungryBars.length; i++) {
        const $currentBar=$hungryBars.eq(i);
        const index=$currentBar.attr('id').charAt(6);
        if (player.hunger>index) {
            $currentBar.attr('class','bar');
            $currentBar.addClass(fillClass);
        } else {
            $currentBar.attr('class','bar');
        };
    };
}
function updateSleepiness() {
    const $sleepyBars=$('#sleepy-bar-head').children();
    let fillClass ='filled';
    if (Tamagotchi.player.sleepiness>6 && Tamagotchi.player.sleepiness<9) {
        fillClass='urgent';
    } else if (Tamagotchi.player.sleepiness>=9) {
        fillClass='final';
    };
    for (let i=0; i<$sleepyBars.length; i++) {
        const $currentBar=$sleepyBars.eq(i);
        const index=$currentBar.attr('id').charAt(6);
        if (Tamagotchi.player.sleepiness>index) {
            $currentBar.attr('class','bar');
            $currentBar.addClass(fillClass);
        } else {
            $currentBar.attr('class','bar');
        };
    };
}
function updateBoredom() {
    const $boredBars=$('#bored-bar-head').children();
    const player=Tamagotchi.player;
    let fillClass ='filled';
    if (player.boredom>6 && player.boredom<9) {
        fillClass='urgent';
    } else if (player.boredom>=9) {
        fillClass='final';
    };
    for (let i=0; i<$boredBars.length; i++) {
        const $currentBar=$boredBars.eq(i);
        const index=$currentBar.attr('id').charAt(5);
        if (player.boredom>index) {
            $currentBar.attr('class','bar');
            $currentBar.addClass(fillClass);
        } else {
            $currentBar.attr('class','bar');
        };
    };
}
function updateGameMessage() {
    $('#game-message').addClass('reveal');
    setTimeout(()=>$('#game-message').removeClass('reveal'),3000);
}
// INCREMENT STATS
// Hunger increases every 15 seconds OR 25 seconds with feeder
function increaseHunger() {
    if (!Tamagotchi.player.feeder) {
        Tamagotchi.player.hungerInterval=setInterval(()=>{
            Tamagotchi.player.hunger++;
            updateHunger();
            if (Tamagotchi.player.hunger>10) {
                endGame();
            };
        },15000);
    } else {
        Tamagotchi.player.hungerInterval=setInterval(()=>{
            Tamagotchi.player.hunger++;
            updateHunger();
            if (Tamagotchi.player.hunger>10) {
                endGame();
            };
        },25000);
    }
}
// Sleepiness increases every 20 seconds
function increaseSleepiness() {
    Tamagotchi.player.sleepinessIntervalCheck=true;
    Tamagotchi.player.sleepinessInterval=setInterval(()=>{
        if (Tamagotchi.player.sleepinessIntervalCheck) {
            Tamagotchi.player.sleepiness++;
            console.log('increased sleepiness to '+Tamagotchi.player.sleepiness);
            updateSleepiness();
            if (Tamagotchi.player.sleepiness>10) {
                endGame();
            };
        }
    },20000);
}
// Boredom increases every 10 seconds OR 20 seconds with toy
function increaseBoredom() {
    if (!Tamagotchi.player.toy) {
        Tamagotchi.player.boredomInterval=setInterval(()=>{
            Tamagotchi.player.boredom++;
            updateBoredom();
            if (Tamagotchi.player.boredom>10) {
                endGame();
            };
        },10000);
    } else {
        Tamagotchi.player.boredomInterval=setInterval(()=>{
            Tamagotchi.player.boredom++;
            updateBoredom();
            if (Tamagotchi.player.boredom>10) {
                endGame();
            };
        },20000);
    }
}
// PLAYER ACTIONS
function feedPet() {
    if (Tamagotchi.player.hunger>0) {
        $('#feed-button').off();
        $('#feed-button').on('click',()=>document.getElementById('not-active').play());
        document.getElementById('food-sound').play();
        $('#game-message').text(`${Tamagotchi.player.name} loves ${Tamagotchi.player.faveFood}!`);
        updateGameMessage();
        Tamagotchi.player.hunger--;
        console.log(`decreased hunger to ${Tamagotchi.player.hunger}`);
        updateHunger();
        setTimeout(()=>{
            $('#feed-button').off();
            $('#feed-button').on('click',feedPet);
        },3000);
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't hungry!`);
        updateGameMessage();
    };
}
function toggleLights() {
    const player=Tamagotchi.player;
    const $petSection=$('#pet-section');
    const $lightsIndicator=$('#lights-indicator')
    $petSection.toggleClass('lights-off');
    if ($petSection.hasClass('lights-off')) {
        $lightsIndicator.text('On');
        $('#pet-section').css('background-image','url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80")');
        sleep();
    } else {
        $lightsIndicator.text('Off');
        const sleepingSound=document.getElementById('sleeping-sound');
        sleepingSound.pause();
        sleepingSound.currentTime=0;
        $('.pet').removeClass('hide');
        $('#pet-section').css('background-image',`url(${Tamagotchi.backgrounds[player.backgroundIndex]})`);
        $('#feed-button').off();
        $('#rps-button').off();
        $('#feed-button').on('click',feedPet);
        $('#rps-button').on('click',toggleRPS);
        clearInterval(Tamagotchi.player.sleepingInterval);
        setTimeout(()=>{
            if (!Tamagotchi.player.sleepinessIntervalCheck) {
                increaseSleepiness();
            }
        },5000);
    };
};
function sleepMessage() {
    $('#game-message').text(`Shh...${Tamagotchi.player.name} is sleeping!`);
    document.getElementById('not-active').play();
    updateGameMessage();
}
// Sleeping for 10 sec subtracts 1 sleepiness OR sleeping for 5 sec subtracts 1 sleepiness with bed
function sleep() {
    if (Tamagotchi.player.sleepiness>0) {
        clearInterval(Tamagotchi.player.sleepinessInterval);
        Tamagotchi.player.sleepinessIntervalCheck=false;
        document.getElementById('sleeping-sound').play();
        $('.pet').addClass('hide');
        $('#feed-button').off();
        $('#rps-button').off();
        $('#feed-button').on('click',sleepMessage);
        $('#rps-button').on('click',sleepMessage);
        if (!Tamagotchi.player.bed) {
            Tamagotchi.player.sleepingInterval=setInterval(()=>{
                Tamagotchi.player.sleepiness--;
                updateSleepiness();
                if (Tamagotchi.player.sleepiness===0) {
                    $('#game-message').text(`${Tamagotchi.player.name} is awake!`);
                    toggleLights();
                    updateGameMessage();
                }
            },10000);
        } else {
            Tamagotchi.player.sleepingInterval=setInterval(()=>{
                Tamagotchi.player.sleepiness--;
                updateSleepiness();
                if (Tamagotchi.player.sleepiness===0) {
                    $('#game-message').text(`${Tamagotchi.player.name} is awake!`);
                    toggleLights();
                    updateGameMessage();
                }
            },5000);
        }
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't sleepy!`);
        document.getElementById('not-active').play();
        toggleLights();
        updateGameMessage();
    };
}
function toggleRPS() {
    const $rpsButton=$('#rps-button');
    $rpsButton.toggleClass('play-on');
    if (!$rpsButton.hasClass('play-on')) {
        $('#rps-container').slideUp();
        $('#feed-button').off();
        $('#lights-button').off();
        $('#feed-button').on('click',feedPet);
        $('#lights-button').on('click',toggleLights);
    } else {
        $('#feed-button').off();
        $('#lights-button').off();
        $('#feed-button').on('click',()=>document.getElementById('not-active').play());
        $('#lights-button').on('click',()=>document.getElementById('not-active').play());
        playRPS();
    };
}
function playRPS() {
    if (Tamagotchi.player.boredom>0) {
        const options=[
            {object: 'Rock',src: 'https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9ja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
            {object: 'Paper',src: 'https://images.unsplash.com/photo-1496262967815-132206202600?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
            {object: 'Scissors',src:'https://images.unsplash.com/photo-1610434538996-232c255e67de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'}
        ];
        const petChoice=options[Math.floor(Math.random()*options.length)];
        const $petChoiceImage=$('#pet-choice-image');
        const $petChoiceText=$('#pet-choice-text');
        const $petChoiceHeader=$('#pet-choice-header');
        $petChoiceImage.attr('src',petChoice.src);
        $petChoiceImage.attr('alt',petChoice.object);
        $petChoiceText.text(petChoice.object);
        $petChoiceHeader.text(`${Tamagotchi.player.name} picked:`);
        document.getElementById('transition').play();
        $('#rps-container').slideDown();
        $('.rps-image').on('click',resolveRPS);
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't bored!`);
        document.getElementById('not-active').play();
        updateGameMessage();
        toggleRPS();
    };
};
function resolveRPS(e) {
    $('#rps-button').off();
    $('#rps-button').on('click',()=>document.getElementById('not-active').play());
    $('.rps-image').off();
    const playerChoice=$(e.target).attr('id');
    const petChoice=$('#pet-choice-text').text().toLowerCase();
    const $rpsMessage=$('#rps-message');
    $('#pet-choice').toggleClass('reveal');
    if (playerChoice===petChoice) {
        $rpsMessage.text('You tied!');
        document.getElementById('coin-tie').play();
    } else if (petChoice==='rock') {
        if (playerChoice==='paper') {
            $rpsMessage.text('You won!');
            Tamagotchi.player.coins+=2;
            document.getElementById('coin-sound').play();
        } else if (playerChoice==='scissors') {
            $rpsMessage.text('You lost!');
            document.getElementById('coin-loss').play();
            Tamagotchi.player.coins--;
        };
    } else if (petChoice==='paper') {
        if (playerChoice==='rock') {
            $rpsMessage.text('You lost!');
            document.getElementById('coin-loss').play();
            Tamagotchi.player.coins--;
        } else if (playerChoice==='scissors') {
            $rpsMessage.text('You won!');
            Tamagotchi.player.coins+=2;
            document.getElementById('coin-sound').play();
        };
    } else if (petChoice==='scissors') {
        if (playerChoice==='rock') {
            $rpsMessage.text('You won!');
            Tamagotchi.player.coins+=2;
            document.getElementById('coin-sound').play();
        } else if (playerChoice==='paper') {
            $rpsMessage.text('You lost!');
            document.getElementById('coin-loss').play();
            Tamagotchi.player.coins--;
        };
    };
    decreaseBoredom();
    updateCoins();
    setTimeout(()=>{
        toggleRPS();
    },2000);
    setTimeout(()=>{
        $('#rps-button').off();
        $('#rps-button').on('click',toggleRPS);
        $('#pet-choice').toggleClass('reveal');
        $rpsMessage.text('Click to play');
    },2200);
};
function decreaseBoredom() {
    Tamagotchi.player.boredom--;
    updateBoredom();
};
function resolveHangmanGuess(e) {
    const letterOptions="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // // source for extracting value from keydown: https://stackoverflow.com/questions/2220196/how-to-decode-character-pressed-from-jquerys-keydowns-event-handler/13127566
    const guess=String.fromCharCode(e.which).toLowerCase();
    const word=Tamagotchi.hangmanGame.currentWord;
    if (letterOptions.includes(guess.toUpperCase())) {
        $(document).off('keydown',resolveHangmanGuess);
        if (word.includes(guess)) {
            for (let i=0; i<word.length; i++) {
                if (guess===word.charAt(i)) {
                    Tamagotchi.hangmanGame.displayWord[i]=guess;
                    $('#display-word').text(Tamagotchi.hangmanGame.displayWord.join(' '));
                };
            };
            if (Tamagotchi.hangmanGame.displayWord.join('')===word) {
                endHangman(1);
            } else {
                $(document).on('keydown',resolveHangmanGuess);
            };
        } else {
            Tamagotchi.hangmanGame.strikes++;
            const $strikes=$('.strike');
            for (let i=0; i<Tamagotchi.hangmanGame.strikes; i++) {
                $strikes.eq(i).addClass('filled');
            };
            if (Tamagotchi.hangmanGame.strikes>=3) {
                endHangman(0);
            } else {
                $(document).on('keydown',resolveHangmanGuess);
            };
        };
    };
};
function endHangman(x) {
    if (x===0) {
        $('#hangman-message').text('You lost!');
        document.getElementById('coin-loss').play();
        Tamagotchi.player.coins-=2;
    } else {
        $('#hangman-message').text('You won!');
        document.getElementById('coin-sound').play();
        Tamagotchi.player.coins+=4;
    }
    decreaseBoredom();
    updateCoins();
    setTimeout(()=>{
        toggleHangman();
    },2000);
    setTimeout(()=>{
        $('#hangman-button').off();
        $('#hangman-button').on('click',toggleHangman);
        $('#hangman-message').text('Press a key to guess that letter');
        $('#display-word').text('');
        $('.strike').removeClass('filled');
    },2500);
}
function toggleHangman() {
    const $hangmanButton=$('#hangman-button');
    $hangmanButton.toggleClass('play-on');
    if (!$hangmanButton.hasClass('play-on')) {
        $('#hangman-container').slideUp();
        $('#feed-button').off();
        $('#lights-button').off();
        $('#feed-button').on('click',feedPet);
        $('#lights-button').on('click',toggleLights);
        Tamagotchi.hangmanGame.currentWord='';
        Tamagotchi.hangmanGame.displayWord=[];
        Tamagotchi.hangmanGame.strikes=0;
        $('#display-word').text('');
    } else {
        $('#feed-button').off();
        $('#lights-button').off();
        $('#feed-button').on('click',()=>document.getElementById('not-active').play());
        $('#lights-button').on('click',()=>document.getElementById('not-active').play());
        playHangman();
    };
};
function playHangman() {
    if (Tamagotchi.player.boredom>0) {
        const currentWord=Tamagotchi.words[Math.floor(Math.random()*Tamagotchi.words.length)];
        Tamagotchi.hangmanGame.currentWord=currentWord;
        for (let i=0; i<currentWord.length; i++) {
            Tamagotchi.hangmanGame.displayWord.push('_');
        }
        $('#display-word').text(Tamagotchi.hangmanGame.displayWord.join(' '));
        document.getElementById('transition').play();
        $('#hangman-container').slideDown();
        $(document).on('keydown',resolveHangmanGuess);
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't bored!`);
        document.getElementById('not-active').play();
        updateGameMessage();
    }
};
// GAME CREATION FUNCTIONS
function startGame() {
    const player=Tamagotchi.player;
    $('#start-screen').fadeOut();
    $('#saved-pets-section').fadeOut();
    $('#title').fadeOut();
    $('#title').hide().text(player.name).fadeIn();
    $('#pet-section').css('background-image',`url(${Tamagotchi.backgrounds[player.backgroundIndex]})`);
    $('.foot-fill').css('background-color',Tamagotchi.colors[player.footColorIndex]);
    $('.pet-fill').css('background-color',Tamagotchi.colors[player.bodyColorIndex]);
    $('.tail-fill').css('background-color',Tamagotchi.colors[player.tailColorIndex]);
    if (player.bed) {
        $('#bed').addClass('purchased');
        $('#bed-icon').addClass('reveal');
    };
    if (player.toy) {
        $('#toy').addClass('purchased');
        $('#toy-icon').addClass('reveal');
    };
    if (player.feeder) {
        $('#feeder').addClass('purchased');
        $('#feeder-icon').addClass('reveal');
    };
    if (player.hangman) {
        $('#hangman').addClass('purchased');
        $('#hangman-button').show();
        $('#rps-button').text('Play Rock, Paper, Scissors');
    }
    setTimeout(()=>{
        $('#play-screen').fadeIn();
        updateCoins();
        updateHunger();
        updateSleepiness();
        updateBoredom();
        updateAge();
        increaseHunger();
        increaseBoredom();
        increaseSleepiness();
        $('#feed-button').on('click',feedPet);
        $('#lights-button').on('click',toggleLights);
        $('#rps-button').on('click',toggleRPS);
        setTimeout(walkingRecursion,15000);
    },1000);
};
function createPet(name,food,body,foot,tail,background) {
    new Tamagotchi(name,food,body,foot,tail,background);
    startGame();
}
function colorPicker(direction,type) {
    let $cellsToChange;
    let currentColorIndex;
    if (type==='foot') {
        currentColorIndex=Tamagotchi.footColorIndex;
        $cellsToChange=$('.foot-fill');
    } else if (type==='body') {
        currentColorIndex=Tamagotchi.bodyColorIndex;
        $cellsToChange=$('.pet-fill');
    } else {
        currentColorIndex=Tamagotchi.tailColorIndex;
        $cellsToChange=$('.tail-fill');
    };
    let nextColorIndex=currentColorIndex+direction;
    if (nextColorIndex<0) {
        nextColorIndex=Tamagotchi.colors.length-1;
    } else if (nextColorIndex>Tamagotchi.colors.length-1) {
        nextColorIndex=0;
    };
    $cellsToChange.css('background-color',Tamagotchi.colors[nextColorIndex]);
    if (type==='foot') {
        Tamagotchi.footColorIndex=nextColorIndex;
    } else if (type==='body') {
        Tamagotchi.bodyColorIndex=nextColorIndex;
    } else {
        Tamagotchi.tailColorIndex=nextColorIndex;
    };
}
function colorPassThrough(e) {
    const $selected=$(e.target);
    if ($selected.hasClass('fa-angle-left')) {
        if ($selected.hasClass('body')) {
            colorPicker(-1,'body');
        } else if ($selected.hasClass('foot')) {
            colorPicker(-1,'foot');
        } else {
            colorPicker(-1,'tail');
        };
    } else {
        if ($selected.hasClass('body')) {
            colorPicker(1,'body');
        } else if ($selected.hasClass('foot')) {
            colorPicker(1,'foot');
        } else {
            colorPicker(1,'tail');
        };
    };
}
function backgroundPicker(direction) {
    const currentBgIndex=Tamagotchi.backgroundIndex;
    let nextBgIndex=currentBgIndex+direction;
    if (nextBgIndex<0) {
        nextBgIndex=Tamagotchi.backgrounds.length-1;
    } else if (nextBgIndex>Tamagotchi.backgrounds.length-1) {
        nextBgIndex=0;
    };
    $('#start-screen').css('background-image',`url(${Tamagotchi.backgrounds[nextBgIndex]})`);
    Tamagotchi.backgroundIndex=nextBgIndex;
}
function backgroundPassThrough(e) {
    const $selection=$(e.target);
    if ($selection.hasClass('fa-angle-left')) {
        backgroundPicker(-1);
    } else {
        backgroundPicker(1);
    };
}
function endGame() {
    clearInterval(Tamagotchi.player.boredomInterval);
    clearInterval(Tamagotchi.player.hungerInterval);
    clearInterval(Tamagotchi.player.sleepinessInterval);
    clearInterval(Tamagotchi.player.sleepingInterval);
    Tamagotchi.player.sleepinessIntervalCheck=false;
    clearInterval(Tamagotchi.player.ageInterval);
    $('#play-screen').fadeOut();
    document.getElementById('game-over').play();
    $('body').removeClass('animate-color');
    $('#end-message').text(`${Tamagotchi.player.name} died from neglect...`);
    setTimeout(()=>{
        $('#end-section').fadeIn();
        $('#reload-button').on('click',()=>location.reload());
    },1000);
}
// PET MOVEMENT
function walkingRecursion() {
    const $petImages=$('#pet-images');
    const $petSitting=$('#pet-sitting');
    const $petBehind=$('#pet-behind');
    $petImages.css('animation-play-state','paused');
    setTimeout(()=>{
        $petSitting.fadeOut();
        setTimeout(()=>{
            $petBehind.fadeIn();
            setTimeout(()=>{
                $petBehind.fadeOut();
                setTimeout(()=>{
                    $petSitting.fadeIn();
                    $petImages.css('animation-play-state','running');
                    setTimeout(walkingRecursion,5000);
                },500);
            },2000)
        },500);
    },10000);
};
// SAVE FUNCTIONS
function saveGame() {
    let savedPets=JSON.parse(localStorage.getItem('savedPets')) || [];
    const currentPet=Tamagotchi.player;
    currentPet.sleepinessIntervalCheck=false;
    let existingPet=false;
    for (let i=0; i<savedPets.length; i++) {
        if (currentPet.name===savedPets[i].name) {
            savedPets[i]=currentPet;
            existingPet=true;
        };
    };
    if (!existingPet) {
        savedPets.push(currentPet);
    };
    localStorage.setItem('savedPets',JSON.stringify(savedPets));
    location.reload();
}
function viewSavedPets() {
    $('#saved-pets-section').fadeIn();
    $('#close').on('click',()=>$('#saved-pets-section').fadeOut());
    const $savedPetRows=$('.saved-pet-row');
    let savedPets=JSON.parse(localStorage.getItem('savedPets'));
    $savedPetRows.remove();
    const $savedPetsTable=$('#saved-pets-table');
    if (savedPets!==null) {
        savedPets.sort((x,y)=>x.age-y.age);
        for (let i=0;i<savedPets.length;i++) {
            const $newRow=$('<tr class="saved-pet-row">');
            const $newName=$(`<td id=index${i} class="name">${savedPets[i].name}</td>`);
            $newRow.append($newName);
            const $newAge=$(`<td>${savedPets[i].age}</td>`);
            $newRow.append($newAge);
            const $newDelete=$(`<td><button id=index${i} class="delete">Delete</button></td>`);
            $newDelete.on('click',deleteSinglePet);
            $newRow.append($newDelete);
            $savedPetsTable.append($newRow);
            $newName.on('click',loadSavedPet);
        };
    };
}
function loadSavedPet(e) {
    const $selected=$(e.target);
    const index=parseInt($selected.attr('id').slice(5));
    const savedPets=JSON.parse(localStorage.getItem('savedPets'));
    savedPets.sort((x,y)=>x.age-y.age);
    const selectedPet=savedPets[index];
    Tamagotchi.player=selectedPet;
    startGame();
}
function clearAllPets() {
    localStorage.removeItem('savedPets');
    viewSavedPets();
}
function deleteSinglePet(e) {
    const $selected=$(e.target);
    const selectedIndex=parseInt($selected.attr('id').slice(5));
    const savedPets=JSON.parse(localStorage.getItem('savedPets'));
    let newSavedPets=[];
    savedPets.forEach((element,index)=>{
        if (index!==selectedIndex) {
            newSavedPets.push(element);
        };
    });
    localStorage.setItem('savedPets',JSON.stringify(newSavedPets));
    viewSavedPets();
}
// SHOP FUNCTIONS
function openShop() {
    if ($('#pet-section').hasClass('lights-off')) {
        $('#game-message').text('Turn on the lights to access the shop');
        document.getElementById('not-active').play();
        updateGameMessage();
    } else {
        $('#shop-section').fadeIn();
        clearInterval(Tamagotchi.player.hungerInterval);
        clearInterval(Tamagotchi.player.boredomInterval);
        clearInterval(Tamagotchi.player.sleepinessInterval);
        Tamagotchi.player.sleepinessIntervalCheck=false;
        $('.shop-img').on('click',buyItem);
    };
}
function closeShop() {
    $('#shop-section').fadeOut();
    increaseHunger();
    increaseSleepiness();
    increaseBoredom();
}
function buyItem(e) {
    const $selected=$(e.target);
    if (!$selected.hasClass('purchased')) {
        const id=$selected.attr('id');
        if (id==='bed' && Tamagotchi.player.coins>=Tamagotchi.shopPrices.bed) {
            Tamagotchi.player.bed=true;
            Tamagotchi.player.coins-=Tamagotchi.shopPrices.bed;
            $('#bed').addClass('purchased');
            $('#bed-icon').addClass('reveal');
            document.getElementById('get-item').play();
        } else if (id==='toy' && Tamagotchi.player.coins>=Tamagotchi.shopPrices.toy) {
            Tamagotchi.player.toy=true;
            Tamagotchi.player.coins-=Tamagotchi.shopPrices.toy;
            $('#toy').addClass('purchased');
            $('#toy-icon').addClass('reveal');
            document.getElementById('get-item').play();
        } else if (id==='feeder' && Tamagotchi.player.coins>=Tamagotchi.shopPrices.feeder) {
            Tamagotchi.player.feeder=true;
            Tamagotchi.player.coins-=Tamagotchi.shopPrices.feeder;
            $('#feeder').addClass('purchased');
            $('#feeder-icon').addClass('reveal');
            document.getElementById('get-item').play();
        } else if (id==='hangman' && Tamagotchi.player.coins>=Tamagotchi.shopPrices.hangman) {
            Tamagotchi.player.hangman=true;
            Tamagotchi.player.coins-=Tamagotchi.shopPrices.hangman;
            $('#hangman').addClass('purchased');
            $('#hangman-button').show();
            $('#rps-button').text('Play Rock, Paper, Scissors');
            document.getElementById('get-item').play();
        } else {
            document.getElementById('not-active').play();
            $('#shop-title').text(`You can't afford this item.`);
            setTimeout(()=>$('#shop-title').text('Buy items that enhance your pet\'s life!'),2000);
        }
        updateCoins();
    }
}
// EVENT LISTENERS
$('#pet-name').on('click',()=>$('#pet-name').val(''));
$('#fave-food').on('click',()=>$('#fave-food').val(''));
$('#submit-button').on('click',(e)=>{
    e.preventDefault();
    if ($('#pet-name').val().trim() && $('#fave-food').val().trim()) {
        const name=$('#pet-name').val().trim();
        const food=$('#fave-food').val().trim();
        const body=Tamagotchi.bodyColorIndex;
        const foot=Tamagotchi.footColorIndex;
        const tail=Tamagotchi.tailColorIndex;
        const background=Tamagotchi.backgroundIndex;
        createPet(name,food,body,foot,tail,background);
    };
});
$('.color-pickers').on('click',colorPassThrough);
$('.background').on('click',backgroundPassThrough);
$('#save-button').on('click',saveGame);
$('#load-saved').on('click',viewSavedPets);
$('#clear').on('click',clearAllPets);
$('#close-shop').on('click',closeShop);
$('#shop-button').on('click',openShop);
$('#hangman-button').on('click',toggleHangman);