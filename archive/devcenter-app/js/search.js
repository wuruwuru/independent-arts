$(function(){
    //Advanced Search Setup
    $('#toggle-advanced-search').click(function(){
        $(this).toggleClass('active');
        $('.advanced-search').toggle()
    })
    var tags = $('#expertise').magicSuggest({
        placeholder: 'Start typing to select tags',
        data: ['Javascript', 'Angularjs', 'JQuery', 'NodeJS', 'Python', 'Java']
    });

    // URL Decode
    function urldecode(str) {
       return decodeURIComponent((str+'').replace(/\+/g, '%20'));
    }

    // Function to set active state
    var urlString = urldecode(window.location.href);
    var path = window.url('2', urlString);
    var query = window.url('?query', urlString);

    if (path) {
        $('#link-' + path).addClass('active');
    } else {
        $('#link-projects').addClass('active');
    }

    // Set input value to query
    $('#search-input').val(query);
    $('#query-string').text(query);

    // Handle links to other pages
    $('.feed-header a').click(function(event){
        event.preventDefault();
        var url = $(this).attr('href');
        window.location.href = url + window.location.search;
    });

    // Advanced search Update
    var experience = [];
    var expertise;
    $('#update-search').click(function(){
        $("input[name='experience[]']:checked").each(function (){
            experience.push($(this).val());
        });
        expertise = tags.getValue();
        runSearch();
    })

    // Function to fetch data
    var runSearch = function(){
        $('.results').hide();
        $('#results-loading').show();

        var base = 'json/projects?';
        var params = {
            query: $('#search-input').val(),
            type: path,
            experience: experience,
            tags: expertise
        }

        var url = base + $.param(params, true);

        $.getJSON(url, function(result){
            // I put a simple timeout to simulate loading. You should remove it
            setTimeout(function() {
                $('#results-loading').hide();

                if (result.length) {
                    $('#results-found').show();
                } else {
                    $('#no-results').show();
                }
            }, 1000);
            
        });
    }

    // Initialize
    runSearch();
})