function preload() {
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

img = "";
Status = "";
objects = [];

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby"; 
}


function modelLoaded() {
    console.log("modelLoaded");
    Status = true;
    objectDetector.detect(video, gotResult);
}


function gotResult(error, results) {
    if(error) {
    console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() 
{
    image(video, 0, 0, 380, 380);


        for(i = 0; i < objects.length;  i++) 
        {
            if(objects[i].label = "person") {

            document.getElementById("status").innerHTML = "Status: Baby Detected";
            fill("#0000FF");
            percent = floor(objects[i].confidence * 100);
            
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            stroke("#0000FF");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            alarm.stop()

            }
            else {
                document.getElementById("status").innerHTML = "Status: Baby Not Detected"; 
                alarm.play();
            }
        }

        if(objects.length < 0) {
            document.getElementById("status").innerHTML = "Status: Baby Not Detected";
            alarm.play();
        }

    }

