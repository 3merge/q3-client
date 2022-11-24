import {
  first,
  get,
  map,
  isObject,
  isFunction,
  size,
} from 'lodash';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import { convertFromRegexPattern } from 'q3-ui-forms/lib/helpers';
import {
  EQUALS,
  NOT_EQUALS,
  ONE_OF,
  NOT_ONE_OF,
  MATCHES,
  GREATER_THAN_OR_EQUALS,
  LESS_THAN_OR_EQUALS,
  BETWEEN,
} from './constants';
import FieldToQueryBuilder from './FieldToQueryBuilder';

export default class SchemaToFieldBuilder {
  constructor(schema) {
    this.__$schema = Object.entries(schema).reduce(
      (acc, [k, v]) => {
        acc[String(k).replace(/\./g, '~')] = {
          originalName: k,
          ...v,
        };
        return acc;
      },
      {},
    );
  }

  static init(schema) {
    return new this(schema);
  }

  static generateOptions(schemaType) {
    return (
      {
        Date: [
          GREATER_THAN_OR_EQUALS,
          LESS_THAN_OR_EQUALS,
          BETWEEN,
        ],
        Number: [
          EQUALS,
          NOT_EQUALS,
          GREATER_THAN_OR_EQUALS,
          LESS_THAN_OR_EQUALS,
          BETWEEN,
        ],
        String: [
          EQUALS,
          NOT_EQUALS,
          ONE_OF,
          NOT_ONE_OF,
          MATCHES,
        ],
        ObjectId: [EQUALS, NOT_EQUALS, ONE_OF, NOT_ONE_OF],
      }[schemaType] || []
    ).sort();
  }

  forEachObjectId(reactHookInvocation) {
    Object.values(this.__$schema).forEach((def) => {
      const { ref, field } = def;
      if (def.type !== 'ObjectId' || !ref || !field) return;

      const { getResults, getLabelFromState } =
        reactHookInvocation(def);

      Object.assign(def, {
        resolver: getLabelFromState,
        loader: getResults,
      });
    });
  }

  map(fn) {
    return map(
      Object.entries(this.__$schema).flatMap(
        ([name, defs]) => {
          const genConditionalStatement = (...op) => ({
            conditional: [
              `${name}__operation=${op.join(',')}`,
            ],
            name: `${name}__${first(op)}`,
          });

          const options = defs.enum;

          const loadOptions =
            defs.loader ||
            (!options && defs.ref
              ? getSafelyForAutoCompleteWithProjection(
                  `/distinct?field=${defs.originalName}&collectionName=${defs.ref}`,
                  'values',
                )
              : undefined);

          const wrapBooleanValue = (val) =>
            !defs.useHasParam
              ? `exists(${val})`
              : `has(${val})`;

          const genFields = () => {
            if (defs.type === 'ObjectId') {
              return [
                {
                  name: `${name}__operation`,
                  options: this.constructor.generateOptions(
                    defs.type,
                  ),
                  type: 'radio',
                  label: null,
                  collapse: false,
                },
                {
                  loadOptions,
                  name: `${name}__${EQUALS}`,
                  type: 'autocomplete',
                  ...genConditionalStatement(EQUALS),
                },
                {
                  loadOptions,
                  name: `${name}__${NOT_EQUALS}`,
                  type: 'autocomplete',
                  ...genConditionalStatement(NOT_EQUALS),
                },
                {
                  loadOptions,
                  name: `${name}__${ONE_OF}`,
                  type: 'chips',
                  ...genConditionalStatement(ONE_OF),
                },
                {
                  loadOptions,
                  name: `${name}__${NOT_ONE_OF}`,
                  type: 'chips',
                  ...genConditionalStatement(NOT_ONE_OF),
                },
              ];
            }

            if (defs.type === 'String') {
              if (loadOptions)
                return [
                  {
                    name: `${name}__operation`,
                    options:
                      this.constructor.generateOptions(
                        defs.type,
                      ),
                    type: 'radio',
                    label: null,
                    collapse: false,
                  },
                  {
                    loadOptions,
                    type: 'autocomplete',
                    ...genConditionalStatement(EQUALS),
                  },
                  {
                    loadOptions,
                    type: 'autocomplete',
                    ...genConditionalStatement(NOT_EQUALS),
                  },
                  {
                    type: 'chips',
                    loadOptions,
                    ...genConditionalStatement(ONE_OF),
                  },
                  {
                    type: 'chips',
                    loadOptions,
                    ...genConditionalStatement(NOT_ONE_OF),
                  },
                  {
                    name: `${name}__${MATCHES}`,
                    type: 'text',
                    ...genConditionalStatement(MATCHES),
                  },
                ];

              if (size(options))
                return [
                  {
                    name: `${name}__${ONE_OF}`,
                    label: null,
                    collapse: false,
                    type: 'checkset',
                    options,
                  },
                ];

              return [
                {
                  name: `${name}__operation`,
                  options: this.constructor
                    .generateOptions(defs.type)
                    .filter(
                      (item) =>
                        ![ONE_OF, NOT_ONE_OF].includes(
                          item,
                        ),
                    ),
                  type: 'radio',
                  label: null,
                  collapse: false,
                },
                {
                  name: `${name}__${MATCHES}`,
                  type: 'text',
                  ...genConditionalStatement(MATCHES),
                },
                {
                  name: `${name}__${EQUALS}`,
                  type: 'text',
                  ...genConditionalStatement(EQUALS),
                },
                {
                  name: `${name}__${NOT_EQUALS}`,
                  type: 'text',
                  ...genConditionalStatement(NOT_EQUALS),
                },
                {
                  name: `${name}__${MATCHES}`,
                  type: 'text',
                  ...genConditionalStatement(MATCHES),
                },
              ];
            }

            if (defs.type === 'Number')
              return [
                {
                  name: `${name}__operation`,
                  options: this.constructor.generateOptions(
                    defs.type,
                  ),
                  type: 'radio',
                  label: null,
                  collapse: false,
                },
                {
                  options: [],
                  type: 'number',
                  ...genConditionalStatement(EQUALS),
                },
                {
                  options: [],
                  type: 'number',
                  ...genConditionalStatement(NOT_EQUALS),
                },
                {
                  options: [],
                  type: 'number',
                  ...genConditionalStatement(
                    GREATER_THAN_OR_EQUALS,
                    BETWEEN,
                  ),
                },
                {
                  options: [],
                  type: 'number',
                  ...genConditionalStatement(
                    LESS_THAN_OR_EQUALS,
                    BETWEEN,
                  ),
                },
              ];

            if (defs.type === 'Date')
              return [
                {
                  name: `${name}__operation`,
                  options: this.constructor.generateOptions(
                    defs.type,
                  ),
                  type: 'radio',
                  label: null,
                  collapse: false,
                },
                {
                  options: [],
                  type: 'date',
                  ...genConditionalStatement(
                    GREATER_THAN_OR_EQUALS,
                    BETWEEN,
                  ),
                },
                {
                  options: [],
                  type: 'date',
                  ...genConditionalStatement(
                    LESS_THAN_OR_EQUALS,
                    BETWEEN,
                  ),
                },
              ];

            if (defs.type === 'Boolean')
              return [
                {
                  label: null,
                  collapse: false,
                  type: 'radio',
                  name,
                  options: [
                    {
                      label: 'yes',
                      value: wrapBooleanValue('true'),
                    },
                    {
                      label: 'no',
                      value: wrapBooleanValue('false'),
                    },
                    {
                      label: 'either',
                      value: '',
                    },
                  ],
                },
              ];

            return [];
          };

          return fn(name, genFields());
        },
      ),
    );
  }

