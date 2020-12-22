var dog;
var happyDog;
var dogImg;
var png;
var database;
var foodS;
var foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var engine,world;
function preload(){
  dogImg=loadImage("Images/dogImg.png");
  happyDog=loadImage("Images/dogImg1.png");
}
function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}
function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  fill(255,255,254);
  textSize(13);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12+"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed :"+ lastFed+"AM",350,30);
  }
  drawSprites();
}
//TO READ FOOD STOCK 
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
//TO UPDATE FOOD STOCK AND LAST FED TIME
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
})
}
//FUNCTION TO ADD FOOD IN STOCK
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
})
}

