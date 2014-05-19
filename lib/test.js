var app = require('./app'),
	config = require('./config');



config.set({
	'state': {
		'test-no-schema': {
			'active': true
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
	, 'type': {
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
			'string': 'abc'
			, 'string2': 'def'
			, 'string3': ''
		}
	}
	, 'type': {
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
				}
			}
		}
	}
});

config.set({
	'state': {
		'test-number': {
			'number': 1
			, 'number2': 2
			, 'number3': 3
		}
	}
	, 'type': {
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
	, 'type': {
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
	, 'type': {
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
	, 'type': {
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
	, 'type': {
		'test-array': {
			'type': 'object'
			, 'properties': {
				'booleans': {
					'title': 'Bools'
					, 'type': 'array'
					, 'description': 'A list of booleans'
				}
				, 'numbers': {
					'title': 'Numbers'
					, 'type': 'array'
					, 'items': {
						'range': [0, 10]
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
					}
				}
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
	, 'type': {
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
	, 'type': {
		'test-collection': {
			'type': 'object'
			, 'properties': {
				'collection': {
					'type': 'collection'
					, 'title': 'Collection'
					, 'headings': ['Name', 'Pos', 'Run']
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
