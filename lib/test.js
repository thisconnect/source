var app = require('./app')
	, config = require('./config');



config.set({
	'state': {
		'test-no-schema': {
			'active': true
			, 'info': 'a text'
			, 'amount': 1
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
			'toggle': true
			, 'toggle3': false
			, 'toggle2': false
		}
	}
	, 'schema': {
		'test-boolean': {
			'title': 'Boolean tests'
			, 'type': 'object'
			, 'properties': {
				'toggle2': {
					'title': 'Toggle'
					, 'type': 'boolean'
					, 'description': 'This is a description for the toggle'
				}
				, 'toggle3': {
					'title': 'Important'
					, 'type': 'boolean'
					, 'important': true
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-string': {
			'string2': 'def'
			, 'string3': ''
		}
	}
	, 'schema': {
		'test-string': {
			'type': 'object'
			, 'properties': {
				'string2': {
					'title': 'Text'
					, 'description': 'This is a description for the string'
				}
				, 'string3': {
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
			'number2': 2
			, 'number3': 3
		}
	}
	, 'schema': {
		'test-number': {
			'type': 'object'
			, 'properties': {
				'number2': {
					'title': 'Number'
					, 'description': 'This is a description for the number'
				}
				, 'number3': {
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
			'float': .5
			, 'float2': 50
		}
	}
	, 'schema': {
		'test-float': {
			'type': 'object'
			, 'properties': {
				'float': {
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
			'enum': 'item-b'
		}
	}
	, 'schema': {
		'test-enum': {
			'type': 'object'
			, 'properties': {
				'enum': {
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
			'group': {
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
			'type': 'object'
			, 'properties': {
				'group': {
					'title': 'Group 1'
					, 'type': 'object'
					, 'properties': {
						'key2': {
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
		'test-array': {
			'booleans': [true, false, false, true]
			, 'strings': ['one', 'two', 'three']
			, 'numbers': [0, 1, 2]
			, 'ranges': [.1, .2, .3, .4, .5]
		}
	}
	, 'schema': {
		'test-array': {
			'type': 'object'
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
		'test-array2': [true, false, false, true]
	}
	, 'schema': {
		'test-array2': {
			'title': 'Array 2'
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
		'test-collection': {
			'collection': [
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
	}
	, 'schema': {
		'test-collection': {
			'type': 'object'
			, 'properties': {
				'collection': {
					'type': 'collection'
					, 'title': 'Collection'
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
		}
	}
});

config.set({

	'state': {
		'test-definitions': {
			'def1': {
				'sine': {
					'level': 0.1
				}
				, 'envelope': {
					'attack': 234
					, 'decay': 589
				}
			}
		}
	}

	, 'schema': {

		'test-definitions': {
			'title': 'Test definitions'
			, 'type': 'object'
			, 'properties': {
				'def1': {
					'title': 'Defined 1 (direct $ref)'
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
