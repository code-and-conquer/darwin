export default `
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Unit = 'unit';
type Food = 'food';

declare function move(direction: Direction): void;
declare function consume(): void;
declare function attack(unit: Unit = nearestEnemyUnit): void;

declare const store: any;
declare const foods: Food[];
declare const userUnit: Unit;
declare const nearestFood: Food;
declare const enemyUnits: Unit[];
declare const nearestEnemyUnit: Unit;
`;
// export {};
