function setNotifications(){
  if(settings.notifications){
    getReminderPermission(function(){
      clearReminders();

      addTimeReminder(1, "Good Morning!", "Don't forget to punch in today!",
        settings.clock_in_time.hr24, settings.clock_in_time.min);
      addTimeReminder(2, "Great Work Today!", "Don't forget to punch out!",
        settings.clock_out_time.hr24, settings.clock_out_time.min);

      addDateReminder(3, "Your hours are due today!", "Don't forget to submit them!", 
        settings.submit_date);
    });
  }else{
    clearReminders();
  }
}

$(document).ready(function(){
  //initialization:
  //load all data from local storage
  load();
  commitSettings();
  updateSettings();

  document.addEventListener("deviceready", setNotifications, false);

  //hide any starting overlays if it's not the first launch
  if(!settings.first_launch){
    hide("#welcome");
    $(".floor").css("display", "none");
  }

  //hide the log and put the data taken from settings in it
  hide("#log_menu");
  hide("#settings_menu");

  if(settings.log_data !== "")
    $("#log").html(settings.log_data);

  //click events:
  //generate action button click events
  initActionButtons($(":button[show]"), function(action){
    fetchStreetAddress(function(error, address){
      log("#log", action, address, error);
      save();
    });
  });

  //going on break sets up a reminder for later
  $("#ls").click(function(){
    addMinuteReminder(4, "Keep up the good work!",
      "Don't forget to end your break!",
      settings.lunch_length_min);
  });

  //open a browser window when the user tries to submit their log data
  $("#submit_log").click(function(){
    save();
    openBrowser(getURL(), getInjectionCode());
  });

  //the compass records the user's location
  $("#tag_loc").click(function(){
    fetchStreetAddress(function(error, address){
      log("#log", "moved", address, error);
      save();
    });
  });
  //the pencil opens up the log on screen
  $("#show_log").click(function(){
    if(isShown("#log_menu")){
      hide("#log_menu");
      save();
    }else{
      show("#log_menu");
    }
  });
  //the gear icon opens up the settings menu
  $("#show_settings").click(function(){
    if(isShown("#settings_menu")){
      hide("#settings_menu");
      updateSettings();
      save();
      setNotifications();
    }else{
      commitSettings();
      show("#settings_menu");
    }
  });

  //buttons in the settings menu
  //show/hide the notification options when notification toggle is clicked
  $("#notifications").click(function(){
    updateSettings();
  });
  //the undo button removes the last log line
  $("#undo").click(function(){
    undoLog("#log");
    save();
  });
  //if the wipe button in settings is clicked, wipe the log
  $("#wipe_log").click(function(){
    if(confirm("Are you sure you want to delete all of your logged data? It can't be recovered!")){
      clearLog("#log");
      updateSettings();
      save();
    }
  });

  //any "NEXT" or "OK" button updates the settings and hides the menu it was in
  $(".floor").click(function(){
    hide("#"+$(this).parent().attr("id"));
    $(this).css("display", "none");
    updateSettings();
  });

  //done loading, hide loading screen
  setTimeout(function(){
    hide("#loading");
  }, 50);
});
