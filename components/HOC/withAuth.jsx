
export function withAuth(Component) {
  // Define the getServerSideProps logic here
  const getServerSideProps = async (ctx) => {
    // Utility function to parse cookies
    function parseCookies(req) {
      const cookie = req?.headers?.cookie || ""; // Get the cookie string from the request header
      const cookies = {};

      cookie.split(";").forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        if (name && value) {
          cookies[name] = value;
        }
      });

      return cookies;
    }

    const cookies = parseCookies(ctx.req);
    let token = cookies.token || ""; // Get the token from cookies

    // If no token is found, redirect to the login page
    if (!token) {
      const redirectUrl = encodeURIComponent(ctx.req.url); // The page the user was trying to visit

      return {
        redirect: {
          destination: `/login?redirect=${redirectUrl}`,
          permanent: false,
        },
      };
    }

    // Verify the token by calling the API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const data = await res.json();

    // Return the user data as a prop for the wrapped component
    return {
      props: {
        user: data.decodedToken,
      },
    };
  };

  // Return the component with the getServerSideProps function attached
  return {
    getServerSideProps,
    component: Component,
  };
}
