var actionNumber = 0;
var firstClick;
var secondClick;
var tries = 0;
var end = 0;
$(document).ready(function() {
  $('[data-action="launchGame"]').on('click', function() {
    $.get('http://192.168.33.76:3000/init', function(data) {
      document.getElementById('mainDiv').style.display = "flex";
    })
  });
  function play() {
    if ($(this).children('img').length == 0) {
      $('.div').off();
      actionNumber ++;
      var number = this.dataset.number;
      var el = this;
      $.post('http://192.168.33.76:3000/check', {'number': number})
      .done(function(data) {
        $(el).html('<img data-img="' + data.response +'" class="imgBG" src="./imgs/' + data.response + '.jpg">');
        if (actionNumber == 1) {
          firstClick = el;
          $('.div').on('click', play);
        } else if (actionNumber == 2) {
          $( ".score" ).html(tries + " tries");
          tries++;
          console.log(tries);
          secondClick = el;
          if ($(firstClick).children('img')[0].dataset.img == $(secondClick).children('img')[0].dataset.img) {
            $('.div').on('click', play);
            end++;
            if (end == 10) {
              var score = tries;
              $.post('http://192.168.33.76:3000/updateScore', {'score': score})
              .done(function(data) {
                if (data.victory) {
                  $( ".score" ).html("You did it in " + score + " tries !" + " You scored a new record in " + data.score + " tries !");
                } else {
                  $( ".score" ).html("You did it in " + score + " tries !" + " HighScore is " + data.score + " tries !");
                }
              });
              $('.div').off();
            }
            //console.log(end);
          } else {
            setTimeout(function() {
              $(firstClick).html('');
              $(secondClick).html('');
              $('.div').on('click', play);
            }, 600)
          }
          actionNumber = 0;
        }
      });
    } else {
      //nothing happens
    }
  }
  $('.div').on('click', play);
});
