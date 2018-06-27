var settings = {
  //these will be the default settings for any given instance of this app
  notifications: true,

  first_launch: true,
  clock_in_time : {hr24: 8, min: 0},
  clock_out_time : {hr24: 17, min: 0},

  lunch_length_min : 60,

  program_year_id : 13,
  state_id : 93,
  program_id : 6310,
  program_url : "stbernard.oncorpsreports.com",

  submit_date : "2000-01-01",
  //location_name: "SBP SC",
  //location_lat: 34.070664,
  //location_lng: -81.000446,

  log_data: "",
};

function load(){
  var new_settings =
    JSON.parse(window.localStorage.getItem("corpslog_settings"));

  if(new_settings !== null){
    settings = new_settings;
  }
}

function save(){
  settings.first_launch = false;
  settings.log_data = $("#log").html();

  window.localStorage.setItem("corpslog_settings", JSON.stringify(settings));
}

function parseTime(str){
  var splt = str.split(":");

  return { 
    hr24: parseInt(splt[0]),
    min: parseInt(splt[1])
  };
}


function updateSettings(){
  settings.notifications = $("#notifications").prop("checked");

  if(settings.notifications){
    $("#notification_settings").animate({ opacity: 1 });
  }else{
    $("#notification_settings").animate({ opacity: 0.25 });
  }

  settings.clock_in_time = parseTime($("#clockintime").val());

  settings.clock_out_time = parseTime($("#clockouttime").val());

  settings.lunch_length_min = parseInt($("#breaklength").val());

  settings.submit_date = $("#submitdate").val();
  console.log(settings.submit_date);
}

function twoDig(str){
  if(str.length < 2)
    str = "0" + str;
  return str;
}

function commitSettings(){
  $("#notifications").prop("checked", settings.notifications);
  $("#clockintime").val(twoDig(settings.clock_in_time.hr24.toString()) + ":" + twoDig(settings.clock_in_time.min.toString()));
  $("#clockouttime").val(twoDig(settings.clock_out_time.hr24.toString()) + ":" + twoDig(settings.clock_out_time.min.toString()));

  $("#breaklength").val(settings.lunch_length_min.toString());

  $("#submitdate").val(settings.submit_date);
  console.log(settings.submit_date);

}

function getURL(){
  return (
    "https://secure.oncorpsreports.com/index.asp?"+
    "pageID=1"+
    "&programyearID="+settings.program_year_id+
    "&stID="+settings.state_id+
    "&prgID="+settings.program_id+
    "&memberlogin=X"+
    "&programWebSiteURL="+settings.program_url+
    "&redir=X&reset=1");
}

function getInjectionCode(){
  return "alert('Hello! Defining log data...');"; 
}
