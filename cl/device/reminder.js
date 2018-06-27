function getReminderPermission(callback){
  if(typeof cordova === "undefined") return;

  cordova.plugins.notification.local.hasPermission(function(granted){
    if(granted){
      callback();
    }else{
      cordova.plugins.notification.local.registerPermission(function(granted){
        if(granted){
          callback();
        }
      });
    }
  });
}

function addTimeReminder(nid, ntitle, ntext, nhours, nminutes){
  cordova.plugins.notification.local.schedule({
    id: nid,
    title: ntitle,
    text: ntext,
    trigger: {
      count: 2,
      every: {
        hour: nhours,
        minute: nminutes
      }
    }
  });
}

function addMinuteReminder(nid, ntitle, ntext, nminutes){
  cordova.plugins.notification.local.schedule({
    id: nid,
    title: ntitle,
    text: ntext,
    trigger: {
      count: 1,
      in: nminutes,
      unit: "minute"
    }
  });
}

function addDateReminder(nid, ntitle, ntext, ndate){
  var parts = ndate.split("-");
  var date = new Date(ndate[0], ndate[1], ndate[2].substr(0,1));

  cordova.plugins.notification.local.schedule({
    id: nid,
    title: ntitle,
    text: ntext,
    trigger: {
      at: date
    }
  });
}

function addLocationReminder(nid, ntitle, ntext, lat, lng){
  cordova.plugins.notification.local.schedule({
    id: nid,
    title: ntitle,
    text: ntext,
    trigger: {
      type: "location",
      center: [nlat, nlng],
      radius: 0.001,
      notifyOnEntry: true
    }
  });
}

function clearReminders(){
  cordova.plugins.notification.local.clearAll();
}
