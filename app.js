$(document).ready(function () {

    let $upperKeyboard = $('#keyboard-upper-container');
    let $lowerKeyboard = $('#keyboard-lower-container');

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    // hide the uppercase keyboard when the page loads
    $upperKeyboard.hide();

    // While the shift key is held down, hide the lowercase keyboard and show the uppercase one
    // the shift keyCode value is 16
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
        let $key = $('#' + e.which);
        $key.css('background-color', 'yellow');
    })

});