if($('#contest-game-type').val() == "brick") {
    questions.counter = $(container_selector + " .counter_box");

    var url = _baseURL + "/qgamestart/" + _view_key;
    $.get(url, {}, function (response, status) {
        questions.counter.reset = function () {
            $('#brick_counter').html("0");
            _st = Date.now();
            questions.counter.interval = setInterval(function () {
                var currentTimerDisplay = Math.floor((Date.now() - _st) / 1000);
                $('#brick_counter').html(currentTimerDisplay);
            }, 1000);
        }

        _ready();
        preload(brickArr, done, "contestBrick", /* $('#contest-game-level').val(), */ _st, _paddleWidth, _brickQuantity, _pointsCount, /* _speedBall */);
        console.log('response',response);
        if (response == "OK") {
            // console.log("data ", document.getElementById('paddle')); 
            questions.counter.reset();
/*             var image1 = document.getElementById('paddle').innerText;
            var image2 = document.getElementById('brick').innerText;
            var image3 = document.getElementById('ball').innerText; */
            // var image4 = document.getElementById('destroyed').innerText;

            
            var brickArr = [];
            brickArr.push(
/*                 {background_image: image1, type: 1, index: null}, {background_image: image1, type: 1, index: null},
                {background_image: image2, type: 1, index: null}, {background_image: image2, type: 1, index: null},
                {background_image: image3, type: 1, index: null}, {background_image: image3, type: 1, index: null} */
                //{background_image: image4, type: 1, index: null}, {background_image: image4, type: 1, index: null}
                );
            _st = Date.now();
        }    
    });  
}