// src/components/Account.js
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuthCheck from "@/utils/hooks/withAuthCheck";

function Account() {
  const { isAuthenticated, userProfile } = useAuthCheck();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Dashboard userProfile={userProfile} />
  ) : (
    <>
      <Tabs
        defaultValue="login"
        className="w-100 flex flex-col justify-center items-center mt-5"
      >
        <TabsList>
          <TabsTrigger value="register">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Register />
        </TabsContent>
        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Account;
