import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const history = useNavigate();

  const handleGoBack = () => {
    history(-1)
  };

  const handleHome = () => {
    history('/dashbaord');
  };

  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but the page you are looking for doesn't exist or an error occurred.</p>
      <div className="error-page-buttons">
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleHome}>Go to Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
