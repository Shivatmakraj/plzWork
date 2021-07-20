objects = [];
status = ""
video = ""
function preload() {
    video = createVideo("video.mp4")
    
}
function setup() {
    canvas = createCanvas(480, 400);
    canvas.center();
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 400)
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED OwO";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResults( error,results) {

    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function PLAY() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS:DETECTING IMAGE UwU";
}
function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

