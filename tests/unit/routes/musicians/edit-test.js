import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | musicians/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:musicians/edit');
    assert.ok(route);
  });
});
