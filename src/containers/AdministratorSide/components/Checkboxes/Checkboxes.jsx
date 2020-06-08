import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GreenCheckbox = withStyles({
  root: {
    color: '#26c6da',
    '&$checked': {
      color: '#26c6da'
    }
  }
})(props => <Checkbox color="default" {...props} />);

export default function MyCheckbox({
  value,
  handleChange,
  label,
  inputProps,
  indeterminate,
  onClick
}) {
  return label ? (
    <FormControlLabel
      control={<GreenCheckbox checked={value} onChange={handleChange} />}
      label={label}
    />
  ) : (
    <GreenCheckbox
      checked={value}
      onChange={handleChange}
      onClick={onClick}
      inputProps={inputProps}
      indeterminate={indeterminate}
    />
  );
}
