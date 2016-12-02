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
            var linkInput = $('<input type="hidden" name="url" value="'+data.results[i].url+'">');
            $('#content').append(link);

            var button = $('<button type="submit" id="submit-button">Save article</button>');
            titleInput.append(linkInput).append(button);

          }

        }).fail(function(err) {
          throw err;
        });
      }

      var deleteCall = function(id){
          console.log(id.id)
          $.ajax({
            'url':'/delete/'+id.id,
            'method':'get'
          })
        }

      var deleteButtons = function(){
        var buttons = $('.delete')
        $.each(buttons, function(index, value){
          var delId = $(value).attr('data-value')
          var data = {id:delId}
          console.log(data)
          $(value).on('click', function() {
            deleteCall(data);
          })
      })
      }

      deleteButtons()

      $('#search-button').on('click', function() {
        getData();
      })

      // var getContent = function(){
      //   var titles = $('.article-title')
      //   $.each(titles,function(index, val){
      //     var title = $(val).text()
      //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      //     url += '?' + $.param({
      //                           'api-key': "f34457fcc4a34e009ba12cb4bfd30877",
      //                           'q': title
      //                         })
      //     $.ajax({
      //       url: url,
      //       method:"get"
      //     }).done(function(data){
      //       console.log(data)
      //     })
      //   })
      // }
      // getContent()



});
