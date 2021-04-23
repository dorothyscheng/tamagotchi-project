const player = {
    petName: 'placeholder',
    coins:0,
    faveFood:'food',
    bodyColor: 'body',
    tailColor: 'tail',
    footColor: 'foot',
}

// const $target=$('.target');

$(document).on('keydown',move);
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
        $(`#${nextId}`).addClass('target');
        if ($(`#${nextId}`).hasClass('end')) {
            winMaze();
        }
    } else {
        invalidMove();
    }
}
function invalidMove() {
    document.getElementById('not-active').play();
}
function winMaze() {
    console.log('you won!');
    $(document).off('keydown',move);
}