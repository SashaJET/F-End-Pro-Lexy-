$(function(){
    const $input = $('#users');
    const $userItemTemplate = $('#userItemTemplate').html();
    const $dataUserContainer = $('#dataUserContainer');

    $input.autocomplete({
        source: function(request, response) {
            $.ajax({
                url:'https://api.github.com/search/users?q=' + request.term,
                dataType: 'jsonp',
                success: function(data) {
                    response($.map(data.data.items, (el) => el.login));                    
                }
            });
        },        
        select: function(event, ui) {
            $.ajax({
                url: 'https://api.github.com/users/' + ui.item.value,
                dataType: 'jsonp',
                success: function(data) {
                    const html = getUserItem(data.data.name,
                            data.data.avatar_url,
                            data.data.followers,
                            data.data.subscriptions,
                            data.data.created_at);
                    renderUserData(html);
                }
            });
        },
        minLength: 2
    })

    function getUserItem(name, avatar_url, followers, subscriptions, date){
        return $userItemTemplate.replace('{{name}}', name)
                                .replace('{{url}}', avatar_url)
                                .replace('{{followers}}', followers)
                                .replace('{{subscriptions}}', subscriptions || 0)
                                .replace('{{date}}', changeDateFormat(date));
      }

    function changeDateFormat(date) {
        return new Date(date).toLocaleDateString('ru-Ru');
    }
    function renderUserData(elem) {
        $dataUserContainer.html(elem);
    }

})