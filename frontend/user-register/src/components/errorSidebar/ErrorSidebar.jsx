import "./errorSidebar.css";
import Close from "../../assets/close.png";
import Error from "../../assets/error.png";
import PropTypes from "prop-types";

function ErrorSidebar({ errorMessage, showSidebar, onClearError }) {
  if (!showSidebar) {
    return null;
  }

  return (
    <div className="error__sidebar">
      <div className="error__content">
        <img src={Error} />
        <p>{errorMessage}</p>
        <button type="button" onClick={onClearError}>
          <img src={Close} />
        </button>
      </div>
    </div>
  );
}

ErrorSidebar.propTypes = {
  errorMessage: PropTypes.string,
  showSidebar: PropTypes.bool.isRequired,
  onClearError: PropTypes.func.isRequired,
};

export default ErrorSidebar;
