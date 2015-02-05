function showVideo(response) {
            if(response.data && response.data.items) {
                var items = response.data.items;
                if(items.length>0) {
                    var item = items[0];
                    var videoid = "http://www.youtube.com/embed/"+item.id;
                    console.log("Latest ID: '"+videoid+"'");
                    var video = "<iframe width='420' height='315' src='"+videoid+"' frameborder='0' allowfullscreen></iframe>"; 
                    $('#static_video').html(video);
                }
            }
        }