  toQuery(values) {
    return FieldToQueryBuilder(this.__$schema)(values);
  }

  makeCounter(values) {
    const c = this.toQuery(values);

    return (n) =>
      Object.entries(c).reduce((acc, [key, value]) => {
        if ([n, `${n}!`, `${n}<`, `${n}>`].includes(key)) {
          const num = Array.isArray(value)
            ? value.length
            : 1;

          return acc + num;
        }

        return acc;
      }, 0);
  }

  determineOperations(initialValues = {}) {
    return Object.entries(this.__$schema).reduce(
      (acc, [key, value]) => {
        const root = `${key}__`;
        const op = `${root}operation`;

        const keys = Object.keys(initialValues).filter(
          (item) => item.startsWith(root),
        );

        if (keys.length > 1) {
          acc[op] = BETWEEN;
        } else if (keys.length) {
          acc[op] = keys[0].replace(root, '');
        } else {
          acc[op] = value.enum
            ? ONE_OF
            : {
                String: EQUALS,
                Number: EQUALS,
                Date: BETWEEN,
                ObjectId: EQUALS,
              }[value.type];
        }

        return acc;
      },
      {},
    );
  }

  hasNotOperations(name) {
    return ['Boolean'].includes(
      get(this.__$schema, `${name}.type`),
    );
  }

  runResolver(name, rawValue) {
    const schemaField = get(this.__$schema, name);
    const fn = get(schemaField, 'resolver');
    const out = isFunction(fn) ? fn(rawValue) : rawValue;

    // ensures checklist always gets an array
    return size(get(schemaField, 'enum'))
      ? [out].flat().filter(Boolean)
      : out;
  }

  getInitialValues(context) {
    let output = {};

    if (isObject(context)) {
      output = Object.entries(context).reduce(
        (acc, [k, val]) => {
          const root = String(k).replace(/<|>|!/g, '');
          const v = this.runResolver(root, val);

          const getExpandedKeyName = () => {
            if (String(k).endsWith('<'))
              return `${root}__${LESS_THAN_OR_EQUALS}`;

            if (String(k).endsWith('>'))
              return `${root}__${GREATER_THAN_OR_EQUALS}`;

            if (String(k).endsWith('!'))
              return Array.isArray(v)
                ? `${root}__${NOT_ONE_OF}`
                : `${root}__${NOT_EQUALS}`;

            return Array.isArray(v)
              ? `${root}__${ONE_OF}`
              : `${root}__${EQUALS}`;
          };

          if (
            !Array.isArray(v) &&
            String(v).startsWith('/') &&
            String(v).endsWith('/gi')
          ) {
            acc[`${root}__${MATCHES}`] =
              convertFromRegexPattern(v);
          } else if (this.hasNotOperations(k)) {
            acc[k] = v;
          } else {
            acc[getExpandedKeyName()] = v;
          }

          return acc;
        },
        {},
      );

      return {
        ...this.determineOperations(output),
        ...output,
      };
    }

    return this.determineOperations();
  }
}
