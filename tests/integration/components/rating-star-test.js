import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rating-star', function(hooks) {
  setupRenderingTest(hooks);

  test('Renders the full and empty stars correctly', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('rating', 4);
    this.set('maxRating', 5);

    await render(hbs`<RatingStar @rating={{this.rating}} @maxRating={{this.maxRating}} />`);

    assert.dom('.fa-star').exists({count:4}, 'The right amount of full stars is rendered');

    assert.dom('.fa-star-o').exists({count: 1}, 'The right amount of empty stars is rendered');

    this.set('maxRating', 10);

    assert.dom('.fa-star').exists({count: 4}, 'The right amount of full stars is rendered after changing maxRating');

    assert.dom('.fa-star-o').exists({count: 6}, 'The right amount of empty stars is rendered after changing maxRating');


    this.set('rating', 2);

    assert.dom('.fa-star').exists({count: 2}, 'The right amount of full stars is rendered after changing rating');

    assert.dom('.fa-star-o').exists({count: 8}, 'The right amount of empty stars is rendered after changing rating');


    // Template block usage:
    await render(hbs`
      <RatingStar>
        template block text
      </RatingStar>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
