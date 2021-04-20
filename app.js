class Tamagotchi {
    constructor(name) {
        this.name=name;
        this.age=1;
        this.hunger=0;
        this.sleepiness=0;
        this.boredom=0;
        Tamagotchi.player.push(this);
    }
    static player={};
}

// EVENT LISTENERS
$('#pet-name').on('click',()=>$('#pet-name').val(''));