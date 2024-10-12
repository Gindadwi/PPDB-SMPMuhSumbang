// common/Button.js
import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { className, onClick, name, type = "button" } = props; // Spesifikasikan default type

  return (
    <button
      className={`text-warnaUtama text-sm lg:px-10 p-2 rounded-lg ${className}`} // Letakkan className di akhir
      onClick={onClick}
      type={type} // Pastikan type diterapkan dengan benar
    >
      {name}
    </button>
  );
}

// Validasi prop menggunakan PropTypes
Button.propTypes = {
  className: PropTypes.string, // Optional
  onClick: PropTypes.func, // Optional
  name: PropTypes.string.isRequired, // Wajib
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Spesifikasikan opsi type
};

export default Button;
