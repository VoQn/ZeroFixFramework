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
  var declarations, dom, property, res, selector, value;
  dom = document.createElement('style');
  res = '\n';
  for (selector in stylesheet) {
    declarations = stylesheet[selector];
    res += "" + selector + " {\n";
    for (property in declarations) {
      value = declarations[property];
      res += "  " + property + ": " + value + " !important;\n";
    }
    res += "}\n\n";
  }
  dom.innerHTML = res;
  document.getElementsByTagName('head')[0].appendChild(dom);
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
    if (!is_empty(conf)) fix_page(conf.stylesheet, conf.restruct);
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
    '#videoHeader, #ichibaPanel, #playerCommentPanel, #videoInformationWrapper, #textMarquee, #playlist': {
      display: 'none'
    },
    '#playerContainer': {
      padding: '0 0 5px 5px',
      margin: '0'
    },
    '#playerCommentPanelOuter:hover': {
      opacity: '1'
    },
    '#playerCommentPanelOuter': {
      opacity: '0.3',
      '-webkit-transition': 'opacity .5s linear'
    },
    '#playerCommentPanelOuter > #videoInformation': {
      background: '-webkit-linear-gradient(left,rgba(0,0,0,0.3),rgb(0,0,0)) no-repeat',
      color: 'white',
      'text-align': 'left'
    },
    '#playerCommentPanelOuter #videoThumbnailImage': {
      display: 'none'
    },
    '#playerCommentPanelOuter #userProfile .userIcon': {
      float: 'left',
      height: '43px',
      width: '43px'
    },
    '#searchResultExplorer': {
      margin: '0 auto',
      'margin-right': '8px'
    },
    '#playerCommentPanelOuter #userProfile .profile': {
      float: 'left'
    },
    '#playerCommentPanelOuter #videoShareLinks': {
      clear: 'both',
      'padding-top': '10px'
    },
    '#playerCommentPanelOuter #videoStats li span': {
      display: 'inline-block',
      'padding-left': '10px',
      'font-weight': 'bold'
    },
    '.oldType': {
      background: '#000',
      'border-radius': '5px'
    },
    '.oldType .commentInner': {
      'box-shadow': 'inset #666 0px 1px, inset #666 1px 0, inset #666 0 -1px',
      'border-radius': '5px'
    },
    '.oldType .commandInput': {
      'border-right': '1px solid #333'
    },
    '.oldType .commentInput input': {
      color: '#fff'
    },
    '.oldType .commentSubmit input': {
      'text-shadow': 'none',
      color: '#fc6',
      'border': 'thin solid #960',
      'border-radius': '0 4px 4px 0',
      'background': '#000 -webkit-linear-gradient(#543, #432 50%, #321 50%, #210) no-repeat',
      'box-shadow': 'inset 0 0 5px #963'
    }
  },
  restruct: function() {
    var $i, $q, lazy_fix;
    $i = function(i) {
      return document.getElementById(i);
    };
    $q = function(q) {
      return document.querySelector(q);
    };
    lazy_fix = function() {
      var comment_view, info, tag_blind, _info;
      tag_blind = $q('.filter');
      tag_blind.parentNode.removeChild(tag_blind);
      _info = $i('videoInformation');
      info = _info.cloneNode(true);
      comment_view = $i('playerCommentPanel');
      comment_view.parentNode.appendChild(info, comment_view);
    };
    setTimeout(lazy_fix, 3000);
  }
});
})();
