import React from 'react';
import { invoke } from 'lodash';
import { useTranslation } from 'react-i18next';
import scriptJS from 'scriptjs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';

const EXP = 'expiry';
const CVV = 'cvv';
const CARD = 'card-number';
const SHRINK = 'MuiInputLabel-shrink';
const FOCUS = 'Mui-focused';
const PAY = 'pay-now';

const url =
  'https://libs.na.bambora.com/customcheckout/1/customcheckout.js';

class FormStateDocumentAdapter {
  constructor(f) {
    if (!document)
      throw new Error('Global document required');

    this.id = f;
    this.el = document.getElementById(`${f}-container`);

    if (!this.el) return;
    this.helper = this.el.querySelector(`#${f}-helper`);
    this.input = this.el.querySelector(`#${f}`);
    this.label = this.el.querySelector('label');
  }

  $toggleActiveState(verb) {
    try {
      invoke(this.input, `classList.${verb}`, FOCUS);
      invoke(this.label, `classList.${verb}`, SHRINK);
    } catch (e) {
      // noop
    }
  }

  $setHelper(msg) {
    const e = this.helper;
    if (!e) return;
    if (msg) {
      e.setAttribute('style', null);
      e.innerHTML = msg;
    } else {
      e.setAttribute('style', 'display: none;');
      e.innerHTML = '';
    }
  }

  onFocus(v) {
    if (!this.hasError) this.hasValue = v;
    this.$toggleActiveState('add');
  }

  onBlur() {
    if (!this.hasValue) this.$toggleActiveState('remove');
  }

  onError({ message }) {
    this.hasError = true;
    this.isReady = false;
    this.$setHelper(message);
  }

  onComplete() {
    this.hasError = false;
    this.hasValue = true;
    this.isReady = true;
    this.$setHelper(null);
  }
}

const CheckoutBridge = (ids) => {
  const state = ids.reduce(
    (acc, curr) =>
      Object.assign(acc, {
        [curr]: new FormStateDocumentAdapter(curr),
      }),
    {},
  );

  const isReadyForSubmission = () =>
    Object.values(state).every((v) => {
      return v.isReady;
    });

  const route = (fn) => {
    return (args) => {
      const { field } = args;
      return fn.call(state[field], args);
    };
  };

  return {
    focus: route(function markInputsForFocus() {
      this.onFocus(false);
    }),

    blur: route(function markInputsForBlur() {
      this.onBlur();
    }),

    empty: route(function markInputsAsEmpty({ empty }) {
      return !empty ? this.onFocus(true) : this.onBlur();
    }),

    error: route(function handleError(o) {
      this.onError(o);
    }),

    complete: route(function handleSuccess(o) {
      const btn = document.getElementById(PAY);
      this.onComplete(o);
      if (isReadyForSubmission()) {
        btn.setAttribute('disabled', false);
        btn.classList.remove('Mui-disabled');
      } else {
        btn.setAttribute('disabled', true);
        btn.classList.add('Mui-disabled');
      }
    }),
  };
};

const TextFieldWrapper = ({ id, label }) => (
  <Box mb={1} id={`${id}-container`}>
    <TextField
      label={label}
      name={label}
      variant="filled"
      InputProps={{
        inputComponent: () => (
          <div
            id={id}
            className="MuiInputBase-input MuiFilledInput-underline MuiFilledInput-input MuiFilledInput-inputMarginDense"
          />
        ),
      }}
    />

    <FormHelperText
      id={`${id}-helper`}
      error
      style={{ display: 'none' }}
    />
  </Box>
);

export default () => {
  const { t } = useTranslation();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    scriptJS(url, () => {
      const { customcheckout } = window;
      if (customcheckout)
        setTimeout(() => {
          setReady(true);
        }, 1500);
    });
  }, []);

  React.useEffect(() => {
    if (!ready && !('customcheckout' in window)) return;

    const fields = [CARD, CVV, EXP];
    const checkout = window.customcheckout();
    const bridge = CheckoutBridge(fields);

    fields.forEach((key) => {
      checkout.create(key).mount(`#${key}`);
    });

    Object.entries(bridge).forEach(([key, value]) => {
      checkout.on(key, value);
    });
  }, [ready]);

  return (
    <Paper>
      <Box p={2}>
        {ready ? (
          <form>
            <TextFieldWrapper
              label={t('labels:credit')}
              id={CARD}
            />
            <TextFieldWrapper
              label={t('labels:cvv')}
              id={CVV}
            />
            <TextFieldWrapper
              label={t('labels:expirry')}
              id={EXP}
            />
            <Button
              id={PAY}
              disabled
              type="button"
              variant="contained"
              color="primary"
            >
              {t('labels:pay')}
            </Button>
          </form>
        ) : (
          'Wiaint'
        )}
      </Box>
    </Paper>
  );
};
