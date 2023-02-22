import QuillCore from 'quill';
import Module from 'quill/core/module';
import Syntax from 'quill/modules/syntax';
// eslint-disable-next-line
import hljs from 'highlight.js';
// eslint-disable-next-line
import 'highlight.js/styles/github.css';

const Original = QuillCore.import;

QuillCore.import = function (...params) {
  if (params[0] === 'modules/syntax') {
    class MonkeyPatched extends Module {
      constructor(quill, options) {
        super(quill, options);

        Object.assign(
          this,
          new Syntax(quill, {
            languages: [
              { key: 'javascript', label: 'Javascript' },
            ],
            hljs,
          }),
        );
      }
    }

    return MonkeyPatched;
  }

  return Original.call(this, ...params);
};

Syntax.register();
Syntax.DEFAULTS.languages = [
  { key: 'javascript', label: 'Javascript' },
  { key: 'ruby', label: 'Ruby' },
];
