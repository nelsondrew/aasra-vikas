import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import show_hide from "/public/images/icon/show-hide.png";
import signInAndGetToken from "../../api/authApi";
import { setTokenInCookie } from "../../utils/authUtils";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Initialize the router to handle redirects
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const loginCreds = { email, password };

      const jwt = await signInAndGetToken({
        email: loginCreds.email,
        password: loginCreds.password,
      });

      // Store the token in a cookie
      setTokenInCookie(jwt);

      // Check if a 'redirect' query param exists
      const redirectUrl = router.query.redirect || "/"; // Use the `redirect` query param or default to home page

      window.location.href = redirectUrl;
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <section className="sign-in-up login">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="form-content">
                <div className="section-header">
                  <h5 className="sub-title">The Power of Financial Freedom</h5>
                  <h2 className="title">Set Up Your Password</h2>
                  <p>
                    Your security is our top priority. You&#39;ll need this to
                    log into your Aasra Vikas account
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="single-input">
                        <label htmlFor="email">Enter Your Email ID</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Your email ID here"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="single-input">
                        <label htmlFor="password">Enter Your Password</label>
                        <div className="password-show d-flex align-items-center">
                          <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            className="passInput"
                            id="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Image
                            className="showPass"
                            src={show_hide}
                            alt="icon"
                            onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display any error message */}
                  {error && <p className="error-message">{error}</p>}

                  <div className="btn-area">
                    <button
                      className="cmn-btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Logging In..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
