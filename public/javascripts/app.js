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
    $scope.connect = function() {
        $scope.chatName = $('#chat-name').val();
        if( $scope.chatName ==="" ){
            if(!$('#chat-name').hasClass('must')){
                $('#chat-name').toggleClass('must');
                $('#chat-name').click(function(){
                    $(this).removeClass('must');
                })
            }
        } else {
            ws = new WebSocket('ws://localhost:3000');
            ws.onopen = function() {
                console.log($scope.chatName+' is connected!');
            };
            ws.onmessage = function(message) {
                console.log("message:"+message.data);
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
        }
    }

    $scope.sendMsg = function(e) {
        if( $scope.chatName ==="" ){
            if(!$('#chat-name').hasClass('must')){
                $('#chat-name').toggleClass('must');
                $('#chat-name').click(function(){
                    $(this).removeClass('must');
                })
            }
        } else {
            $scope.chatName = $('#chat-name').val();
            $scope.chatMsg = $('#chat-message').val();
            $scope.message = $scope.chatName +": "+$scope.chatMsg;   

            console.log("sending=> "+$scope.message);
            ws.send($scope.message);
            $('#chat-message').toggleClass('flip').val('');
        }
    }

    $scope.chatToggle = function() {
        $('.chat-box').toggleClass('closed');
        $('.chat-box .chat-toggle').toggleClass('close');
    }
})