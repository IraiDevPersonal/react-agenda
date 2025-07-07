import { Outlet } from "react-router";

import { Sidebar } from "@/components/ui/sidebar";

function Layout() {
  // const navigate = useNavigate();
  // const { appointmentUid } = useParams();
  // const isFirstPageLoad = useRef(true);

  // useEffect(() => {
  //   if (!isFirstPageLoad.current)
  //     return;
  //   if (appointmentUid !== undefined) {
  //     const { pathname, search, hash } = getUrlData();
  //     const newPathname = pathname.replace(`/${appointmentUid}`, "");

  //     navigate(`${newPathname}${search}${hash}`, { replace: true });

  //     isFirstPageLoad.current = false;
  //   }
  // }, [navigate, appointmentUid]);

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Layout;
