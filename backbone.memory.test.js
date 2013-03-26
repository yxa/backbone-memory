describe("Backbone Memory Sync Adapter", function() {
  var Model = Backbone.Model.extend({});
  var Collection = Backbone.Collection.extend({model: Model});
  var collection;

  beforeEach(function(done) {
    collection = new Collection();
    done();
  });

  it("backbone should be present", function() {
    expect(Backbone).to.be.ok;
  });

  describe("on init",function(){
    it("should be empty on init",function(){
      expect(collection).to.have.length(0);
    });
  });

  describe("create method",function(){
    it("should have the correct id",function(){
      collection.create({});
      var model = collection.first();
      expect(model.get('id')).to.be.ok;
    });
  });

  describe("delete method",function(){
    it("should execute delete",function(){
      collection.create({});
      expect(collection).to.have.length(1);
      collection.first().destroy();
      expect(collection).to.have.length(0);
    });
  });

  describe("update method",function(){
    it("should execute update",function(){
      collection.create({});
      expect(collection).to.have.length(1);
      collection.first().set({name: 'test'});
      expect(collection.first().get("name")).to.be.equal("test");
    });
  });

  describe("bulk operations",function(){
    beforeEach(function(done){
      _.each(collection.toArray(), function(model){
        model.destroy();
      });
      done();
    });

    it("should have removed all models from collection",function(){
      expect(collection.length).to.be.equal(0);
    });

    it("should contain the right amount of models",function(){
      _(10).times(function(){
        collection.create()
      });
      expect(collection).to.have.length(10);
    });
  });

  describe("different id attribute",function(){
    var Model2 = Backbone.Model.extend({
      idAttribute: "_id"
    });

    var Collection2 = Backbone.Collection.extend({
      model: Model2
    });

    var collection2 = new Collection2();

    it("should have used the custom id attribute",function(){
      collection2.create({});
      expect(collection2.first().get("id")).to.be.equal(collection2.first().get("_id"));
    });
  });

});
