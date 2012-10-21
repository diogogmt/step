require('./helper');

var selfText = fs.readFileSync(__filename, 'utf8');

// This example tests stopping a step chain before running all the registered steps

expect('one');
expect('two');
Step(
  function readSelf() {
    fulfill("one");
    fs.readFile(__filename, 'utf8', this);
  },
  function capitalize(err, text) {
    fulfill("two");
    if (err) throw err;
    assert.equal(selfText, text, "Text Loaded");
    return this.exitChain();
  },
  function showIt(err, newText) {
    expect("three");
    if (err) throw err;
    assert.equal(selfText.toUpperCase(), newText, "Text Uppercased");
  }
);
