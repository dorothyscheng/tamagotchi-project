class Tamagotchi {
    constructor(name) {
        this.name=name;
        this.age=1;
        this.hunger=4;
        this.sleepiness=3;
        this.boredom=2;
        Tamagotchi.player=this;
    }
    static player={};
}

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

function startGame() {
    const player=Tamagotchi.player;
    $('#start-screen').fadeOut();
    $('#title').fadeOut();
    $('#title').hide().text(player.name).fadeIn();
    $('#play-screen').fadeIn();
    updateHunger();
    updateSleepiness();
    updateBoredom();
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