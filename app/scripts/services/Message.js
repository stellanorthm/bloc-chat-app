(function() {
  function Message($firebaseArray, $cookies, Room) {
    var Message = {};

    var ref = firebase.database().ref().child('messages');
    var messages = $firebaseArray(ref);

    Message.getByRoomId = function(roomId) {
      return $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));
    };

    Message.send = function(newMessage, roomId) {
      messages.$add({
          username: $cookies.get('blocChatCurrentUser'),
          roomId: roomId,
          content: newMessage
        });
    };

    return Message;

  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', '$cookies', 'Room', Message]);
})();
