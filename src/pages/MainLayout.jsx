import React, { useEffect, useState } from "react";
import TopBar from "../components/Layout/TopBar";
import SideBar from "../components/Layout/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllConfig } from "../services/operations/Dashboard";
import LoadingSpinner from "../components/Loader";
import { logout } from "../services/operations/Auth";
import { setShowIntroModal } from "../store/slices/profileSlice";
import IntroSlider from "../components/Carousel/IntroSlider";

export default function MainLayout() {
  const { loading, userConfig,showIntroModal } = useSelector((state) => state.profile); // Redux loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch configuration and user details on component mount
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        await dispatch(getAllConfig(navigate));

        // await dispatch(loadFromLocalStorage(navigate));
      } catch (error) {
        console.error("Error fetching configurations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [dispatch, navigate]);

  // Show loading spinner during initialization
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => dispatch(logout(navigate));
  const handleCloseModal = () => dispatch(setShowIntroModal(false));

  return (
    <div className={"mainLayoutContainer"}>
      {/* Top bar and sidebar */}
      <SideBar />
      
      {/* Main content area */}
      <div className={"contentContainer"}>
        <TopBar onLogout={handleLogout} />
        <div className={"dynamicContent"}>
          <Outlet />
        </div>
      </div>
      {showIntroModal && <IntroSlider handleCloseModal={handleCloseModal} />}
    </div>
  );
}
