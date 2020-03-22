import StateBuilder from '../test-helper/StateBuilder';
import recordIntents from './recordIntents';
import { State } from '../../../darwin-types/State';
import { UserExecutionContext } from '../../../darwin-types/UserContext';

const UNIT_ID = 'unit1';
let emptyState: State;
let userExecutionContext: UserExecutionContext;

describe('recordIntents', () => {
  beforeEach(() => {
    emptyState = StateBuilder.buildState().build();
    userExecutionContext = {
      unitId: UNIT_ID,
      userScript: {
        script: '',
      },
    };
  });

  it('handles no script properly', () => {
    userExecutionContext.userScript = {
      script: '',
    };

    const intentions = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(0);
  });

  it('handles single script properly', () => {
    userExecutionContext.userScript = {
      script: "move('UP')",
    };

    const intentions = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(1);
  });

  it('handles double script properly', () => {
    userExecutionContext.userScript = {
      script: "move('UP');move('DOWN');",
    };

    const intentions = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(2);
  });

  it('handles es6 script properly', () => {
    userExecutionContext.userScript = {
      script: "((...args) => {move(...args)})('UP')",
    };

    const intentions = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(1);
  });

  it('stops endless scripts', () => {
    userExecutionContext.userScript = {
      script: 'while(true){}',
    };

    expect(() => recordIntents(userExecutionContext, emptyState)).toThrow();
  });
});
