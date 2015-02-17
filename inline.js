var qwickup = (function() {

  window.addEventListener('load', function(e) {
    onload(e);
  });

  document.addEventListener('mouseup', function(e) {
    onmouseup(e);
  });

  var lookup_url = 'http://qwickup.com/';
  var icon_url = 'http://qwickup.com/inline.png';
  var btn = null, selection = null, popup = null, timeout = null;

  function onload() {
    btn = normalize(document.createElement('span'));
    btn.className = 'qwickup_inline_button qwickup_hide_on_ext';
    btn.style.display = 'none';
    btn.style.position = 'absolute';
    btn.style.zIndex = 99999;
    document.body.appendChild(btn);

    var a = normalize(document.createElement('a'));
    a.href = '#';
    a.title = 'QwickUp';
    a.onmousedown = function(e) {
      btnDown();
    };
    a.onclick = function(e) {
      lookup();
      return false;
    };
    btn.appendChild(a);

    var img = normalize(document.createElement('img'));
    img.src = icon_url;
    a.appendChild(img);
  }

  function onmouseup(e) {
    e = e || window.event;
    var txt = getSelection();
    if (!txt) {
      btn.style.display = 'none';
      return;
    }
    selectionxy(e);
  }

  function btnDown(e) {
    selection = getSelection();
  }

  function lookup() {
    btn.style.display = 'none';
    var url = lookup_url + '?ap=in&query=' + selection;
    var h = screen.height / 2, w = screen.width / 2, t = h / 2, l = w / 2;
    popup = window.open(url, 'QwickUp', 'height=' + h + ',width=' + w + ',top='
        + t + ',left=' + l + ',resizable,scrollbars,toolbar');
    window.focus && popup.focus();
    return false;
  }

  function getSelection() {
    var text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection) {
      text = document.selection.createRange().text;
    }
    return text.replace(/\s\s*/, ' ').replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function mousexy(e) {
    var x = 0;
    var y = 0;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    } else if (e.clientX || e.clientY) {
      x = e.clientX + document.body.scrollLeft
          + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop
          + document.documentElement.scrollTop;
    }
    showBtn(x, y);
  }

  function selectionxy() {
    var marker;
    if (document.selection && document.selection.createRange) {
      var id = 'squ_' + new Date().getTime() + '_'
          + Math.random().toString().substr(2);
      var range = document.selection.createRange().duplicate();
      range.collapse(false);
      range.pasteHTML("<span id='" + id
          + "' style='position: relative;'>&#xfeff;</span>");
      marker = document.getElementById(id);
    } else if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt) {
        range = sel.getRangeAt(0).cloneRange();
      } else {
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);
        if (range.collapsed !== sel.isCollapsed) {
          range.setStart(sel.focusNode, sel.focusOffset);
          range.setEnd(sel.anchorNode, sel.anchorOffset);
        }
      }
      range.collapse(false);
      marker = document.createElement("span");
      marker.appendChild(document.createTextNode("\ufeff"));
      range.insertNode(marker);
    }
    if (marker) {
      var xy = offset(marker);
      xy.y += marker.offsetHeight;
      marker.parentNode.removeChild(marker);
      showBtn(xy.x, xy.y);
    }
  }

  function offset(el) {
    var x = 0, y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {
      x : x,
      y : y
    };
  }

  function showBtn(x, y) {
    window.clearTimeout(timeout);
    btn.style.display = "";
    btn.style.top = (y) + "px";
    btn.style.left = (x) + "px";
    timeout = window.setTimeout(function() {
      btn.style.display = "none";
    }, 4000);
  }

  function normalize(el) {
    var style = el.style;
    style.position = "relative";
    style.border = "0 none";
    style.padding = "0";
    style.margin = "0";
    style.background = "none trasparent";
    style.verticalAlign = "baseline";
    style.lineHeight = "1";
    return el;
  }

  return {
    config : function(opts) {
      // TODO: new window target
    }
  };
})();
