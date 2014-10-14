this.Alist = (function() {
  var dataSource = new Firebase('https://alist-test01.firebaseIO.com/'),
      usersSource = dataSource.child('users'),
      classifiedsSource = dataSource.child('classifieds')
  
  function Classified(description, contact, id) {
    this.description = description;
    this.contact = contact;
    this.id = id;
  }
    
  Classified.prototype.save = function () {
    if (!this.id) {
      this.id = classifiedsSource.push({
        desc: this.description,
        contact: this.contact
      }).name();
    } else {
      classifiedsSource.child(this.id).set({
        desc: this.description,
        contact: this.contact
      });
    }
  }
  
  Classified.onChildAdded = function (callback) {
    classifiedsSource.on('child_added', function(snapshot) {
      var id = snapshot.name(),
          value = snapshot.val();
      
      return callback(new Classified(value.desc, value.contact, id));
    });
  }
  
  return {
    Classified: Classified
  };
})();