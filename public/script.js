$(document).ready(function() {


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


            // also pull in article id, store it.
            // when user saves an article only store the id of it.
            // do not store all the data, that's a pita.
            // when user tries to see his/her saved articles, pull all
            // the unique article ids from the database- then goto the api and request
            // the article info based on the id

            var content = $('<div id="content"></div>');
            $('#results').append(content);


            var img = $('<img>');
            img.attr('src', data.results[i].media[0]["media-metadata"][2].url);
            $('#content').append(img);

            var title = $('<div>');
            title.text(data.results[i].title);
            var titleInput = $('<form action="/save" method="POST"><input type="hidden" name="title" value="'+data.results[i].title+'"></form>');
            $('#content').append(title).append(titleInput);


            var byline = $('<div>');
            byline.text(data.results[i].byline);
            $('#content').append(byline);

            var publishedDate = $('<div>');
            publishedDate.text(data.results[i].published_date);
            $('#content').append(publishedDate);

            var abstract = $('<div>');
            abstract.text(data.results[i].abstract);
            $('#content').append(abstract);

            var link = $('<div>');
            link.text(data.results[i].url);
            $('#content').append(link);

            var button = $('<button type="submit">Save article</button>');
            titleInput.append(button);

          }

        }).fail(function(err) {
          throw err;
        });
      }


      $('#search-button').on('click', function() {
        getData();
      })

      var getContent = function(){
        var titles = $('.article-title')
        $.each(titles,function(index, val){
          var title = $(val).text()
          var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
          url += '?' + $.param({
                                'api-key': "f34457fcc4a34e009ba12cb4bfd30877",
                                'q': title
                              })
          $.ajax({
            url: url,
            method:"get"
          }).done(function(data){
            console.log('yay')
            console.log(data)
          })
          console.log(title)
        })
      }
      getContent()

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
