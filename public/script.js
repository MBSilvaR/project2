$(document).ready(function() {
      console.log("maybe");


      var getData = function(data) {
        x = $('select').val()
        var url = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/" + x + "/30.json";
        console.log(url)
        url += '?' + $.param({
          'api-key': "f34457fcc4a34e009ba12cb4bfd30877"
        });
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(data) {
          console.log(data)
          $('#results').empty()
          for(var i = 0; i < data.results.length; i++){
            var content = $('<form action="/save" method="POST"><div id="content"></div></form>');
            $('#results').append(content);

            var button = $('<button type="submit">Save article</button>');
            $('#content').append(button);

            var div = $('<div id="content>"');

            var img = $('<img>');
            img.attr('src', data.results[i].media[0]["media-metadata"][2].url);
            var imgInput = $('<input type="hidden" name="media" value="'+data.results[i].media[0]["media-metadata"][2].url+'">');
            $('#content').append(img);

            var title = $('<div>');
            title.text(data.results[i].title);
            var titleInput = $('<input type="hidden" name="title" value="'+data.results[i].title+'">');
            $('#content').append(title);

            var byline = $('<div>');
            byline.text(data.results[i].byline);
            var bylineInput = $('<input type="hidden" name="byline" value="'+data.results[i].byline+'">');
            $('#content').append(byline);

            var publishedDate = $('<div>');
            publishedDate.text(data.results[i].published_date);
            var publishedDateInput = $('<input type="hidden" name="published_date" value="'+data.results[i].published_date+'">');
            $('#content').append(publishedDate);

            var abstract = $('<div>');
            abstract.text(data.results[i].abstract);
            var abstractInput = $('<input type="hidden" name="abstract" value="'+data.results[i].abstract+'">');
            $('#content').append(abstract);

            var link = $('<div>');
            link.text(data.results[i].url);
            var linkInput = $('<input type="hidden" name="url" value="'+data.results[i].url+'">');
            $('#content').append(link);


          }

        }).fail(function(err) {
          throw err;
        });
      }


      $('button').on('click', function() {
        getData();
      })




  /* Slider */

//   var slider = $('.slider');
//   var slider_container = $('.slider_container');
//   var slides = $('.slider > li');
//   var slides_count = slides.length;
//   var current_slide = 0;

//   slider_container.css("width", slides.width() + "px");
//   slider.css("width", slides.width() * slides_count + "px");

//   var start_slider = function(){
//     if(current_slide < (slides_count - 1)){
//       slides.eq(current_slide).css("margin", "-" + slides.width() + "px");
//       current_slide++;
//     } else {
//       slides.css("margin", "0");
//       current_slide = 0;
//       //slides.eq(current _slide).fadeIn('fast');
//     }
//   }

//   setInterval(start_slider, 5000);

});
