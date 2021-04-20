class Tamagotchi {
    constructor(name) {
        this.name=name;
        this.age=1;
        this.hunger=0;
        this.sleepiness=0;
        this.boredom=0;
        this.hungerInterval;
        this.sleepinessInterval;
        this.boredomInteral;
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

// INCREMENT STATS
// Hunger increases every 30 seconds
function increaseHunger() {
    const player=Tamagotchi.player;
    let currentHunger=player.hunger;
    Tamagotchi.player.hungerInterval=setInterval(()=>{
        currentHunger++;
        Tamagotchi.player.hunger=currentHunger;
        updateHunger();
    },30000);
}
// Sleepiness increases every 5 seconds
function increaseSleepiness() {
    const player=Tamagotchi.player;
    let currentSleepiness=player.sleepiness;
    Tamagotchi.player.sleepinessInterval=setInterval(()=>{
        currentSleepiness++;
        Tamagotchi.player.sleepiness=currentSleepiness;
        updateSleepiness();
    },5000);
}
// Boredom increases every 20 seconds
function increaseBoredom() {
    const player=Tamagotchi.player;
    let currentBoredom=player.boredom;
    Tamagotchi.player.boredomInterval=setInterval(()=>{
        currentBoredom++;
        Tamagotchi.player.boredom=currentBoredom;
        updateBoredom();
    },20000);
}

// PLAYER ACTIONS
function feedPet() {
    clearInterval(Tamagotchi.player.hungerInterval);
    const player=Tamagotchi.player;
    let currentHunger=player.hunger;
    currentHunger--;
    Tamagotchi.player.hunger=currentHunger;
    updateHunger();
    setTimeout(increaseHunger,30000);
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
        $('#feed-button').on('click',feedPet);
        // $('#play-button').off();
        clearInterval(Tamagotchi.player.sleepinessInterval);
        setTimeout(increaseSleepiness,5000);
    };
};
// Sleeping for 2 seconds subtracts 1 sleepiness
function sleep() {
    clearInterval(Tamagotchi.player.sleepinessInterval);
    $('#feed-button').off();
    $('#play-button').off();
    const player=Tamagotchi.player;
    Tamagotchi.player.sleepinessInterval=setInterval(()=>{
        let currentSleepiness=player.sleepiness;
        currentSleepiness--;
        Tamagotchi.player.sleepiness=currentSleepiness;
        updateSleepiness();
    },2000);
}

function startGame() {
    const player=Tamagotchi.player;
    $('#start-screen').fadeOut();
    $('#title').fadeOut();
    $('#title').hide().text(player.name).fadeIn();
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
};

function namePet(name) {
    new Tamagotchi(name);
    startGame();
}

// EVENT LISTENERS
$('#pet-name').on('click',()=>$('#pet-name').val(''));
$('#submit-button').on('click',(e)=>{
    e.preventDefault();
    if ($('#pet-name').val().trim()) {
        namePet($('#pet-name').val().trim());
    };
});