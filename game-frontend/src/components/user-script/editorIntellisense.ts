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
// type Food = 'food';
interface Consumable extends GameObject {
    type: ConsumableType;
  };
type Consume = (
    id: ObjectId,
    state: State,
    UserContext: UserContext
  ) => State;

type ConsumableType = GameObjectTypes.Food | PowerupType;

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
`;
