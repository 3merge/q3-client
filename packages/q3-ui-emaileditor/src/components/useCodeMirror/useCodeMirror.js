import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';

import React from 'react';
import beautifyJS from 'js-beautify';
import CodeMirror from 'codemirror/lib/codemirror';
import { debounce, useTheme } from '@material-ui/core';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/lint/lint';
import EmailEditorContext from '../EmailEditorContext';
import usePreview from '../usePreview';

function beautify(content) {
  return beautifyJS.html(content, {
    indent_size: 2, // eslint-disable-line camelcase
    wrap_attributes_indent_size: 2, // eslint-disable-line camelcase
    max_preserve_newline: 0, // eslint-disable-line camelcase
    preserve_newlines: false, // eslint-disable-line camelcase
  });
}

const useCodeMirror = () => {
  const {
    disablePreview,
    onSave,
    value,
    variables,
  } = React.useContext(EmailEditorContext);

  const cm = React.useRef();
  const ref = React.useRef();
  const mode = useTheme()?.palette?.type;
  const [loading, setLoading] = React.useState(false);
  const { html, render } = usePreview();

  const getMjml = () =>
    cm?.current ? cm.current.getValue() : null;

  const change = debounce(() => {
    render(getMjml()).then(() => {
      setLoading(false);
    });
  }, 1500);

  const save = debounce(() => {
    onSave(getMjml());
  }, 250);

  React.useLayoutEffect(() => {
    if (ref.current) {
      cm.current = CodeMirror.fromTextArea(ref.current, {
        autoCloseTags: true,
        foldGutter: true,
        mode: 'xml',
        lineNumbers: true,
        theme: `base16-${mode}`,
      });

      if (!disablePreview)
        cm.current.on('change', () => {
          setLoading(true);
          change();
        });

      return () => {
        if (cm.current) {
          cm.current.toTextArea();
          cm.current = null;
        }
      };
    }

    return undefined;
  }, [disablePreview, mode, variables]);

  React.useEffect(() => {
    if (cm.current && value) {
      cm.current.setValue(beautify(value));
    }
  }, [value]);

  return {
    disablePreview,
    save,
    loading,
    html,
    ref,
  };
};

export default useCodeMirror;
