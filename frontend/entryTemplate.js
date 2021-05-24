(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"entry\">\n  <span>\n    <input type=\"number\" class=\"id-number\" placeholder=\"ID Number\">\n  </span>\n  <span>\n    <input type=\"text\" class=\"first-name\" placeholder=\"First Name\">\n  </span>\n  <span>\n    <input type=\"text\" class=\"last-name\" placeholder=\"Last Name\">\n  </span>\n</div>\n";
},"useData":true});
})();