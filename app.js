class Tamagotchi {
    constructor(name,faveFood,body,foot,tail,background) {
        this.name=name;
        this.age=1;
        this.hunger=5;
        this.sleepiness=2;
        this.boredom=2;
        this.faveFood=faveFood;
        this.hungerInterval;
        this.sleepinessInterval;
        this.boredomInterval;
        this.ageInterval;
        this.bodyColorIndex=body;
        this.footColorIndex=foot;
        this.tailColorIndex=tail;
        this.backgroundIndex=background;
        Tamagotchi.player=this;
    }
    static player={};
    static colors=['#000000','#ffffff','#808080','#f5f5dc','#ffa500','#ff0000','#0066ff','#ffff00','#00ffff','#ff0066','#0D2B73','#D4D7DE','#24781B'];
    static backgrounds=[
        '',
        'https://images.unsplash.com/photo-1603033156166-2ae22eb2b7e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1913&q=80',
        'https://images.unsplash.com/photo-1568729064400-d81b375ab4ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3626&q=80',
        'https://images.unsplash.com/photo-1544612318-bcab56ed6311?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2207&q=80',
        'https://images.unsplash.com/photo-1598967460051-c2ffd802d09e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2106&q=80'
    ];
    static bodyColorIndex=0;
    static footColorIndex=2;
    static tailColorIndex=1;
    static backgroundIndex=0;
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
    setTimeout(()=>$('#game-message').removeClass('reveal'),3000);
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
        $('#feed-button').off();
        $('#game-message').text(`${Tamagotchi.player.name} loves ${Tamagotchi.player.faveFood}!`);
        updateGameMessage();
        Tamagotchi.player.hunger--;
        updateHunger();
        setTimeout(()=>$('#feed-button').on('click',feedPet),3000);
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
        $('.pet').removeClass('hide');
        $('#pet-section').css('background-image',`url(${Tamagotchi.backgrounds[player.backgroundIndex]})`);
        $('#feed-button').off();
        $('#play-button').off();
        $('#feed-button').on('click',feedPet);
        $('#play-button').on('click',togglePlay);
        clearInterval(Tamagotchi.player.sleepinessInterval);
        setTimeout(increaseSleepiness,5000);
    };
};
function sleepMessage() {
    $('#game-message').text(`Shh...${Tamagotchi.player.name} is sleeping!`);
    updateGameMessage();
}
// Sleeping for 10 seconds subtracts 1 sleepiness
function sleep() {
    if (Tamagotchi.player.sleepiness>0) {
        clearInterval(Tamagotchi.player.sleepinessInterval);
        $('.pet').addClass('hide');
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
        $('#rps-container').slideDown();
        $('.rps-image').on('click',resolveRPS);
    } else {
        $('#game-message').text(`${Tamagotchi.player.name} isn't bored!`);
        updateGameMessage();
        togglePlay();
    };
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
    Tamagotchi.player.boredom--;
    updateBoredom();
};

function startGame() {
    const player=Tamagotchi.player;
    $('#start-screen').fadeOut();
    $('#title').fadeOut();
    $('#title').hide().text(player.name).fadeIn();
    $('#pet-section').css('background-image',`url(${Tamagotchi.backgrounds[player.backgroundIndex]})`);
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
        console.log(Tamagotchi.bodyColorIndex);
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
    clearInterval(Tamagotchi.player.ageInterval);
    $('#play-screen').fadeOut();
    $('body').removeClass('animate-color');
    $('#end-message').hide().text(`${Tamagotchi.player.name} died from neglect...`);
    setTimeout(()=>{
        $('#end-message').fadeIn();
    },1000);
}
// PET MOVEMENT
function walkingRecursion() {
    const $petImages=$('#pet-images');
    const $petSitting=$('#pet-sitting');
    const $petBehind=$('#pet-behind');
    $petImages.css('animation-play-state','paused');
    $petSitting.fadeOut();
    Tamagotchi.player.walkingTimeout1= setTimeout(()=>{
        $petBehind.fadeIn();
        Tamagotchi.player.walkingTimeout2= setTimeout(()=>{
            $petBehind.fadeOut();
            Tamagotchi.player.walkingTimeout3= setTimeout(()=>{
                $petSitting.fadeIn();
                $petImages.css('animation-play-state','running');
                Tamagotchi.player.walkingTimeout4= setTimeout(walkingRecursion,5000);
            },500);
        },5000)
    },500);
};
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