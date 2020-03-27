import { game } from './game.js';

$(document).ready(function() {
  // Initialization
  // Create game object, pass in the array of squares as constructor
  let squares = $('#board tr #square');

  let logic = new game($.makeArray(squares));

  $('#board').on('click', '#square', function(event) {
    event.preventDefault();

    /* If the current square doesn't have any marks,
        Mark it. */
    if (!($(this).hasClass('markP1') || $(this).hasClass('markP2'))) {
      if (logic.player1turn) {
        $(this).addClass('markP1');
        if (logic.hasWinner()) {
          logic.resetGame('Player one won!'); //
        
          logic = new game($.makeArray(squares)); //  start new game
        } else logic.player1turn = !logic.player1turn;
      } else {
        $(this).addClass('markP2');
        if (logic.hasWinner()) {
          logic.resetGame('Player two won!'); //  reset classes
          
          $('#modelId').modal('toggle'); //Toggle pop up result
          logic = new game($.makeArray(squares)); //  start new game
        } else logic.player1turn = !logic.player1turn;
      }
    }
  });

  // For unmarked square
  //  mouseenter
  $('#board').on('mouseenter', '#square', function(event) {
    if (!($(this).hasClass('markP1') || $(this).hasClass('markP2'))) {
      event.preventDefault();

      $(this).animate(
        {
          opacity: 0.2
        },
        500,
        () => {}
      );
    }
  });
  // mouseleave
  $('#board').on('mouseleave', '#square', function(event) {
    if (!($(this).hasClass('markP1') || $(this).hasClass('markP2'))) {
      $(this).animate(
        {
          opacity: 0
        },
        500,
        () => {}
      );
    }
  });
});
