var browserRef;

var submit_button_prev_text;
var submit_button;

function openBrowser(url, code){
  if(typeof cordova === "undefined") return;

  var target = "_system";

  var options = "location=yes,hidden=yes";

  injection_code = code;

  browserRef = window.open(url, target, options);

  browserRef.addEventListener('loadstart', loadStart);

  browserRef.addEventListener('loadstop', loadStop);

  browserRef.addEventListener('loaderror', loadError);
}

function loadStart(){
  submit_button_prev_text = $(submit_button).text();
  $("submit_log").html("<div class='inset'>LOADING</div>");
}

function loadStop(){
  $("submit_log").html("<div class='inset'>SUBMIT HOURS</div>");

  if(browserRef != undefined){
    browserRef.show();
  }

  $(submit_button).text(submit_button_prev_text);
}

function loadError(params){
  console.log(params);
}
