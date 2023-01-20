export const OBJECT_STRUCT = [
  ['VersionSignature',        'U32'],
  ['NumberOfVertexes',        'U32'],
  ['NumberOfPrimitives',      'U32'],
  ['UnknownFlag',             'U32'],
  ['XFromParent',             'U32'],
  ['YFromParent',             'U32'],
  ['ZFromParent',             'U32'],
  ['OffsetToObjectName',      'U32'],
  ['Always_0',                'U32'],
  ['OffsetToVertexArray',     'U32'],
  ['OffsetToPrimitiveArray',  'U32'],
  ['OffsetToSiblingObject',   'U32'],
  ['OffsetToChildObject',     'U32'],
] as const;

// IMPORTANT: * 4 only because coincidentally every field is an U32 (4 bytes)
export const OBJECT_STRUCT_SIZE = OBJECT_STRUCT.length * 4;

export const VERTEX_STRUCT = [
  ['x', 'U32'],
  ['y', 'U32'],
  ['z', 'U32'],
] as const;

// IMPORTANT: * 4 only because coincidentally every field is an U32 (4 bytes)
export const VERTEX_STRUCT_SIZE = VERTEX_STRUCT.length * 4;

export const PRIMITIVE_STRUCT = [
  ['Unknown_0',                 'U32'],
  ['NumberOfVertexIndexes',     'U32'],
  ['Always_0',                  'U32'],
  ['OffsetToVertexIndexArray',  'U32'],
  ['OffsetToTextureName',       'U32'],
  ['Unknown_1',                 'U32'],
  ['Unknown_2',                 'U32'],
  ['Unknown_3',                 'U32'],
] as const;

// IMPORTANT: * 4 only because coincidentally every field is an U32 (4 bytes)
export const PRIMITIVE_STRUCT_SIZE = PRIMITIVE_STRUCT.length * 4;
