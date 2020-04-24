import { State, UserExecutionContext } from '@darwin/types';
import StateBuilder from '../../test-helper/StateBuilder';
import recordIntents from './recordIntents';

describe('recordIntents', () => {
  const UNIT_ID = 'unit1';
  let emptyState: State;
  let userExecutionContext: UserExecutionContext;

  beforeEach(() => {
    emptyState = StateBuilder.buildState().build();
    userExecutionContext = {
      unitId: UNIT_ID,
      userScript: {
        script: '',
      },
      store: {},
    };
  });

  it('handles no script properly', () => {
    userExecutionContext.userScript = {
      script: '',
    };

    const [intentions] = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(0);
  });

  it('handles variable properly', () => {
    userExecutionContext.userScript = {
      script: 'store.isProperlyStored = true',
    };

    const [, newStore] = recordIntents(userExecutionContext, emptyState);
    expect(newStore.isProperlyStored).toBe(true);
    // previous value must be unchanged
    expect(userExecutionContext.store.isProperlyStored).toBe(undefined);
  });

  it('handles single script properly', () => {
    userExecutionContext.userScript = {
      script: "move('UP')",
    };

    const [intentions] = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(1);
  });

  it('handles double script properly', () => {
    userExecutionContext.userScript = {
      script: "move('UP');move('DOWN');",
    };

    const [intentions] = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(2);
  });

  it('handles es6 script properly', () => {
    userExecutionContext.userScript = {
      script: "((...args) => {move(...args)})('UP')",
    };

    const [intentions] = recordIntents(userExecutionContext, emptyState);
    expect(intentions.length).toBe(1);
  });

  it('stops endless scripts', () => {
    userExecutionContext.userScript = {
      script: 'while(true){}',
    };

    expect(() => recordIntents(userExecutionContext, emptyState)).toThrow();
  });
});
