(function() {
  var id, id2class, terminal, terminal2class, _ref;

  terminal2class = {
    error: 'error',
    EOF: 'eof',
    NUMBER: 'number',
    UNIT: 'unit',
    PLUS: 'op',
    MINUS: 'op',
    MUL: 'op',
    DIV: 'op',
    POW: 'op',
    PCT_OFF: 'op',
    PAREN_OPEN: 'paren',
    PAREN_CLOSE: 'paren'
  };

  id2class = {};

  _ref = parser.symbols_;
  for (terminal in _ref) {
    id = _ref[terminal];
    id2class[id] = terminal2class[terminal];
  }

  CodeMirror.defineMode("soulver", function() {
    return {
      startState: function() {
        return parser.lexer;
      },
      token: function(stream, lexer) {
        var i, _i, _ref1;
        lexer.setInput(stream.string.slice(stream.pos));
        id = lexer.next();
        for (i = _i = 0, _ref1 = lexer.yytext.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          stream.next();
        }
        return id2class[id];
      }
    };
  });

}).call(this);
