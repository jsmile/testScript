// user-module.js
const UserModule2 = (function() {
   // Private variables
   let privateUser = "John";
   let privateData = [];
   
   // Private function
   function validateUser(user) {
       return user.length > 2;
   }
   
   // Public API
   return {
       addUser: function( user ) {
           if ( validateUser( user ) ) {
               privateData.push( user );
           }
       },
       getUsers: function() {
           return privateData;
       }
   };
})();