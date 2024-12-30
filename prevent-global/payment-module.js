// payment-module.js
const PaymentModule = (function() {
   let privateUser = "Different User";  // No conflict
   // ... rest of module
})();

UserModule2.addUser( "Jane" );
console.log( 'UserModule2.getUsers(): ', UserModule2.getUsers() );