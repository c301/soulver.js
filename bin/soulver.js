(function() {
  $(function() {
    var editor, gutter, rightbar, rightbar_wrapper, wrapper;
    window.editor = editor = null;
    window.editor = editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: true,
      lineWrapping: true,
      onUpdate: function() {
        var e, i, val, _i, _ref, _results;
        if (!editor) {
          return;
        }
        $(rightbar).html('');
        _results = [];
        for (i = _i = 0, _ref = editor.lineCount(); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          val = '';
          try {
            val = parser.parse(editor.getLine(i));
            if (val == null) {
              val = '';
            }
          } catch (_error) {
            e = _error;
            console.error(e.message);
          }
          _results.push($('<pre>').html(val.toString()).height($('pre:nth-child(' + (i + 1) + ')', gutter).height()).appendTo(rightbar));
        }
        return _results;
      }
    });
    wrapper = editor.getWrapperElement();
    $('.CodeMirror-lines > div', wrapper).css({
      'margin-right': 200
    });
    gutter = $('.CodeMirror-gutter', wrapper);
    rightbar_wrapper = $('<div>').addClass('CodeMirror-rightbar').appendTo($('.CodeMirror-gutter', wrapper).parent());
    rightbar = $('<div>').addClass('CodeMirror-rightbar-text').appendTo(rightbar_wrapper);
    return editor.refresh();
  });

}).call(this);
