function initActionButtons(action_buttons, logfunc){
  action_buttons.each(function(i){
    var id = $(this).attr("id");
    if(i !== 0){
      hide("#"+id);
    }
  });

  action_buttons.click(function(){
    logfunc($(this).attr("name"));

    var ids_to_show = $(this).attr("show").split(",");
    var ids_to_hide = $(this).attr("hide").split(",");

    action_buttons.each(function(i){
      var action_id = $(this).attr("id");

      var is_show = false;
      for(var j = 0; j < ids_to_show.length; j++){
        if(action_id === ids_to_show[j]){
          is_show = true;
        }
      }

      var is_hide = false;
      for(var j = 0; j < ids_to_hide.length; j++){
        if(action_id === ids_to_hide[j]){
          is_hide = true;
        }
      }

      if(is_show){
        enable("#"+action_id);
        show("#"+action_id);
      }else if(is_hide){
        hide("#"+action_id);
      }else{
        disable("#"+action_id);
      }
    });
  });
}
