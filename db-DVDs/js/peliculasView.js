window.PeliculaView = Backbone.View.extend({

    className: "pelicula",
    template: _.template("Hello {{ name }}!"),

    events: {/*
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
    */},

    initialize: function() {
        this.listenTo(this.model, "change", this.render);
        this.render();
    },

    render: function() {
        
        //console.log("cambio");
        //console.log(this.$el);

        //this.$el.html(this.template(this.model.attributes));
        this.$el.html(this.template({name: "nombre"}));
        //template({name: "Mustache"});

        return this;
    }



});

//console.log(PeliculaView);