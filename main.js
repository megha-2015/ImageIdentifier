  /*Webcam.set - is a function of webcam.js to see the properties for the live
view of the webcam.*/
  Webcam.set({
    width:350,
    height:300,
    image_format : 'png', /*can be jpeg, png, jpg*/
    png_quality:90 /*means the quality of the live view of a webcam.*/
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );
/*webcam.attach() function - it will ask for permission to
    access the webcam, and start the live view in the HTML element passed inside
    webcam.attach().
    we haven’t triggered the webcam inside a function, we have just
    written it, so as a result as soon as the page is loaded the webcam will get
    triggered, and you will get a popup asking for the permission.*/

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
      /*Webcam.snap() is a predefined function of webcam.js used to take images
from a webcam, this function contains data_uri that can be used to show
preview of the image which generates after taking a snapshot. we
will use this data_uri to display the image.
*/

        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        /*We are giving id to the img tag, so that later we can take this image from the img tag and use
         it for comparing it with the model.
    ]    Now in src of the img tag we will pass data_uri. So that this image gets 
          updated with the selfie taken and gets displayed.*/

    });
}

/*a library ml5.js is used to work with machine learning.
ml5.js helps to work with different models and do a comparison between our input
(image, audio, etc) with the model, and give the result.
One of the features of ml5.js it provides a pre-trained model which detects the images
from a video OR webcam live view.*/
  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modelLoaded);
/*imageClassifier is a predefined function of ml5.js that is used to
trigger the ml5.js image classification function.
modelLoaded - function will start the ml5 image classification.
*/

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
    /*classifier - is the variable that holds the model which we had imported in 
    the starting of ml5.js coding in the previous class.
    classify - is a predefined function of ml5.js that is used to compare the
    captured image with the model, and get the results.
    classify contains 2 parameters - img - captured image and gotResult - function which will hold the result of comparison*/

  }


function gotResult(error, results) {
  /*The purpose of this function is to show the result which is achieved after identifying the
captured image using the model in the check() function*/
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
  }
}
