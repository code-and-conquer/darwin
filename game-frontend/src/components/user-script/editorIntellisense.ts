export default `
declare enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
declare type ObjectId = string;

enum GameObjectTypes {
  Unit = 'unit',
  Food = 'food',
  Wall = 'wall',
  EnduranceBoost = 'enduranceBoost',
  Teleport = 'teleport',
  HealthRegenBoost = 'healthRegenBoost',
}
interface Position {
  x: number;
  y: number;
}
declare interface GameObject {
  id: ObjectId;
  type: GameObjectTypes;
  position: Position;
  moveBlocking: boolean;
}

enum AttributeName {
  EnduranceBoost = 'enduranceBoost',
  HealthRegenBoost = 'healthRegenBoost',
}
type Attributes = Record<AttributeName, number>;
interface Unit extends GameObject {
  type: GameObjectTypes.Unit;
  health: number;
  attributes: Attributes;
}

declare type ConsumableType = GameObjectTypes.Food | PowerupType;

interface Consumable extends GameObject {
  type: ConsumableType;
}

type PowerupType =
  | GameObjectTypes.EnduranceBoost
  | GameObjectTypes.Teleport
  | GameObjectTypes.HealthRegenBoost;

declare const store: Record<string, unknown>;
declare const foods: Consumable[];
declare const walls: GameObject[];
declare const nearestFood: Consumable;
declare const userUnit: Unit;
declare const enemyUnits: Unit[];
declare const nearestEnemyUnit: Unit;
declare const powerups: Consumable[];
declare const nearestPowerup: Consumable;

declare function move(direction: Direction): void;
declare function attack(unit: Unit = nearestEnemyUnit): void;
declare function consume(): void;

declare function log(...args: unknown[]): void;
`;
