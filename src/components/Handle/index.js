import React from 'react';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { formatStr } from 'utils/format';


export default function Handle({
    handle,
}) {

  return (
    <div className="tooltip">
        <CopyToClipboard text={handle}>
        <span>{ formatStr(handle, 20)}</span>
        </CopyToClipboard>
        <span className="tooltip-text">{handle}</span>
    </div>
  );
}

// ChipWrapper.propTypes = {
//   field: PropTypes.object,
//   form: PropTypes.object,
//   formControlProps: PropTypes.object
// };
