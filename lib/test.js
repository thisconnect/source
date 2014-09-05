var config = require('./config');


config.set({
	'state': {
		'test-no-schema': {
			'toggle': true
			, 'string': 'a text'
			, 'number': 1
			, 'float': 1.11
			, 'booleans': [true, false, false, true]
			, 'strings': ['one', 'two', 'three']
			, 'numbers': [0, 1, 2]
			, 'group': {
				'key1': true
				, 'key2': 'test'
			}
		}
	}
});

config.set({
	'state': {
		'test-boolean': {
			'toggle1': false
			, 'toggle2': false
		}
	}
	, 'schema': {
		'test-boolean': {
			'title': 'Boolean tests'
			, 'type': 'object'
			, 'properties': {
				'toggle1': {
					'title': 'Important'
					, 'type': 'boolean'
					, 'important': true
				}
				, 'toggle2': {
					'title': 'Toggle'
					, 'type': 'boolean'
					, 'description': 'This is a description for the toggle'
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-string': {
			'string1': 'def'
			, 'string2': ''
		}
	}
	, 'schema': {
		'test-string': {
			'title': 'String tests'
			, 'type': 'object'
			, 'properties': {
				'string1': {
					'title': 'Text'
					, 'description': 'This is a description for the string'
				}
				, 'string2': {
					'title': 'With placeholder'
					, 'placeholder': 'Placeholder text'
					, 'maxLength': 4
					, 'minLength': 2
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-number': {
			'number1': 2
			, 'number2': 3
		}
	}
	, 'schema': {
		'test-number': {
			'title': 'Number tests'
			, 'type': 'object'
			, 'properties': {
				'number1': {
					'title': 'Number'
					, 'description': 'This is a description for the number'
				}
				, 'number2': {
					'range': [0, 10]
					, 'title': 'Number with range'
					, 'description': 'This is a description for the number'
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-float': {
			'float1': .5
			, 'float2': 50
		}
	}
	, 'schema': {
		'test-float': {
			'title': 'Float tests'
			, 'type': 'object'
			, 'properties': {
				'float1': {
					'type': 'float'
					, 'range': [0, 1]
					, 'step': .1
					, 'title': 'Range'
					, 'description': 'This is a description for the number'
				}
				, 'float2': {
					'type': 'float'
					, 'range': [0, 100]
					, 'step': 10
					, 'vertical': true
					, 'title': 'Range'
					, 'description': 'This is a description for the number'
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-enum': {
			'enum1': 'item-b'
		}
	}
	, 'schema': {
		'test-enum': {
			'title': 'Enum tests'
			, 'type': 'object'
			, 'properties': {
				'enum1': {
					'type': 'enum'
					, 'values': ['item-a', 'item-b', 'item-c']
					, 'title': 'Enum'
					, 'description': 'This is a description for the enum'
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-object': {
			'group1': {
				'key1': true
				, 'key2': 'test'
			}
			, 'group2': {
				'key1': true
				, 'key2': 'test'
			}
		}
	}
	, 'schema': {
		'test-object': {
			'title': 'Object tests'
			, 'type': 'object'
			, 'properties': {
				'group1': {
					'title': 'Group 1'
					, 'type': 'object'
					, 'properties': {
						'key1': {
							'title': ''
						}
						, 'key2': {
							'title': 'Key 2'
						}
					}
				}
				, 'group2': {
					'title': 'Group 2'
					, 'type': 'object'
					, 'columns': true
					, 'fieldset': true
					, 'properties': {
						'key2': {
							'title': 'Key 2'
						}
					}
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-array1': {
			'booleans': [true, false, false, true]
			, 'strings': ['one', 'two', 'three']
			, 'numbers': [0, 1, 2]
			, 'ranges': [.1, .2, .3, .4, .5]
		}
	}
	, 'schema': {
		'test-array1': {
			'title': 'Array tests'
			, 'type': 'object'
			, 'properties': {
				'booleans': {
					'title': 'Bools'
					, 'type': 'array'
					, 'minItems': 1 // TODO
					, 'description': 'A list of booleans'
					, 'items': {
						'type': 'boolean'
						, 'default': true
					}
				}
				, 'strings': {
					'title': 'Strings'
					, 'type': 'array'
					, 'uniqueItems': true // TODO
					, 'items': {
						'type': 'string'
						, 'default': ''
					}
				}
				, 'numbers': {
					'title': 'Numbers'
					, 'type': 'array'
					, 'items': {
						'type': 'number'
						, 'range': [0, 10]
						, 'default': 5
					}
				}
				, 'ranges': {
					'title': 'Ranges'
					, 'type': 'array'
					, 'items': {
						'type': 'float'
						, 'range': [0.0, 1]
						, 'step': .1
						, 'vertical': true
						, 'default': .5
					}
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-boolean-array': [true, false, false, true]
	}
	, 'schema': {
		'test-boolean-array': {
			'title': 'Boolean Array'
			, 'type': 'array'
			, 'items': {
				'type': 'boolean'
				, 'default': true
			}
		}
	}
});

/*
config.set({
	'state': {
		'test-array2': {
			'mixed': ['text', 9, false, {'key': 'aha', 'number': 2}]
		}
	}
	, 'schema': {
		'test-array2': {
			'type': 'object'
			, 'properties': {
				'mixed': {
					'title': 'Mix'
					, 3: {
						'key': {
							'title': 'Can do'
						}
						, 'number': {
							'title': 'Count'
							, 'range': [-10, 10]
						}
					}
				}
			}
		}
	}
});
*/

config.set({
	'state': {
		'test-collection': [
			{
				'name': 'A'
				, 'pos': 1
				, 'run': true
			}
			, {
				'name': 'B'
				, 'pos': 2
				, 'run': false
			}
			, {
				'name': 'C'
				, 'pos': 3
				, 'run': true
			}
		]
	}
	, 'schema': {
		'test-collection': {
			'title': 'Collection'
			, 'type': 'collection'
			, 'headings': ['Name', 'Pos', 'Run']
			, 'additionalProperties': false
			, 'items': {
				'properties': {
					'name': {
						'type': 'enum'
						, 'values': ['A', 'B', 'C']
					}
					, 'pos': {
						'range': [-10, 10]
					}
				}
			}
		}
	}
});


config.set({

	'state': {
		'test-definitions': {
			'sine': {
				'level': 0.1
			}
			, 'envelope': {
				'attack': 234
				, 'decay': 589
			}
		}
	}

	, 'schema': {

		'test-definitions': {
			'title': 'Test definitions (direct $ref)'
			, 'type': 'object'
			, 'properties': {
				'sine': {
					'$ref': '#/definitions/sine'
				}
				, 'envelope': {
					'$ref': '#/definitions/envelope'
				}
			}
		}
		, 'definitions': {
			'sine': {
				'title': 'Sine'
				, 'type': 'object'
				, 'additionalProperties': false
				, 'properties': {
					'level': {
						'title': 'Level'
						, 'type': 'number'
					}
				}
			}
			, 'envelope': {
				'title': 'Envelope'
				, 'type': 'object'
				, 'additionalProperties': false
				, 'properties': {
					'attack': {
						'title': 'Attack'
						, 'type': 'number'
					}
					, 'decay': {
						'title': 'Decay'
						, 'type': 'number'
					}
				}
			}
		}

	}
});


config.set({

	'state': {
		'test-ref-array': [
			{
				'$type': 'sine'
				, 'level': 0.1
			}
			, {
				'$type': 'sine'
				, 'level': 0.5
			}
			, {
				'$type': 'envelope'
				, 'attack': 234
				, 'decay': 589
			}
		]
	}

	, 'schema': {

		'test-ref-array': {
			'title': 'Test $ref array'
			, 'type': 'array'
			, 'items': {
				'anyOf': [
					{ '$ref': '#/definitions/sine' },
					{ '$ref': '#/definitions/envelope' }
				]
			}
		}
		, 'definitions': {
			'module': {
				'type': 'enum'
				, 'values': ['sine', 'envelope']
			}
			, 'sine': {
				'title': 'Sine'
				, 'type': 'object'
				, 'additionalProperties': false
				, 'properties': {
					'$type': {
						'$ref': '#/definitions/module'
					}
					, 'level': {
						'title': 'Level'
						, 'type': 'number'
						, 'default': 0.1
					}
				}
			}
			, 'envelope': {
				'title': 'Envelope'
				, 'type': 'object'
				, 'additionalProperties': false
				, 'properties': {
					'$type': {
						'$ref': '#/definitions/module'
					}
					, 'attack': {
						'title': 'Attack'
						, 'type': 'number'
						, 'default': 12
					}
					, 'decay': {
						'title': 'Decay'
						, 'type': 'number'
						, 'default': 342
					}
				}
			}
		}

	}
});

/*
config.set({

	'state': {
		'test-oneOf': {
			'def2': [
				{
					'sine': {
						'level': 0.1
					}
				}
				, {
					'sine': {
						'level': 0.5
					}
				}
				, {
					'envelope': {
						'attack': 234
						, 'decay': 589
					}
				}
				, {
					'envelope': {
						'attack': 4578
						, 'decay': 9769
					}
				}
			]
		}
	}

	, 'schema': {

		'test-oneOf': {
			'title': 'Test definitions'
			, 'type': 'object'
			, 'properties': {
				'def2': {
					'title': 'Defined 2 (oneOf)'
					, 'type': 'array'
					, 'items': {
						'oneOf': [
							{'$ref': '#/definitions/sine'}
							, {'$ref': '#/definitions/envelope'}
						]
					}
				}
			}
		}
		, 'definitions': {
			'sine': {
				'title': 'Sine'
				, 'type': 'object'
				, 'additionalProperties': false
				, 'properties': {
					'level': {
						'type': 'number'
					}
				}
			}
			, 'envelope': {
				'title': 'Envelope'
				, 'type': 'object'
				, 'additionalProperties': false
				, 'properties': {
					'attack': {
						'type': 'number'
					}
					, 'decay': {
						'type': 'number'
					}
				}
			}
		}

	}
});
*/
