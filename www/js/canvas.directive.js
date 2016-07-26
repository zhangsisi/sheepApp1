(function () {
    var app = angular.module('starter.controllers');
    app.directive('sheepcanvas', function ($document, $window) {
        return {　　
            template: '<div id="container" class="areadiv"></div><button class="areadivbtn" id="biggerbtn">放大</button><button class="areadivbtn" id="smallerbtn">缩小</button>',

            　　restrict: 'E',

            　　scope: {
                currentSheeps: '='
            },

              //后期想要自动获取并绑定牧羊人的真实位置   请在此页面按ctrl+f  搜索TODO   会跳转到具体代码处  按照说明修改

            　link: function (scope, iElement, iAttrs) {
                var document = $document[0];
                var window = $window;
                var bgSprite;
                var person;
                var parent = document.getElementById('container');
                var scale = 0.5;
                var game = new Phaser.Game(parent.offsetWidth, parent.offsetHeight, Phaser.AUTO, 'container', state);
                var timer;
                game.state.add('state', state);
                game.state.start('state');

                scope.resource = [];
                var context_globle = {
                  alertSheep:[],
                  sheeps:[],
                  transfer:5,//一像素多少米
                  blinkspeed:600//问题羊的闪烁间隔
                };



                function updateDatas(){
                  for (var o = 0; o < scope.resource.length; o++) {
                    scope.resource[o].error = false;
                    if(!!context_globle.alertSheep[scope.resource[o].deviceId]){
                      scope.resource[o].showAlert = context_globle.alertSheep[scope.resource[o].deviceId];
                    }else{
                      scope.resource[o].showAlert = false;
                    }
                  }
                  bindSheeps();
                }

                function bindSheeps(){
                  for(var o in context_globle.sheeps){
                    context_globle.sheeps[o].kill();
                  }
                  context_globle.sheeps = [];
                  bgSprite.children = [];
                  bgSprite.addChild(person);

                  for (var o in scope.resource) {
                    if (o == 0) {
                      person.personlongitude = Number(scope.resource[0].longitude)+0.00031;   //TODO     此处应该填写牧羊人真实纬度
                      person.personlatitude = Number(scope.resource[0].latitude)-0.00041;     //TODO     此处应该填写牧羊人真实经度
                    }
                    var pointx = person.personlongitude;
                    var pointy = person.personlatitude;
                    //y是纬度   x是经度
                    var y = scope.resource[o].latitude;
                    y = person.y+((y-pointy)*111000*context_globle.transfer);
                    var x = scope.resource[o].longitude;
                    x = person.x+((x-pointx)*91125*context_globle.transfer);
                    scope.resource[o].x = x;
                    scope.resource[o].y = y;
                    var sheep;
                    var talk;
                    var text;
                    if(scope.resource[o].bodyTemEr>0){
                      scope.resource[o].error = !scope.resource[o].error;
                      if(scope.resource[o].error){
                        sheep = game.make.sprite(scope.resource[o].x, scope.resource[o].y, 'sheepsick');
                      }else{
                        sheep = game.make.sprite(scope.resource[o].x, scope.resource[o].y, 'sheepsick');
                      }
                    }else{
                      sheep = game.make.sprite(scope.resource[o].x, scope.resource[o].y, 'sheep');
                    }
                    talk = game.make.sprite(scope.resource[o].x-sheep.width, scope.resource[o].y-sheep.height*1.8, 'talk');
                    var style = { font: "12px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: talk.width, align: "left" };
                    var str = "设备号:"+scope.resource[o].deviceId+"\n";
                    if(scope.resource[o].alarmMsgList.length>0){
                      str += "消息:";
                    }
                    for(var i in scope.resource[o].alarmMsgList){
                      var msg = scope.resource[o].alarmMsgList[i];
                      str += msg+"\n"
                    }
                    if(scope.resource[o].bodyTemEr>0){
                      str += "羊群体温异常";
                    }
                    text = game.make.text(20, 10,str, style);
                    talk.addChild(text);
                    if(scope.resource[o].showAlert){
                      bgSprite.addChild(talk);
                    }

                    bgSprite.addChild(sheep);
                    sheep.inputEnabled = true;
                    sheep.input.pixelPerfectClick = true;
                    sheep.sheepindex = o;
                    sheep.bodyTemEr = scope.resource[o].bodyTemEr;
                    sheep.blink = false;
                    sheep.events.onInputDown.add(clicked, this);
                    context_globle.sheeps.push(sheep);
                    context_globle.sheeps.push(talk);
                    context_globle.sheeps.push(text);
                  }
                }

                function state( ) {
                  this.init = function () {
                    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                    game.scale.pageAlignHorizontally = true ; //水平居中
                    game.scale.pageAlignVertically = true;    //垂直居中
                  };
                  this.preload = function () {
                    game.load.image('bg', 'img/bg.jpg');
                    game.load.image('person', 'img/person.png');
                    game.load.image('sheep', 'img/sheep.png');
                    game.load.image('sheepsick', 'img/sheepsick.png');
                    game.load.image('blank','img/blank.png');
                    game.load.image('talk', 'img/talk.png');
                    timer = game.time.create(false);
                    timer.add(context_globle.blinkspeed, blink, this);
                    timer.start();
                  };
                  this.create = function () {
                    game.stage.setBackgroundColor(0x000000);
                    game.world.setBounds(0, 0, 3264, 2488);
                    document.getElementById('biggerbtn').onclick = bigger;
                    document.getElementById('smallerbtn').onclick = smaller;
                    initSprite();
                  };
                  this.update = function () {

                  };
                  this.render = function () {};
                }

                function initSprite(){
                  bgSprite = game.add.sprite(0, 0, 'bg');
                  bgSprite.inputEnabled = true;
                  bgSprite.input.enableDrag();
                  bgSprite.events.onDragStart.add(dragStart);
                  bgSprite.events.onDragUpdate.add(dragUpdate);
                  bgSprite.events.onDragStop.add(dragStop);
                  person = game.make.sprite(bgSprite.width/2, bgSprite.height/1.6, 'person');
                  bgSprite.addChild(person);
                  bgSprite.scale.setTo(scale,scale);
                  bgSprite.x -= bgSprite.width/2 - screen.width/2;
                  bgSprite.y -= bgSprite.height/1.6 - screen.height/2;
                  scope.$watch('currentSheeps', function () {
                    scope.resource = angular.copy(scope.currentSheeps);
                    updateDatas();
                  });
                }

                function dragStart() {
                }

                function dragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
                }

                function dragStop() {
                }

                function clicked(p){
                  scope.resource[p.sheepindex].showAlert = !scope.resource[p.sheepindex].showAlert;
                  context_globle.alertSheep[scope.resource[p.sheepindex].deviceId] = scope.resource[p.sheepindex].showAlert;
                  bindSheeps();
                }

                function bigger(){
                  if(scale>=1.5)return;
                  scale += 0.05;
                  var oldx = bgSprite.width;
                  var oldy = bgSprite.height;
                  bgSprite.scale.setTo(scale,scale);
                  bgSprite.x -= bgSprite.width-oldx;
                  bgSprite.y -= bgSprite.height-oldy;
                }

                function smaller(){
                  if(scale<=0.5)return;
                  scale -= 0.05;
                  var oldx = bgSprite.width;
                  var oldy = bgSprite.height;
                  bgSprite.scale.setTo(scale,scale);
                  bgSprite.x -= bgSprite.width-oldx;
                  bgSprite.y -= bgSprite.height-oldy;
                }

                function blink(){
                  for(var o in context_globle.sheeps){
                    var sheep = context_globle.sheeps[o];
                    if(sheep.bodyTemEr>0){
                      if(!!sheep.blink){
                        sheep.loadTexture("blank");
                      }else{
                        sheep.loadTexture("sheepsick");
                      }
                      sheep.blink = !sheep.blink;
                    }
                  }
                  timer.add(context_globle.blinkspeed, blink, this);
                }



              }
        };
    });
})();
