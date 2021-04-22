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
        this.boredomInterval;
        this.ageInterval;
        this.bodyColorIndex=body;
        this.footColorIndex=foot;
        this.tailColorIndex=tail;
        this.backgroundIndex=background;
        this.bed=false;
        this.feeder=false;
        this.toy=false;
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
    static bodyColorIndex=0;
    static footColorIndex=2;
    static tailColorIndex=1;
    static backgroundIndex=0;
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
// Hunger increases every 15 seconds
function increaseHunger() {
    Tamagotchi.player.hungerInterval=setInterval(()=>{
        Tamagotchi.player.hunger++;
        updateHunger();
        if (Tamagotchi.player.hunger>10) {
            endGame();
        };
    },15000);
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
// Boredom increases every 10 seconds
function increaseBoredom() {
    Tamagotchi.player.boredomInterval=setInterval(()=>{
        Tamagotchi.player.boredom++;
        updateBoredom();
        if (Tamagotchi.player.boredom>10) {
            endGame();
        };
    },10000);
}
// PLAYER ACTIONS
function feedPet() {
    if (Tamagotchi.player.hunger>0) {
        $('#feed-button').off();
        $('#game-message').text(`${Tamagotchi.player.name} loves ${Tamagotchi.player.faveFood}!`);
        updateGameMessage();
        Tamagotchi.player.hunger--;
        console.log(`decreased hunger to ${Tamagotchi.player.hunger}`);
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
        setTimeout(()=>{
            clearInterval(Tamagotchi.player.sleepinessInterval);
            increaseSleepiness();
        },5000);
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
            if (Tamagotchi.player.sleepiness===0) {
                $('#game-message').text(`${Tamagotchi.player.name} is awake!`);
                toggleLights();
                updateGameMessage();
            }
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
    const playerChoice=$(e.target).attr('id');
    const petChoice=$('#pet-choice-text').text().toLowerCase();
    const $rpsMessage=$('#rps-message');
    $('#pet-choice').toggleClass('reveal');
    if (playerChoice===petChoice) {
        $rpsMessage.text('You tied!');
    } else if (petChoice==='rock') {
        if (playerChoice==='paper') {
            $rpsMessage.text('You won!');
            Tamagotchi.player.coins+=2;
        } else if (playerChoice==='scissors') {
            $rpsMessage.text('You lost!');
            Tamagotchi.player.coins--;
        };
    } else if (petChoice==='paper') {
        if (playerChoice==='rock') {
            $rpsMessage.text('You lost!');
            Tamagotchi.player.coins--;
        } else if (playerChoice==='scissors') {
            $rpsMessage.text('You won!');
            Tamagotchi.player.coins+=2;
        };
    } else if (petChoice==='scissors') {
        if (playerChoice==='rock') {
            $rpsMessage.text('You won!');
            Tamagotchi.player.coins+=2;
        } else if (playerChoice==='paper') {
            $rpsMessage.text('You lost!');
            Tamagotchi.player.coins--;
        };
    };
    decreaseBoredom();
    updateCoins();
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
// GAME CREATION FUNCTIONS
function startGame() {
    const player=Tamagotchi.player;
    $('#start-screen').fadeOut();
    $('#saved-pets-section').fadeOut();
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
    $('#shop-section').fadeIn();
    clearInterval(Tamagotchi.player.hungerInterval);
    clearInterval(Tamagotchi.player.boredomInterval);
    clearInterval(Tamagotchi.player.sleepinessInterval);
}
function closeShop() {
    $('#shop-section').fadeOut();
    increaseHunger();
    increaseSleepiness();
    increaseBoredom();
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