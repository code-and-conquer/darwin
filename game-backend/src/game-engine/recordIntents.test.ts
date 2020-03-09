import recordIntents from './recordIntents';

describe('recordIntents', () => {
  it('handles no script properly', () => {
    const intentions = recordIntents({
      script: '',
    });
    expect(intentions.length).toBe(0);
  });

  it('handles single script properly', () => {
    const intentions = recordIntents({
      script: "move('UP')",
    });
    expect(intentions.length).toBe(1);
  });

  it('handles double script properly', () => {
    const intentions = recordIntents({
      script: "move('UP');move('DOWN');",
    });
    expect(intentions.length).toBe(2);
  });

  it('handles es6 script properly', () => {
    const intentions = recordIntents({
      script: "((...args) => {move(...args)})('UP')",
    });
    expect(intentions.length).toBe(1);
  });

  it('stops endless scripts', () => {
    expect(() =>
      recordIntents({
        script: 'while(true){}',
      })
    ).toThrow();
  });
});
