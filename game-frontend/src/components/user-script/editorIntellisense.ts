export default `
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
  };
interface GameObject {
    id: ObjectId;
    type: GameObjectTypes;
    position: Position;
    moveBlocking: boolean;
  };
interface Unit extends GameObject {
    type: GameObjectTypes.Unit;
    health: number;
    attributes: Attributes;
  };

enum AttributeName {
    EnduranceBoost = 'enduranceBoost',
    HealthRegenBoost = 'healthRegenBoost',
  };

type Attributes = Record<AttributeName, number>;

interface Consumable extends GameObject {
    type: ConsumableType;
  };

type ConsumableType = GameObjectTypes.Food | PowerupType;

type PowerupType =
  | GameObjectTypes.EnduranceBoost
  | GameObjectTypes.Teleport
  | GameObjectTypes.HealthRegenBoost;

enum GameObjectTypes {
    Unit = 'unit',
    Food = 'food',
    EnduranceBoost = 'enduranceBoost',
    Teleport = 'teleport',
    HealthRegenBoost = 'healthRegenBoost',
  };

declare function move(direction: Direction): void;
declare function consume(): void;
declare function attack(unit: Unit = nearestEnemyUnit): void;

declare const store: any;
declare const foods: Consumable[];
declare const userUnit: Unit;
declare const nearestFood: Consumable;
declare const enemyUnits: Unit[];
declare const nearestEnemyUnit: Unit;
declare const powerups: Consumable[];
declare const nearestPowerup: Consumable;
`;
