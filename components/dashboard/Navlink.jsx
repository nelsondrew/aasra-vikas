import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ to, className, children }) => {
  const router = useRouter();
  const isActive = router.pathname === to; // Check if the current route matches the link

  // Generate dynamic class names
  const computedClassName =
    typeof className === 'function'
      ? className({ isActive })
      : className;

  return (
    <Link href={to} className={computedClassName}>
      {children}
    </Link>
  );
};

export default NavLink;
