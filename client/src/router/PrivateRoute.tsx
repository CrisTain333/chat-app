import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../redux/hooks";
interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { isLoading, user, token } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <ThreeCircles
          height="150"
          width="150"
          color="#f62343"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    );
  }

  if (user === null && token === "" && !isLoading) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
