import rcWarning, { resetWarned } from 'rc-util/lib/warning';

export { resetWarned };
export function noop() {}

type Warning = (valid: boolean, component: string, message?: string) => void;

// eslint-disable-next-line import/no-mutable-exports
let warning: Warning = noop;
if (process.env.NODE_ENV !== 'production') {
  warning = (valid, component, message) => {
    rcWarning(valid, `[singtelComponent: ${component}] ${message}`);

    if (process.env.NODE_ENV === 'test') {
      resetWarned();
    }
  };
}

export default warning;