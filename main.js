video="";
statuses="";
objects=[];
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if (statuses!=""){
        objectDetector.detect(video,gotResult);
        document.getElementById("status").innerHTML="Status:Object Detected";
        document.getElementById("number").innerHTML="Number of objects detected: "+ objects.length;
        for(i=0; i<objects.length; i++){
            fill('red');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Object";
}
function modelLoaded(){
    console.log("ModelLoaded");
    statuses=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}