var app = require('./app'),
	config = require('./config');



/* config.set({
	'state': {
		'test-no-type': {
			'active': true
		}
	}
}); */

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
			'toggle2': {
				'label': 'Toggle'
				, 'title': 'This is a description for the toggle'
			}
			, 'toggle3': {
				'label': 'Important'
				, 'important': true
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
			'string2': {
				'label': 'Text'
				, 'title': 'This is a description for the string'
			}
			, 'string3': {
				'label': 'With placeholder'
				, 'placeholder': 'Placeholder text'
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
			'number2': {
				'label': 'Number'
				, 'title': 'This is a description for the number'
			}
			, 'number3': {
				'range': [0, 10]
				, 'label': 'Number with range'
				, 'title': 'This is a description for the number'
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
			'float': {
				'type': 'float'
				, 'range': [0, 1]
				, 'step': .1
				, 'label': 'Range'
				, 'title': 'This is a description for the number'
			}
			, 'float2': {
				'type': 'float'
				, 'range': [0, 100]
				, 'step': 10
				, 'vertical': true
				, 'label': 'Range'
				, 'title': 'This is a description for the number'
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
			'enum': {
				'type': 'enum'
				, 'values': ['item-a', 'item-b', 'item-c']
				, 'label': 'Enum'
				, 'title': 'This is a description for the enum'
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
			'group': {
				'label': 'Group 1'
				, 'key2': {
					'label': 'Key 2'
				}
			}
			, 'group2': {
				'object': {
					'label': 'Group 2'
					, 'columns': true
					, 'fieldset': true
				}
				, 'key2': {
					'label': 'Key 2'
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
			'booleans': {
				'label': 'Bools'
				, 'title': 'A list of booleans'
			}
			, 'numbers': {
				'items': {
					'range': [0, 10]
				}
			}
			, 'ranges': {
				'items': {
					'type': 'float'
					, 'range': [0, 10]
					, 'step': .1
					, 'vertical': true
				}
			}
			
		}
	}
});

config.set({
	'state': {
		'test-array2': {
			'mixed': ['text', 9, false, {'key': 'aha', 'number': 2}]
		}
	}
	, 'type': {
		'test-array2': {
			'mixed': {
				'label': 'Mix'
				, 3: {
					'key': {
						'label': 'Can do'
					}
					, 'number': {
						'label': 'Count'
						, 'range': [-10, 10]
					}
				}
			}
		}
	}
});

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
			'collection': {
				'type': 'collection'
				, 'label': 'Collection'
				, 'headings': ['Name', 'Position', 'Run']
				, 0: {
					'pos': {
						'title': 'YOO'
						, 'range': [-10, 10]
					}
				}
			}
		}
	}
});
