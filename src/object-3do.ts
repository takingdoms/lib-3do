export type Object3doTree = Readonly<{
  rootNodes: Object3do[]; // probably ALWAYS only one (have yet to found an erratic case)
}>;

export type Object3do = Readonly<{
  name: string;
  vertices: Vertex3do[];
  primitives: Primitive3do[];
  children: Object3do[];
  xOffset: number; // relative to parent
  yOffset: number; // relative to parent
  zOffset: number; // relative to parent
}>;

export type Vertex3do = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type Primitive3do = Readonly<{
  /**
   * Each value indexes into the Object3do's "vertices" array property.
   * This array's length should always be 1, 2, 3 or 4.
   * The length defines the type it represents: a point, a line, a triangle or a quad.
   */
  vertexIndices: number[];

  textureName: string;
}>;
