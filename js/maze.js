const colors=['#000000','#ffffff','#808080','#f5f5dc','#ffa500','#ff0000','#0066ff','#ffff00','#00ffff','#ff0066','#0D2B73','#D4D7DE','#24781B'];
const player=JSON.parse(localStorage.getItem('finalPet'));
function move(e) {
    const $target=$('.target');
    const alpha="abcdefghijklmnopqrst";
    const currentId=$target.attr('id');
    const $currentCell=$(`#${currentId}`);
    const currentColumn=currentId.charAt(0);
    const currentRow=parseInt(currentId.slice(1));
    let nextColumn=currentColumn;
    let nextRow=currentRow;
    let validityCheck=true;
    // UP is 38
    if (e.keyCode===38) {
        if ($currentCell.hasClass('top')) {
            validityCheck=false;
        } else {
            nextRow=currentRow-1;
            if (nextRow<1) {
                validityCheck=false;
            };
        };
    };
    // DOWN is 40
    if (e.keyCode===40) {
        if ($currentCell.hasClass('bottom')) {
            validityCheck=false;
        } else {
            nextRow=currentRow+1;
            if (nextRow>16) {
                validityCheck=false;
            };
        };
    };
    // LEFT is 37
    if (e.keyCode===37) {
        if ($currentCell.hasClass('left')) {
            validityCheck=false;
        } else {
            const currentIndex=alpha.indexOf(currentColumn);
            let nextIndex=currentIndex-1;
            if (nextIndex<0) {
                validityCheck=false;
            };
            nextColumn=alpha[nextIndex];
        }
    };
    // RIGHT is 39
    if (e.keyCode===39) {
        if ($currentCell.hasClass('right')) {
            validityCheck=false;
        } else {
            const currentIndex=alpha.indexOf(currentColumn);
            let nextIndex=currentIndex+1;
            if (nextIndex>alpha.length-1) {
                validityCheck=false;
            };
            nextColumn=alpha[nextIndex];
        };
    };
    const nextId=nextColumn+nextRow;
    if (validityCheck) {
        $currentCell.removeClass('target');
        $currentCell.empty();
        $(`#${nextId}`).addClass('target');
        movePlayer();
        if ($(`#${nextId}`).hasClass('end')) {
            endMaze(1);
        }
    } else {
        invalidMove();
    }
}
function invalidMove() {
    const sound = document.getElementById('not-active');
    sound.pause();
    sound.currentTime=0;
    sound.play();
    if (player.timeRemaining>10) {
        player.timeRemaining-=5;
    } else {
        player.timeRemaining-=2;
    }

}
function endMaze(x) {
    clearInterval(player.mazeInterval);
    $(document).off('keydown',move);
    $('#maze-section').fadeOut();
    $('#maze-intro').fadeOut();
    $('.foot-fill').css('background-color',colors[player.footColorIndex]);
    $('.pet-fill').css('background-color',colors[player.bodyColorIndex]);
    $('.tail-fill').css('background-color',colors[player.tailColorIndex]);
    if (x===0) {
        document.getElementById('game-over').play();
        $('#final-game-message').text(`You were caught trying to sneak out and ${player.name} was captured.`)
        $('#pet-img').addClass('lose');
        setTimeout(()=>{
            $('#pet-img').fadeIn();
        },2000);
    } else {
        document.getElementById('final-win').play();
        $('#final-game-message').text(`You made it! ${player.name} is free!`)
        $('#pet-img').addClass('win');
        setTimeout(()=>{
            $('#pet-img').fadeIn();
        },2000);
    };
}
function movePlayer() {
    $('.target').append('<i id="player" class="fas fa-cat"></i>');
    if (player.bodyColorIndex!==0) {
        $('#player').css('color',colors[player.bodyColorIndex]);
    } else if (player.footColorIndex!==0) {
        $('#player').css('color',colors[player.footColorIndex]);
    } else if (player.tailColorIndex!==0) {
        $('#player').css('color',colors[player.tailColorIndex]);
    } else {
        $('#player').css('color','#000');
    };
};
function startMaze() {
    movePlayer();
    player.timeRemaining=30+player.coins;
    $('#timer-count').text(player.timeRemaining);
    setTimeout(()=>$('#end-img').fadeOut(),3000);
    setTimeout(()=>{
        $('#maze-timer').fadeIn();
        $('#maze-section').fadeIn();
        $(document).on('keydown',move);
        const alert=document.getElementById('alert');
        player.mazeInterval=setInterval(()=>{
            player.timeRemaining--;
            if (player.timeRemaining>10) {
                $('#timer-count').text(player.timeRemaining);
            } else if (player.timeRemaining>5) {
                alert.pause();
                alert.currentTime=0;
                alert.play();
                $('#maze-timer').addClass('urgent');
                $('#timer-count').text(player.timeRemaining);
            } else if (player.timeRemaining>0) {
                alert.pause();
                alert.currentTime=0;
                alert.play();
                $('#maze-timer').addClass('final');
                $('#timer-count').text(player.timeRemaining);
            } else {
                endMaze(0);
            }
        },1000)
    },4000);
};
startMaze();