$(document).ready(function () {

    let $upperKeyboard = $('#keyboard-upper-container');
    let $lowerKeyboard = $('#keyboard-lower-container');
    let sentenceNumber = 0;
    let letterNumber = 0;
    let errorCounter = 0;
    let startTime = new Date();

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    // display the currently expected sentence & letter
    $('#sentence').append(sentences[sentenceNumber]);
    $('#target-letter').append(sentences[sentenceNumber].charAt(letterNumber));

    // hide the uppercase keyboard when the page loads
    $upperKeyboard.hide();

    // While the shift key is held down, hide the lowercase keyboard and show the uppercase one (shift keyCode value is 16)
    $(document).keydown(function (e) {
        if (e.which === 16) {
            $lowerKeyboard.hide();
            $upperKeyboard.show();
        }
    });

    // When the shift key is released, show the lowercase keyboard and hide the uppercase one
    $(document).keyup(function (e) {
        if (e.which === 16) {
            $lowerKeyboard.show();
            $upperKeyboard.hide();
        }
    });

    // When keys are pressed, they should be highlighted in the browser.
    $(document).keypress(function (e) {
        // when key is pressed, set id # to key
        let $key = $('#' + e.key.charCodeAt(0));
        // highlight key pressed
        $key.css('background-color', 'yellow');

        $(document).keyup(function (e) {
            // when key is released, don't highlight
            $key.css('background-color', 'transparent');
        });

        if (sentenceNumber === sentences.length) {
            gameOver();
            return;
        } else if (letterNumber === (sentences[sentenceNumber].length)) {
            loadNewSentence();
        } else {
            checkForAccuracy(e.key);
            displayTargetLetter();
            moveYellowBlock();
        }
    });


    // display the currently expected letter in the center (div id="target-letter" provided for you)
    function displayTargetLetter() {
        letterNumber++;
        console.log(letterNumber)
        $('#target-letter').text(sentences[sentenceNumber].charAt(letterNumber));
    }

    function moveYellowBlock() {
        $('#yellow-block').css('left', '+=17.5px');
    }

    function loadNewSentence() {
        letterNumber = 0;
        sentenceNumber++;
        if (sentenceNumber === sentences.length) {
            return;
        }
        $('#sentence').text(sentences[sentenceNumber]);
        $('#yellow-block').css('left', '0px');
        $('#feedback').empty();
        $('#target-letter').text(sentences[sentenceNumber].charAt(letterNumber));
    }

    // if the correct key is pressed, indicate with a green check, else indicate with a red X
    function checkForAccuracy(key) {
        console.log(sentences[sentenceNumber].charAt(letterNumber));
        if (key === sentences[sentenceNumber].charAt(letterNumber)) {
            let correct = $('<span class="glyphicon glyphicon-ok"></span>');
            $('#feedback').append(correct);
        } else {
            let error = $('<span class="glyphicon glyphicon-remove"></span>');
            errorCounter++;
            $('#feedback').append(error);
        }
    };

    function gameOver() {
        let endTime = new Date();
        const numberOfWords = 54;
        let gameTime = Math.abs(startTime - endTime);
        let minutes = Math.floor((gameTime / 1000) / 60);
        let numErrors = errorCounter;
        let wmp = (numberOfWords / minutes - 2 * numErrors);
        alert(`You typed ${wmp} words per minute!`);
        console.log(endTime.getSeconds());
        $('#prompt-container').prepend('<button onClick="window.location.reload();">PlayAgain?</button>');

    };

});



