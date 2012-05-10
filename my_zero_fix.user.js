// ==UserScript==
// @name        MyZeroFix
// @namespace   voqn.github.com
// @version     0.3.0
// @description これが俺の ニコニコ動画Zero や!!
// @include     http://www.nicovideo.jp/watch/*
// @license     MIT Lisence(http://en.wikipedia.org/wiki/MIT_License)
// ==/UserScript==

(function(){
var add_event, add_on_load, dry_run, each, find_dom, fix_page, is_empty, is_list, map, reserve, styling, zero_fix;

is_list = function(xs) {
  var klass, _i, _len, _ref;
  _ref = [Array, NodeList, HTMLCollection];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    klass = _ref[_i];
    if (xs instanceof klass) return true;
  }
  return false;
};

is_empty = function(xs) {
  var _;
  for (_ in xs) {
    return false;
  }
  return true;
};

map = function(xs, f) {
  var i, k, r, v, x, _len, _results;
  if (is_list(xs)) {
    _results = [];
    for (i = 0, _len = xs.length; i < _len; i++) {
      x = xs[i];
      _results.push(f(x, i));
    }
    return _results;
  } else {
    r = {};
    for (k in xs) {
      v = xs[k];
      r[k] = f(v, k);
    }
    return r;
  }
};

each = function(xs, f) {
  var i, k, v, x, _len;
  if (is_list(xs)) {
    for (i = 0, _len = xs.length; i < _len; i++) {
      x = xs[i];
      f(x, i);
    }
  } else {
    for (k in xs) {
      v = xs[k];
      f(v, k);
    }
  }
};

dry_run = function(f) {
  try {
    return f();
  } catch (e) {
    console.log("Exception occurred " + e);
  }
};

find_dom = function(query) {
  var dom;
  if (query.match(/^#[0-9a-zA-Z_\-]+\s?$/)) {
    return document.getElementById(query.substring(1));
  } else {
    dom = document.querySelectorAll(query);
    if (dom.length === 1) {
      return dom[0];
    } else {
      return dom;
    }
  }
};

add_on_load = function(callback) {
  var reserved;
  reserved = window.onload;
  if (typeof reserved === 'function') {
    window.onload = function() {
      dry_run(reserved);
      dry_run(callback);
    };
  } else {
    window.onload = callback;
  }
};

add_event = function(element, type, callback, capture) {
  if (element.addEventListener != null) {
    element.addEventListener(type, callback, capture);
  } else {
    element["on" + type] = callback;
  }
};

styling = function(stylesheet) {
  var declarations, dom, doms, property, selector, value, _i, _len;
  for (selector in stylesheet) {
    declarations = stylesheet[selector];
    doms = document.querySelectorAll(selector);
    for (property in declarations) {
      value = declarations[property];
      for (_i = 0, _len = doms.length; _i < _len; _i++) {
        dom = doms[_i];
        dom.style[property] = value;
      }
    }
  }
};

fix_page = function(stylesheet, restructor) {
  if (stylesheet == null) stylesheet = {};
  if (restructor != null) restructor();
  if (!is_empty(stylesheet)) styling(stylesheet);
};

reserve = function() {
  var run_fix;
  run_fix = function() {
    var conf;
    conf = zero_fix.get_conf();
    if (!is_empty(conf)) fix_page(conf.stylesheet, conf.restructor);
  };
  add_on_load(function() {
    run_fix();
  });
};

zero_fix = {
  user_conf: {},
  get_conf: function() {
    return this.user_conf;
  },
  set_conf: function(conf) {
    this.user_conf = conf;
    return this;
  },
  is_empty: is_empty,
  is_list: is_list,
  map: map,
  each: each,
  find_dom: find_dom,
  add_on_load: add_on_load,
  add_event: add_event,
  styling: styling,
  fix_page: fix_page,
  reserve: reserve
};

window.zero_fix = zero_fix;

window.zero_fix.reserve();
/*
Customized ZERO watch page
*/
zero_fix.set_conf({
  stylesheet: {
    '#videoHeader, #ichibaPanel, #playerCommentPanel': {
      display: 'none'
    }
  },
  options: function() {
    var $q, tag_blind;
    $q = function(q) {
      return document.querySelectorAll(q);
    };
    tag_blind = $q('.filter');
    tag_blind.parentNode.removeChild(tag_blind);
  }
});
})();
