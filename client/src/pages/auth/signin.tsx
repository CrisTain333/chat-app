import { Box, Circle, Text } from "@chakra-ui/react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginUserMutation } from "../../redux/feature/user/userApi";
import {
  getUser,
  setToken,
} from "../../redux/feature/user/userSlice";
import { toast } from "react-hot-toast";
import SmallLoader from "../../components/Loader/SmallLoader";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const data = {
      email,
      password,
    };
    const response: any = await loginUser(data);
    const { data: responseData, error } = response;
    if (responseData?.statusCode === 200) {
      toast.success(responseData?.message);
      await dispatch(
        getUser(responseData?.data?.accessToken)
      );
      dispatch(setToken(responseData?.data?.accessToken));
      navigate(from, { replace: true });
    } else {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div>
      <Box
        position={"relative"}
        bg={"#100E27"}
        height={"100vh"}
      >
        <Circle
          position={"absolute"}
          zIndex={"1"}
          left={"15%"}
          top={"-730px"}
          filter={"blur(110px)"}
          size={"900px"}
          bg="#2655D4"
        />
        <Box
          width={"full"}
          position={"absolute"}
          zIndex={"2"}
          color={"white"}
        >
          <main className="w-full h-screen flex flex-col items-center justify-center px-4 ">
            <div className="max-w-md p-2 w-full">
              <div className="text-center ">
                {/* <div className="flex items-center justify-center">
                <img
                  src={logo}
                  width={90}
                  // className="mx-auto"
                />
                <span className="text-3xl text-black font-semibold -ml-5">
                  ookVerse
                </span>
              </div> */}
                <div className="mt-5 space-y-2">
                  <Text
                    fontFamily={"poppins"}
                    fontSize={"4xl"}
                    lineHeight={1.5}
                    textColor={"white"}
                    // textAlign={"center"}
                  >
                    Log in to your account
                  </Text>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div>
                  <label className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border  shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border  shadow-sm rounded-lg"
                  />
                </div>
                <button
                  className="w-full px-4 py-2 text-white font-medium  rounded-md duration-150 bg-sky-600"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      {" "}
                      <SmallLoader />{" "}
                    </>
                  ) : (
                    <>Login </>
                  )}
                </button>
              </form>
              <div className="mt-5 text-center">
                <p className="">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </Box>
      </Box>
    </div>
  );
};

export default SignIn;
