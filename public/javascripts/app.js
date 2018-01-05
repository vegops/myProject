var myApp = angular.module('myApp', []);

myApp.controller('loginController',$scope=>{
    $scope.login = true;
    $scope.switch = function() {
        $scope.login = !$scope.login;
        $('.modal-title').toggleClass('active');
    }
});

myApp.controller('chatController', $scope=>{
    var ws;
    var online = [];
    $scope.connect = function() {
        $scope.chatName = capitalizeFirstLetter($('#chat-name').val());
        if( $scope.chatName ==="" ){ //if name is empty
            if(!$('#chat-name').hasClass('must')){
                $('#chat-name').toggleClass('must');
                $('#chat-name').click(function(){
                    $(this).removeClass('must');
                })
            }
        } else if ($('#chat-name').hasClass('saved')) { // if user is already connected
            console.log('user want to edit name');
            $('#chat-name').toggleClass('must');
            setTimeout(() => {
                $('#chat-name').toggleClass('must');
            }, 300);
        } else { // connecting to ws
            ws = new WebSocket('ws://localhost:3000');
            ws.onopen = function() {
                console.log($scope.chatName+' is connected!');
                $('#chat-name').addClass('saved').attr('disabled','disabled');
            };
            ws.onmessage = function(message) {
                var name = $('#chat-name').val();
                $('.chat-msgs').append('<span>'+message.data+'</span></br>');
                $scope.chatMsg = "";
                if($('.chat-box').hasClass('closed')) {
                    $('.chat-box').addClass('alert')
                    setTimeout(()=>{
                        $('.chat-box').removeClass('alert')
                    },800)
                }
            }
            $('.save-name').removeClass('fa-floppy-o').addClass(' fa-check-square connected');
            $('#chat-message').focus();
        }
    }

    $scope.sendMsg = function(e) {
        if (!ws) {
            console.log('ws is closed :-)');
            $('.chat-msgs').append('<span>You are not connected.</span></br>');
        } else if( $scope.chatName ==="" ){
            if(!$('#chat-name').hasClass('must')){
                $('#chat-name').toggleClass('must');
                $('#chat-name').click(function(){
                    $(this).removeClass('must');
                });
            }
        } else {
            $scope.chatName = $('#chat-name').val();
            $scope.chatMsg = $('#chat-message').val();
            $scope.message = $scope.chatName +": "+$scope.chatMsg;   

            ws.send($scope.message);
            $('#chat-message').toggleClass('blink').val('');
            setTimeout(() => {
                 $('#chat-message').toggleClass('blink')
            }, 300);
            $('#chat-message').focus();
        }
    }

    $scope.chatToggle = function() {
        $('.chat-box').toggleClass('closed');
        $('.chat-box .chat-toggle').toggleClass('close');
        if(localStorage.getItem('chat')==="closed") {
            localStorage.setItem('chat', 'open');
        } else {
            localStorage.setItem('chat', 'closed');            
        }
    }
    if (localStorage.getItem('chat')==="closed") {
        $('.chat-box').toggleClass('closed').removeClass('hidden');
        $('.chat-box .chat-toggle').toggleClass('close');
    } else if (localStorage.getItem('chat')==="open") {
        $('.chat-box').removeClass('hidden');
    }
    setTimeout(() => {
        $('.chat-box').fadeIn('slow').removeClass('hidden');
    }, 300);
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};