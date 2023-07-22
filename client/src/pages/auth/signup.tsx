import { Box, Circle, Text } from "@chakra-ui/react";
import { useRegisterUserMutation } from "../../redux/feature/user/userApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SmallLoader from "../../components/Loader/SmallLoader";

const SignUp = () => {
  const [registerUser, { isLoading }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      name,
      email,
      password,
    };
    const result: any = await registerUser(data);
    const { data: responseData, error } = result;
    if (responseData?.statusCode === 200) {
      toast.success(responseData?.message);
      navigate("/auth/login");
    }
    if (error?.status === 400) {
      toast.error(error?.data?.message);
    }
  };
  return (
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
        <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
          <div className="w-full space-y-6  sm:max-w-md">
            <div className="text-center">
              <div className="mt-5 space-y-2">
                <Text
                  fontFamily={"poppins"}
                  fontSize={"4xl"}
                  lineHeight={1.5}
                  textColor={"white"}
                  // textAlign={"center"}
                >
                  Create an account
                </Text>
              </div>
            </div>
            <div className=" shadow p-4 py-6 sm:p-6 sm:rounded-lg">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
                    className="w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                {/* {error && (
                <p className="text-red-600 text-center">
                  {error?.data?.message}
                </p>
              )} */}
                <button
                  className={`w-full px-4 py-2 text-white font-medium  rounded-md duration-150 bg-sky-600`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <SmallLoader />
                  ) : (
                    <>Create account </>
                  )}
                </button>
              </form>
              <div className="mt-5">
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </Box>
    </Box>
  );
};

export default SignUp;
