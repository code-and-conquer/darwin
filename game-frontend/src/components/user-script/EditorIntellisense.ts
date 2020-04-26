export default `
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Unit = any;

declare function move(direction: Direction): void;
declare function consume(): void;
declare function attack(unit: Unit): void;

declare const store: any;
declare const foods: any[];
declare const userUnit: any;
declare const nearestFood: any;
declare const enemyUnits: any[];
declare const nearestEnemyUnit: any;
`;
export {};
