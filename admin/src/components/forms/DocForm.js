import React from 'react';

function DocForm(props) {
  const { handleSubmit, handleChange, inputs } = props;
  return (
    <form onSubmit={handleSubmit}>
      <p>The document form...</p>
    </form>
  );
}

export default DocForm;
