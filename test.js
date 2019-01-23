  window.onload = function() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    var code = 'alert("hello world!");';
    try {
      s.appendChild(document.createTextNode(code));
      document.head.appendChild(s);
    } catch (e) {
      s.text = code;
      document.head.appendChild(s);
    }
  }