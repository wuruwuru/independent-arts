/*
 * gravatar
 * 
 *
 * Copyright (c) 2013 Emiliano Zilocchi
 * Licensed under the MIT license.
 */

(function ($) {

  $.gravatar = function (options) {
    $.ajax({
      method: "GET",
      dataType: "JSONP",
      crossDomain: true,
      url: 'http://en.gravatar.com/' + options.profile + '.json',
      success: function(response) {
        var profile = response.entry[0];
        options.success(profile);
      },
      complete: options.complete,
      error: options.error
    });
  };

  $.fn.gravatar = function (profile) {
    var that = this;
    var options = {
      profile: profile,
      success: function(profile) {
        that.each(function () {
          $(this).find('.displayName').text(profile.displayName);

          var thumbnail = $(this).find('.thumbnailUrl');
          if(thumbnail.prop('tagName') === 'IMG') {
            thumbnail.attr('src', profile.thumbnailUrl);
          } else {
            var image = $('<img></img>').attr('src', profile.thumbnailUrl);
            thumbnail.append(image);
          }

          var list = $('<ul class="urls"></ul>');
          $.each(profile.urls, function() {
            var a = $('<a target="_blank"></a>').attr('href', this.value).text(this.title);
            var li = $('<li class="url"></li>').append(a);
            list.append(li);
          });
          $(this).find('.urls').append(list);

          var imsList = $('<ul class="ims-list"></ul>');
          $.each(profile.ims, function() {
            var h6 = $('<h6></h6>').text(this.type);
            var p = $('<p></p>').text(this.value);
            var li = $('<li class="ims-item"></li>').append(h6).append(p);
            imsList.append(li);
          });
          $(this).find('.ims').append(imsList);

          var template = $(this);
          $.each(profile.emails, function() {
            if(this.primary === "true") {
              template.find('.email').text(this.value);
            }
          });
        });
      }
    };
    $.gravatar(options);
    return this.each(function () { $(this); });
  };

}(jQuery));
