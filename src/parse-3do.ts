import { Object3do, Object3doTree, Primitive3do, Vertex3do } from "./object-3do"
import * as ByteUtils from "./byte-utils";
import { OBJECT_STRUCT, PRIMITIVE_STRUCT, PRIMITIVE_STRUCT_SIZE, VERTEX_STRUCT, VERTEX_STRUCT_SIZE } from "./structs";

function fromBuffer(data: DataView): Object3doTree {
  return {
    rootNodes: parseObjects(data, 0),
  };
}

function parseObjects(data: DataView, offset: number): Object3do[] {
  const result: Object3do[] = [];
  let nextSibling = offset;

  do {
    const struct = ByteUtils.makeStruct(data, nextSibling, OBJECT_STRUCT);

    // debugPrintStruct(struct);

    const name = parseName(data, struct['OffsetToObjectName']);

    const vertices = parseVertices(
      data,
      struct['OffsetToVertexArray'],
      struct['NumberOfVertexes'],
    );

    const primitives = parsePrimitives(
      data,
      struct['OffsetToPrimitiveArray'],
      struct['NumberOfPrimitives'],
    );

    const children = struct['OffsetToChildObject'] !== 0
      ? parseObjects(data, struct['OffsetToChildObject'])
      : [];

    const object: Object3do = {
      name,
      vertices,
      primitives,
      children,
      xOffset: struct['XFromParent'],
      yOffset: struct['YFromParent'],
      zOffset: struct['ZFromParent'],
    };

    result.push(object);

    nextSibling = struct['OffsetToSiblingObject'];
  } while (nextSibling !== 0);

  return result;
}

const textDecoder = new TextDecoder('ascii');
const NAME_LIMIT = 256;
function parseName(data: DataView, offset: number): string {
  let size = 0;

  for (let i = 0; i < NAME_LIMIT; i++) {
    size = i;
    const nextByte = data.getUint8(offset + i);
    if (nextByte === 0)
      break;
  }

  /*if (size === 0) {
    return '';
  }*/

  const slice = new Uint8Array(data.buffer, offset, size);
  return textDecoder.decode(slice);
}

function parseVertices(data: DataView, offset: number, count: number): Vertex3do[] {
  const result: Vertex3do[] = [];

  for (let i = 0; i < count; i++) {
    const struct = ByteUtils.makeStruct(
      data,
      offset + (i * VERTEX_STRUCT_SIZE),
      VERTEX_STRUCT,
    );

    result.push({
      x: struct.x,
      y: struct.y,
      z: struct.z,
    });
  }

  return result;
}

function parsePrimitives(data: DataView, offset: number, count: number): Primitive3do[] {
  const result: Primitive3do[] = [];

  for (let i = 0; i < count; i++) {
    const struct = ByteUtils.makeStruct(
      data,
      offset + (i * PRIMITIVE_STRUCT_SIZE),
      PRIMITIVE_STRUCT,
    );

    const vertexIndices: number[] = [];

    for (let v = 0; v < struct['NumberOfVertexIndexes']; v++) {
      // v * 2 because each vertex index reads 2 bytes (aka Uint16)
      const nextVertexIndex = data.getUint16(struct['OffsetToVertexIndexArray'] + (v * 2), true);
      vertexIndices.push(nextVertexIndex);
    }

    const textureName = parseName(data, struct['OffsetToTextureName']);

    result.push({
      vertexIndices,
      textureName,
    });
  }

  return result;
}

function debugPrintStruct(struct: Record<string, number>) {
  for (const [field, value] of Object.entries(struct)) {
    const hex = '0x' + value.toString(16).toUpperCase().padStart(4, '0');
    console.log(`${field}: ${value} (${hex})`);
  }
  console.log();
}

export const Parse3do = {
  fromBuffer,
};
