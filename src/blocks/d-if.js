import { findInArray } from '../utils';
import { Block } from '../Block';
import { rootBlocks } from '../constants';

rootBlocks['d-if'] = class DIf extends Block {
  static template = html`
    <d-elements
      value="{elems}"
      parentScope="{$$.parentScope}"
      parentTemplate="{$$.parentTemplate}"
    />
  `;

  constructor(opts) {
    super(opts);

    const {
      parentScope,
      htmlChildren
    } = this.$$;
    let index = Infinity;
    const values = htmlChildren.map((child, i) => {
      const {
        name,
        attrs = {},
        children
      } = child;
      let cond = attrs.if;

      if (name !== 'd-else' && cond) {
        cond = parentScope.$$.evaluate(cond, (newValue) => {
          if (!!newValue === values[i]) {
            return;
          }

          values[i] = !!newValue;

          if (i > index) {
            return;
          }

          if (i < index && newValue) {
            index = i;
            this.elems = children;

            return;
          }

          const found = findInArray(values, Boolean);

          if (found) {
            index = found.key;
            this.elems = htmlChildren[found.key].children;
          } else {
            index = Infinity;
            this.elems = null;
          }
        }, this);
      } else {
        cond = true;
      }

      if (cond && index === Infinity) {
        index = i;
        this.elems = children;
      }

      return !!cond;
    });
  }
};
