function log(log_id, action, address, notes){
  var d = new Date();
  var date = d.toLocaleString("en-US",
    {month:"2-digit", day:"2-digit", year:"2-digit"});
  var time = d.toLocaleString("en-US",
    {hour: "2-digit", minute:"2-digit", hour12:true});

  $(log_id).append("<tr><td>"+date+
    "</td><td>"+time+
    "</td><td>"+action+
    "</td><td>"+address+
    "</td><td><div contenteditable>"+notes+
    "</div></td></tr>");
}

function undoLog(log_id){
  if($(log_id+" tr").last().children("th").length <= 0)
    $(log_id+" tr").last().remove();
}

function clearLog(log_id){
  $(log_id).each(function(index){
    if(index < 0)
      $(this).remove();
  });
}
