
class window.Value
	constructor: (@num) ->
		@currency = null
		@percentage = false

	op: (op, other) ->
		switch op
			when ''
				@num = Number(@num + '' + other.num)
			when 'PLUS'
				@num += other.num
			when 'MINUS'
				@num -= other.num
			when 'DIV'
				@num /= other.num
			when 'MUL'
				@num *= other.num
			when 'POW'
				@num = Math.pow(@num, other.num)
			when 'PCT_OFF'
				@num = (1 - @num / 100) * other.num
		@

	setUnit: (unit) ->
		if unit == '%'
			@percentage = true
		else
			@currency = unit
		@

	toString: ->
		isDecimal = (num) ->
			if num % 1 then true else false
		str = ''
		if @currency
			str += @currency
		str += if isDecimal( @num ) then @num.toFixed 2 else parseInt @num
