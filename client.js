String.prototype.ellipsis = function(length, add) {
  return this.substring(0, length) + (this.length && add > length ? add : "");
}

String.prototype.mustache = function(data) {
  var temp = this;
  var tokens = temp.match(/\{\{(\w)*\}\}/g);
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    temp = temp.replace(token, data[token.slice(2, -2)] || "");
  }
  return temp;
}

$(function() {

  var userdata = {
    first : false,
    providers : providers.defaults,
    getFirst : function() {
      return this.first && this.providers[0];
    },
    load : function() {
      var cookie = $.cookie('cproviders');
      if (cookie) {
        this.first = cookie.charAt(0) == '*';
        this.providers = cookie.match(/\d+/g);
      }
    },
    save : function() {
      var cookie = (this.first ? "*" : "") + this.providers.join(".");
      $.cookie('cproviders', cookie, {
        expires : 365,
        path : '/',
        domain : '.qwickup.com'
      });
    }
  };

  var ui = {};
  ui.query = $("#query");
  ui.form = $("#lookup-form");
  ui.layout = $("#layout");
  ui.iframe = $("#result");
  ui.buttonsOut = $("#btns-out");
  ui.buttonsIn = $("#btns-in");
  ui.available = $("#available-list");
  ui.installed = $("#installed-list");
  ui.first = $(".first");
  ui.reset = $("#reset-default");
  ui.filter = $("#available-filter");

  var temp = {}
  temp.button = $("#button-template").html();
  temp.installed = $("#installed-temp").html();
  temp.available = $("#available-temp").html();

  var lastCode = null;

  ui.form.on("click", "input.auto", function(ev) {
    lookup(null, null);
  });

  ui.form.on("click", "input.lookup", function(ev) {
    lookup(this.id, null);
  });

  function lookup(code, query) {
    console.log("lookup: " + code + " " + query);

    lastCode = code = code || lastCode || userdata.getFirst() || "";
    query = query || ui.query.val() || "";

    console.log("lookup*: " + code + " " + query);

    var provider = providers[code];

    if (provider && query) {
      Hash.set(provider.id + "/" + query, false);
    } else if (query) {
      Hash.set(query, false);
    }

    if (provider && query) {
      var url = provider.lookup_url.mustache({
        query : encodeURIComponent(query)
      });

      ui.layout.addClass("lookup").removeClass("home page");
      ui.iframe.show().attr("src", url);

    } else {
      ui.layout.addClass("home").removeClass("lookup page");
      ui.iframe.hide().attr("src", "");
      ui.query.focus();
    }

    if (provider) {
      ui.buttonsOut.removeClass("btns-highlight");
    } else {
      ui.buttonsOut.addClass("btns-highlight");
    }

    ui.query.val(query);

    document.title = (query ? query.ellipsis(12, '...') + " - " : "")
        + "QwickUp";
  }

  ui.form.on("click", "input.customize", function(ev) {
    ui.layout.addClass("page").removeClass("home lookup");
  });

  ui.first.on("change", function(ev) {
    updateFirst($(this).prop("checked") ? true : false)
    return false;
  });

  ui.available.on("click", "a.install", function(ev) {
    var id = $(this).closest(".provider").attr("data-id");
    id && addProvider(id);
    return false;
  });

  ui.installed.on("click", "a.uninstall", function(ev) {
    var id = $(this).closest(".provider").attr("data-id");
    id && removeProvider(id);
    return false;
  });

  ui.reset.on("click", function(ev) {
    resetProviders();
    return false;
  });

  ui.filter.on("change", function(ev) {
    var tag = (this.options[this.selectedIndex]).value;
    console.log("filter:" + tag);
    ui.available.children().each(function() {
      if ($(this).hasClass(tag)) {
        $(this).removeClass("hide");
      } else {
        $(this).addClass("hide");
      }
    });
    return false;
  });

  ui.installed.sortable({
    opacity : 0.7,
    cursor : 'move',
    axis : 'y',
    handle : '.provider-title',
    update : function(event, ui) {
      var ids = [];
      $(this).children().each(function() {
        ids.push($(this).attr('data-id'));
      });
      updateProviders(ids);
    }
  });

  function resetProviders() {
    if (!window.confirm("Remove and reset all?")) {
      return;
    }
    userdata.providers = providers.defaults;
    uiProviders();
    userdata.save();
  }

  function removeProvider(id) {
    var provider = providers[id];
    if (provider) {
      if (!window.confirm("Remove '" + provider.title + "'?")) {
        return;
      }
    }
    var i = userdata.providers.indexOf(id);
    (i >= 0) && userdata.providers.splice(i, 1);
    uiProviders();
    userdata.save();
  }

  function addProvider(id) {
    userdata.providers.push(id);
    uiProviders();
    userdata.save();
  }

  function updateProviders(ids) {
    userdata.providers = ids;
    uiProviders();
    userdata.save();
  }

  function updateFirst(yes) {
    userdata.first = yes;
    uiFirst();
    userdata.save();
  }

  function uiFirst() {
    ui.first.prop("checked", userdata.first ? true : false);
  }

  function uiProviders() {
    ui.buttonsIn.empty();
    ui.installed.empty();
    for (var i = 0; i < userdata.providers.length; i++) {
      var id = userdata.providers[i];
      var provider = providers[id];
      if (!provider) {
        break;
      }
      ui.buttonsIn.append(temp.button.mustache(provider));
      ui.installed.append(temp.installed.mustache(provider));
    }
    ui.available.children().each(function() {
      var i = userdata.providers.indexOf($(this).attr('data-id'));
      if (i >= 0) {
        $(this).addClass('installed');
      } else {
        $(this).removeClass('installed');
      }
    });
  }

  function uiAvailable() {
    ui.available.empty();
    for ( var id in providers) {
      if (/^\d+$/.test(id)) {
        var provider = providers[id];
        provider.id = id;
        ui.available.append(temp.available.mustache(provider));
      }
    }
  }

  userdata.load();

  uiAvailable();
  uiProviders();
  uiFirst();

  $(".showonjs").show();
  $(".hideonjs").hide();

  Hash.bind(function() {
    var hash = Hash.get();
    console.log("hash: " + hash);
    if (hash) {
      var match = /^([0-9]+)\/(.*)$/.exec(hash);
      if (match) {
        lookup(match[1], match[2]);
      } else {
        lookup(null, hash);
      }
    }
  }, true);

  (typeof purl != 'undefined') && !ui.query.val() && (function() {
    var url = purl();
    var query = url.param('q') || url.param('query');
    query && lookup(null, query);
  })();

  ui.query.val() || ui.query.focus();
});

var Hash = (function() {
  var ignore = null;
  return {
    get : function() {
      return (window.location.hash || '').replace('#', '');
    },
    set : function(hash, fire) {
      console.log("Hash.set: " + hash + ", " + fire);
      hash = (hash || "").replace('#', '');
      ignore = fire ? null : hash;
      return window.location.hash = hash;
    },
    bind : function(fn, init) {
      $(window).bind('hashchange', function() {
        var hash = Hash.get();
        console.log("Hash.hashchange: " + hash + " " + ignore);
        (ignore != hash) && fn();
        ignore = null;
      });
      init && fn();
    }
  };
})();