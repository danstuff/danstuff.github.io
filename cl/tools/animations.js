function isShown(id){
  return (parseInt($(id).css("height")) !== 0 &&
    !$(id).is(":animated"));
}

function show(id){
  var prev_height = $(id).attr("prev_height");

  if(prev_height !== null){
    $(id).animate({height:prev_height, opacity:"1"});
  }
}
function hide(id){
  if(isShown(id)){
    var prev_height = $(id).css("height");

    $(id).attr("prev_height", prev_height);
    $(id).animate({height:"0%", opacity:"0"});
  }
}

function disable(id){
  $(id).prop("disabled",true);
}
function enable(id){
  $(id).prop("disabled",false);
}
