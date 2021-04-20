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

// Age increases every 5 minutes
function updateAge() {
    const player=Tamagotchi.player;
    const ageText=$('#age-text');
    let  currentAge=player.age;
    Tamagotchi.player.ageInterval=setInterval(()=>{
        Tamagotchi.player.age=currentAge++;
        ageText.text(currentAge);
    },300000);
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

// Hunger increases every 1.5 minutes
function increaseHunger() {
    const player=Tamagotchi.player;
    let currentHunger=player.hunger;
    Tamagotchi.player.hungerInterval=setInterval(()=>{
        Tamagotchi.player.hunger=currentHunger++;
        updateHunger();
    },90000);
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

// Sleepiness increases every 3 minutes
function increaseSleepiness() {
    const player=Tamagotchi.player;
    let currentSleepiness=player.sleepiness;
    Tamagotchi.player.sleepinessInterval=setInterval(()=>{
        Tamagotchi.player.hunger=currentSleepiness++;
        updateSleepiness();
    },180000);
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

// Boredom increases every 1 minute
function increaseBoredom() {
    const player=Tamagotchi.player;
    let currentBoredom=player.Boredom;
    Tamagotchi.player.boredomInterval=setInterval(()=>{
        Tamagotchi.player.boredom=currentBoredom++;
        updateBoredom();
    },60000);
}

// PLAYER ACTIONS
function feedPet() {
    clearInterval(Tamagotchi.player.hungerInterval);
    const player=Tamagotchi.player;
    let currentHunger=player.hunger;
    currentHunger--;
    Tamagotchi.player.hunger=currentHunger;
    updateHunger();
    setTimeout(increaseHunger,5000);
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
    $('#feed-button').on('click',feedPet);
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