import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { load as loadAccount } from "./account";

import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'



const data = {
  // used to populate "account" reducer when "Load" is clicked
  person: {
    firstName: "Jane",
    lastName: "Doe",
    age: "42",
    sex: "female",
    employed: true,
    favoriteColor: "Blue",
    bio: "Born to write amazing Redux code."
  }
};
const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
/*const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined */
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined


const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) =>
    <div>
      <label>
        {label}
      </label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
          ((error &&
            <span>
              {error}
            </span>) ||
            (warning &&
              <span>
                {warning}
              </span>))}
      </div>
    </div>

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
)

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
     
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'age',
        id: 'age-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(data)}>
          Load Account
        </button>
      </div>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="person.firstName"
            component={renderTextField}
            type="text"
            placeholder="First Name"
            validate={[required, maxLength15, minLength2]}
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="person.lastName"
            component={renderTextField}
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Age</label>
        <div>
          <Field
            name="person.age"
            component={renderTextField}
            type="number"
            placeholder="Age"
          />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
        <Field name="person.sex" component={radioButton}>
          <Radio value="male" label="male" />
          <Radio value="female" label="female" />
        </Field>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="person.favoriteColor" component={renderSelectField}>
            <option value="">Select a color...</option>
            {colors.map(colorOption => (
              <option value={colorOption} key={colorOption}>
                {colorOption}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="person.employed"
            id="employed"
            component={renderCheckbox}
            type="checkbox"
          />
        </div>
      </div>
      <div>
        
        <div>
          <Field
          name="person.bio"
          component={renderTextField}
          label="Notes"
          multiline
          rowsMax="4"
          margin="normal"
        />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
      </div>
    </form>
  );
};

/* const validate = val => {
  const errors = {};
  if (!val.firstName) {
    console.log("First Name is required");
    errors.firstName = "Required";
  }
  if (!val.lastName) {
    console.log("Last Name is required");
    errors.lastName = "Required";
  }
  if (!val.email) {
    console.log("email is required");
    errors.email = "Required";
  } else if (!/^.+@.+$/i.test(val.email)) {
    console.log("email is invalid");
    errors.email = "Invalid email address";
  }
  if (!val.age) {
    errors.age = "Required";
  } else if (isNaN(Number(val.age))) {
    errors.age = "Must be a number";
  } else if (Number(val.age) < 18) {
    errors.age = "Sorry, you must be at least 18 years old";
  }
  return errors;
}; */

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: "initializeFromState",
  //validate
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(InitializeFromStateForm);

export default InitializeFromStateForm;
