import { Outlet } from "react-router";

import { Sidebar } from "@/components/ui/sidebar";

function Layout() {
  // const navigate = useNavigate();
  // const { appointmentId } = useParams();
  // const isFirstPageLoad = useRef(true);

  // useEffect(() => {
  //   if (!isFirstPageLoad.current)
  //     return;
  //   if (appointmentId !== undefined) {
  //     const { pathname, search, hash } = getUrlData();
  //     const newPathname = pathname.replace(`/${appointmentId}`, "");

  //     navigate(`${newPathname}${search}${hash}`, { replace: true });

  //     isFirstPageLoad.current = false;
  //   }
  // }, [navigate, appointmentId]);

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Layout;
