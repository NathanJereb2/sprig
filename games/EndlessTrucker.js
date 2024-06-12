/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Endless Trucker
@author: Nathan Jereb
@tags: []
@img: ""
@addedOn: June 11th 2024
*/

//Use the up and down arrows to doge the barricades
// Made this for my dad for father's day (and birthday too since its in the same month)

const player = "p"
const player2 = "q"
const obstical = "o"
const backgroundsky = "s"
const road = "r"
var dead = false;
var score = 0;

setLegend(
  [ player, bitmap`
.00.............
.00.0...........
.....LL.........
......L.........
......L33333....
......L333333...
......L7737273..
......L77377211.
3333333300333311
3333333333333331
13LLL33333LLL331
1L000L333L000L31
.0LLL0...0LLL0..
.0L0L0...0L0L0..
.0LLL0...0LLL0..
..000.....000...`],
  [ player2, bitmap`
.....LL.........
......L.........
......L33333....
......L333333...
......L7737273..
......L77377211.
3333333300333311
3333333333333331
13LLL33333LLL331
1L000L333L000L31
.0LLL0...0LLL0..
.0L0L0...0L0L0..
.0L0L0...0L0L0..
.0L0L0...0L0L0..
.0LLL0...0LLL0..
..000.....000...`],
  [ obstical, bitmap`
..33........33..
..33........33..
.LLLL......LLLL.
0000990000990000
9000099000099000
9900009900009900
0990000990000990
.L11L......L11L.
.L11L......L11L.
0990000990000990
0099000099000099
0009900009900009
0000990000990000
.L11L......L11L.
.L11LLLLLLLL11L.
L1LL11111111LL1L`],
  [ backgroundsky, bitmap`
7777777777777777
7777777777777777
7777722227777777
7777222222777777
7772222222277777
7722222222222777
7772222222227777
7777777777777777
7777777777777777
7777777777777777
7777777772222777
7777777722222277
7777772222222227
7777722222222222
7777772222222227
7777777777777777`],
  [ road, bitmap`
0000000000000000
0000000000000000
1111111111111111
L66LL66LL66LL66L
L66LL66LL66LL66L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L66LL66LL66LL66L
L66LL66LL66LL66L
1111111111111111
0000000000000000
0000000000000000`],
)

setSolids([player, player2, backgroundsky])
const loop = setInterval(gameplay, 1000)

let level = 0
const levels = [
  map`
ssssssssss
ssssssssss
..........
p.........
..........`
]
setBackground(road)

setMap(levels[level])

setPushables({
  [ player ]: []
});

onInput("w", () =>{
  up()
});
onInput("i", () =>{
  up()
});
onInput("s", () =>{
  down()
});
onInput("k", () =>{
  down()
});

function up(){
  if(getAll(player).length == 1){
    getFirst(player).y -= 1;
  }else{
    getFirst(player2).y -= 1;
  }
}

function down(){
  if(getAll(player).length == 1){
    getFirst(player).y += 1;
  }else{
    getFirst(player2).y += 1;
  }
}

function gameplay(){
  addText("Score:" + score, {
    x: 5,
    y: 2,
    color: color`4`
  });
  if(!dead){
    score += 1;
  }
  if(getAll(player).length == 1){
    var x = getFirst(player).x;
    var y = getFirst(player).y;
    clearTile(x, y);
    addSprite(x, y, player2);
  }else if(getAll(player2).length == 1){
    var x = getFirst(player2).x;
    var y = getFirst(player2).y;
    clearTile(x, y);
    addSprite(x, y, player);
  }else if(getFirst(player) == null && getFirst(player2) == null){
    end();
  }
  var random = Math.floor(Math.random() * 7 + 1);
  if(getAll(obstical).length >= 0){
    moveObsticals();
  }
  addObsticals(random);
  moveObsticals();
}

function addObsticals(num){
  if(num == 1){
    addSprite(9, 2, obstical);
    addSprite(9, 4, obstical);
  }else if(num == 2){
    addSprite(9, 3, obstical);
    addSprite(9, 4, obstical);
  }else if(num == 3){
    addSprite(9, 2, obstical);
    addSprite(9, 3, obstical);
  }
  moveObsticals();
}

function moveObsticals(){
  for(var i = 0; i < getAll(obstical).length - 1; i++){
    if(getAll(obstical)[i].x == 0){
      var ox = getAll(obstical)[i].x;
      var oy = getAll(obstical)[i].y;
      clearTile(ox, oy);
    }else{
      getAll(obstical)[i].x -= 1;
    }
  }
}

function end(){
  addText("Game Over", {
    x: 0,
    y: 1,
    color: color`3`
  });
  dead = true;
}