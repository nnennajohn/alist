var classified = new Alist.Classified("A cute bike", "my cell #");
classified.save();

Alist.Classified.onChildAdded(function(snapshot) {
  console.log(snapshot);
});