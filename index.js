///////////// initialize variables and starting state ///////////////////////
var suits = ["H", "D", "C", "S"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
var suits1 = [];
var numbers1 = [];
var deck = [];
var hand = [];
var royal_flushes = 0;
var straight_flushes = 0;
var four_kinds = 0;
var full_houses = 0;
var flushes = 0;
var straights = 0;
var three_kinds = 0;
var two_pairs= 0;
var pairs = 0;
var nothing = 0;
var total_won = 0;
var coins = 5000;
var hand_holder;
var dealt_hand = [];
var jackb = ['A', 'J', 'Q', 'K'];
var flush_list = ["S,S,S,S,S", "C,C,C,C,C", "D,D,D,D,D", "H,H,H,H,H"];
var straight_list = [["A", "2", "3", "4", "5"],
              ["2", "3", "4", "5", "6" ], 
              ["3", "4", "5", "6", "7"], 
              ["4", "5", "6", "7", "8"], 
              ["5", "6", "7", "8", "9"], 
              ["6", "7", "8", "9", "T"],
              ["7", "8", "9", "T", "J"],
              ["8", "9", "T", "J", "Q"],
              ["9", "T", "J", "Q", "K"],
              ["T", "J", "Q", "K", "A"]];

$('#coins').html('Coins: ' + coins);
$('#claim').hide();

function makeDeck() { ////////////////////// makes the deck from scratch ///////////
  deck = [];
  numbers.forEach(n => {
    suits.forEach(s => {
      deck.push(n + s);
    });
  });
}

/////////////// functions to check the hands ///////////////////
function royal_flush(numbers1, suits1) {
  if (flush_list.includes(suits1.join()) && straight_list[9].sort().join() == numbers1.sort().join()) {
    return "true";
  }
}

function straight_flush(numbers1, suits1) {
  if (flush_list.includes(suits1.join())) {
    for (let index = 0; index < 9; index++) {
      if (straight_list[index].sort().join() == numbers1.sort().join()) {
        return "true";
      }
    }
  }
}

function four_kind(numbers1) {
  let counter = 0;
  let holder = [];
  numbers1.forEach(n=> {
    counter = 0;
    for (let i = 0; i < 5; i++) {
      if (numbers1[i] == n) {
        counter = counter + 1;
      }
    }
    holder.push(counter);
  });
  if (holder.sort().pop() == 4) {
    return "true";
  }
}

function full_house(numbers1) {
  let counter = 0;
  let holder = [];
  numbers1.forEach(n=> {
    counter = 0;
    for (let i = 0; i < 5; i++) {
      if (numbers1[i] == n) {
        counter = counter + 1;
      }
    }
    holder.push(counter);
  });
  if (holder.sort().pop() == 3 && holder.sort().reverse().pop() == 2) {
    return "true";
  }
}

function flush(suits1) {
  if (flush_list.includes(suits1.join()) == true)
  return "true";
}

function straight(numbers1) {
  let counter = 0;
  for (let i = 0; i < straight_list.length; i++) {
    counter = counter + 1;
    if (straight_list[i].sort().join() == numbers1.sort().join()) {
      return "true";
    }
  }
}

function three_kind(numbers1) {
  let counter = 0;
  let holder = [];
  numbers1.forEach(n=> {
    counter = 0;
    for (let i = 0; i < 5; i++) {
      if (numbers1[i] == n) {
        counter = counter + 1;
      }
    }
    holder.push(counter);
  });
  if (holder.sort().pop() == 3 && holder.sort().reverse().pop() == 1) {
    return "true";
  }
}

function two_pair(numbers1) {
  let counter = 0;
  let holder = [];
  numbers1.forEach(n=> {
    counter = 0;
    for (let i = 0; i < 5; i++) {
      if (numbers1[i] == n) {
        counter = counter + 1;
      }
    }
    holder.push(counter);
  });
  if ((holder.filter( m=> m == 2)).length == 4) {
    return "true";
  }
}

function jacks_or_better(numbers1) {
  let counter = 0;
  let holder = [];
  jackb.forEach(n=> {
    counter = 0;
    for (let i = 0; i < 5; i++) {
      if (numbers1[i] == n) {
        counter = counter + 1;
      }
    }
    holder.push(counter);
  });
  if ((holder.filter( m=> m == 2)).length == 1) {
    return "true";
  } 
}


////////////////////// click on cards to toggle hold ////////////////////////////
$('#card1').click(function() {
  if ($('#hold1').html() == "hold") {
    $('#hold1').html(" ");
  } else {
  $('#hold1').html("hold");
  }
});

$('#card2').click(function() {
  if ($('#hold2').html() == "hold") {
    $('#hold2').html(" ");
  } else {
  $('#hold2').html("hold");
  }
});

$('#card3').click(function() {
  if ($('#hold3').html() == "hold") {
    $('#hold3').html(" ");
  } else {
  $('#hold3').html("hold");
  }
});

$('#card4').click(function() {
  if ($('#hold4').html() == "hold") {
    $('#hold4').html(" ");
  } else {
  $('#hold4').html("hold");
  }
});

$('#card5').click(function() {
  if ($('#hold5').html() == "hold") {
    $('#hold5').html(" ");
  } else {
  $('#hold5').html("hold");
  }
});


///////////////////////deal button: deals next hand ////////////////////////////
$('#deal').click(function() {
   royal_flushes = 0;
   straight_flushes = 0;
   four_kinds = 0;
   full_houses = 0;
   flushes = 0;
   straights = 0;
   three_kinds = 0;
   two_pairs= 0;
   pairs = 0;
   nothing = 0;
   total_won = 0;
   $('.col-md-2').show();
  makeDeck();
  /////////deals a hand to be displayed on screen ////////////////
  dealt_hand = [];
  let a;
  for (let index = 0; index < 5; index++) {
    a = deck[(Math.floor(Math.random() * deck.length))];
    dealt_hand.push(a);
    deck = deck.filter( card=> card !== a);
  }

  //////////////// assign the cards to the html elements on screen ////////////////
  $('#card1').html(dealt_hand[0]);
  $('#card2').html(dealt_hand[1]);
  $('#card3').html(dealt_hand[2]);
  $('#card4').html(dealt_hand[3]);
  $('#card5').html(dealt_hand[4]);

  /////////////// hide and show elements on screen, update info /////////////
  $('#deal').hide();
  $('#draw').show();
  $('#choose').show();
  $('#helper').show();
  coins = coins - 50;
  $('#coins').html("Coins: " + coins);
  $('#winnings').html(" ");
});


//////////////  draw button:  calculates all winnings ////////////////
$('#draw').click(function() {
  $('#deal').show();
  $('#draw').hide();
  $('#choose').hide();
  $('.col-md-2').hide();
  hand_holder = "<h3>Hits</h3><h3>"; //// <----  holds the list of hits below the UI

  /////////////// calculate 50 hands worth in a for loop ///////////
  for (let index = 0; index < 50; index++) {
    makeDeck(); /// make deck again
    for (let j = 0; j < 5; j++) {
      deck = deck.filter(d=> d !== dealt_hand[j]); ////remove the dealt hand from deck
    }

    /////// check to see which cards are "hold" and push into hand /////
    hand = [];
    if ($('#hold1').html() == "hold") {
      hand.push($('#card1').html());
    }
    if ($('#hold2').html() == "hold") {
      hand.push($('#card2').html());
    }
    if ($('#hold3').html() == "hold") {
      hand.push($('#card3').html());
    }
    if ($('#hold4').html() == "hold") {
      hand.push($('#card4').html());
    }
    if ($('#hold5').html() == "hold") {
      hand.push($('#card5').html());
    }

    //// get random cards to refill discarded cards /////
    let rest = 5 - hand.length;
    for (let i = 0; i < (rest); i++) {
      let b;
      b = deck[Math.floor(Math.random() * deck.length)]; /// remove refill cards from deck
      hand.push(b);
      deck = deck.filter(e=> e !== b);
    }
    
    numbers1 = [];
    suits1 = []; 
    
    hand.forEach(card => {
      numbers1.push(card[0]);/// get numbers of new hand
      suits1.push(card[1]);//// get suits of new hand
    });
    
    ///////// start checking the hand values. if statements using functions above ////
    if (royal_flush(numbers1, suits1) == "true") {
      $('#royal_flush').show().css("color", "red");/// changes the values to red if hit
      hand_holder = hand_holder + hand + " --Royal Flush<br>";//// updates list that appears below UI
      royal_flushes = royal_flushes + 1;/// adds counts for values
      total_won = total_won + 250;////  adds the values
      coins = coins + 250;/// adds the coins///////////////////  same as each else statement below //////////////

    } else if (straight_flush(numbers1, suits1) == "true") {               
        hand_holder = hand_holder + hand + " --Straight Flush<br>";        
        $('#straight_flush').show().css("color", "red");                   
        straight_flushes = straight_flushes + 1;
        total_won = total_won + 40;
        coins = coins + 40;

    } else if (four_kind(numbers1) == "true") {
        hand_holder = hand_holder + hand + " --4 of a kind<br>";
        $('#four_kind').show().css("color", "red");
        four_kinds = four_kinds + 1;
        total_won = total_won + 20;
        coins = coins + 20;

    } else if (full_house(numbers1) == "true") {
        hand_holder = hand_holder + hand + " --Full House <br>";
        $('#full_house').show().css("color", "red");
        full_houses = full_houses + 1;
        total_won = total_won + 9;
        coins = coins + 9;
      
    } else if (flush(suits1) == "true") {
        hand_holder = hand_holder + hand + " --Flush<br>";
        $('#flush').show().css("color", "red");
        flushes = flushes + 1;
        total_won = total_won + 6;
        coins = coins + 6;
    } else if (straight(numbers1) == "true") {
        hand_holder = hand_holder + hand + " --Straight<br>";
        $('#straight').show().css("color", "red");
        straights = straights + 1;
        total_won = total_won + 5;
        coins = coins + 5;
    } else if (three_kind(numbers1) == "true") {
        hand_holder = hand_holder + hand + " --3 of a kind<br>";
        $('#three_kind').show().css("color", "red");
        three_kinds = three_kinds + 1;
        total_won = total_won + 3;
        coins = coins + 3;
    } else if (two_pair(numbers1) == "true") {
        hand_holder = hand_holder + hand + " --Two Pair<br>";
        $('#two_pair').show().css("color", "red");
        two_pairs = two_pairs + 1;
        total_won = total_won + 2;
        coins = coins + 2; 
    } else if (jacks_or_better(numbers1) == "true") {
        hand_holder = hand_holder + hand + " --Jacks or better<br>";
        $('#job').show().css("color", "red");
        pairs = pairs + 1;
        total_won = total_won + 1;
        coins = coins + 1; 
    } else {
        nothing = nothing + 1; ////  count hands with no value
    }
  }
  
  ////  update UI information //////////
  hand_holder = hand_holder + "</h3>";
  $('#royal_flush').html('Royal Flush: ' + royal_flushes);
  $('#straight_flush').html('Straight Flush: ' + straight_flushes);
  $('#four_kind').html('4 of a kind: ' + four_kinds);
  $('#full_house').html('Full House: ' + full_houses);
  $('#flush').html('Flush: ' + flushes);
  $('#straight').html('Straight: ' + straights);
  $('#three_kind').html('3 of a kind: ' + three_kinds);
  $('#two_pair').html('Two Pair: ' + two_pairs);
  $('#job').html('Jacks or Better: ' + pairs);
  $('#nothing').html('nothing: ' + nothing);
  $('#hold1').html(" ");
  $('#hold2').html(" ");
  $('#hold3').html(" ");
  $('#hold4').html(" ");
  $('#hold5').html(" ");
  $('#helper').hide();
  $('#deal').hide();
  $('#winnings').show().html("Total Coins won: " + total_won);
  $('#claim').show();
  $('#hand_list').show().html(hand_holder);
});


///////////////claim button: resets some information and updates coins /////////////////////
$('#claim').click(function() {
  $('#coins').html("Coins: " + coins);
  $('#deal').show();
  $('#claim').hide();
  $('#winnings').hide();
  $('#hand_list').hide();
  $('#royal_flush').html('Royal Flush: ').css("color", "blue");
  $('#straight_flush').html('Straight Flush: ').css("color", "blue");
  $('#four_kind').html('4 of a kind: ').css("color", "blue");
  $('#full_house').html('Full House: ').css("color", "blue");
  $('#flush').html('Flush: ').css("color", "blue");
  $('#straight').html('Straight: ').css("color", "blue");
  $('#three_kind').html('3 of a kind: ').css("color", "blue");
  $('#two_pair').html('Two Pair: ').css("color", "blue");
  $('#job').html('Jacks or better: ').css("color", "blue");
  $('#nothing').html(' ');
});