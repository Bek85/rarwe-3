import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | musicians/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:musicians/new');
    assert.ok(route);
  });
});
