/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                      /* skip whitespace */
[0-9\.]+                 return 'NUMBER'
("$"|"usd"|"dollar""s"?) return 'UNIT'
"canadian dollar""s"?    return 'UNIT'
("�"|"euro""s"?)         return 'UNIT'
"%"\s+"off"              return 'PCT_OFF'
"%"                      return 'UNIT'
"*"                      return 'MUL'
"/"                      return 'DIV'
"-"                      return 'MINUS'
"+"                      return 'PLUS'
"^"                      return 'POW'
"("                      return 'PAREN_OPEN'
")"                      return 'PAREN_CLOSE'
<<EOF>>                  return 'EOF'
[^\s]+                   /* skip text */

/lex

/* operator associations and precedence */

%left 'PLUS' 'MINUS'
%left 'MUL' 'DIV'
%left 'POW'
%left '%off'
%left UMINUS
%left UNIT

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    | EOF
        {return null;}
    ;

num
    : num NUMBER
        {$$ = $num.op('', new Value(Number($NUMBER)));}
    | num UNIT
        {$$ = $num.setUnit($UNIT);}
    | NUMBER
        {$$ = new Value(Number($NUMBER));}
    ;

e
    : e PLUS e
        {$$ = $e1.op('PLUS', $e2);}
    | e MINUS e
        {$$ = $e1.op('MINUS', $e2);}
    | e MUL e
        {$$ = $e1.op('MUL', $e2);}
    | e DIV e
        {$$ = $e1.op('DIV', $e2);}
    | e POW e
        {$$ = $e1.op('POW', $e2);}
    | e PCT_OFF e
        {$$ = $e1.op('PCT_OFF', $e2);}
    | MINUS e %prec UMINUS
        {$$ = $e.op('*', new Value(-1));}
    | UNIT e %prec UNIT
        {$$ = $e.setUnit($UNIT);}
    | PAREN_OPEN e PAREN_CLOSE
        {$$ = $e;}
    | num
        {$$ = $num;}
    ;
