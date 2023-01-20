export type IntegerType = 'U8' | 'I8' | 'U16' | 'I16' | 'U32' | 'I32';
export type Endianness = 'LE' | 'BE';

export const INTEGER_TYPES: IntegerType[] = ['U8', 'I8', 'U16', 'I16', 'U32', 'I32'];
export const ENDIANNESSES: Endianness[] = ['LE', 'BE'];

export function readInteger(
  data: DataView,
  pos: number,
  type: IntegerType,
  endianness: Endianness = 'LE',
): number {
  if (type === 'I8') {
    return data.getInt8(pos);
  }

  if (type === 'U8') {
    return data.getUint8(pos);
  }

  if (type === 'I16') {
    return data.getInt16(pos, endianness === 'LE');
  }

  if (type === 'U16') {
    return data.getUint16(pos, endianness === 'LE');
  }

  return data.getInt32(pos, endianness === 'LE');
}

export type StructDef<TKeyName extends string = string> = ReadonlyArray<
  readonly [TKeyName, IntegerType]
>;

export function makeStruct<TKeyName extends string = string>(
  data: DataView,
  offset: number,
  structDef: StructDef<TKeyName>,
  endianness: Endianness = 'LE',
): Record<TKeyName, number> {
  let result: any = {};

  for (const [name, type] of structDef) {
    result[name] = readInteger(data, offset, type, endianness);

    if (type === 'U8' || type === 'I8') {
      offset += 1;
    }
    else if (type === 'U16' || type === 'I16') {
      offset += 2;
    }
    else if (type === 'U32' || type === 'I32') {
      offset += 4;
    }
  }

  return result;
}
